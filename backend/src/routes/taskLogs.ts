import express from 'express';
import { TasksDb } from '../db';
import { presentTaskLog } from '../presenters/taskLogs';
import { ApiError, ApiTaskLog } from '../types/api';

const router = express.Router();

// const tasksRecords: ApiTaskLog[] = [
//     { id: '10', task_id: '1', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
//     { id: '20', task_id: '2', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [{ name: 'ml', value: '70' }], completed_at: new Date().toISOString() },
//     { id: '30', task_id: '2', user_id: '3870cba4-c6ae-46ff-ae24-b744eb283f8c', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-05').toISOString() },
//     { id: '40', task_id: '2', user_id: '3870cba4-c6ae-46ff-ae24-b744eb283f8c', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-05').toISOString() },
//     { id: '40', task_id: '2', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-06').toISOString() },
//     { id: '50', task_id: '1', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
//     { id: '60', task_id: '3', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
//     { id: '70', task_id: '4', user_id: '3870cba4-c6ae-46ff-ae24-b744eb283f8c', field_values: [], completed_at: new Date().toISOString() },
//     { id: '80', task_id: '4', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
// ];

function isValidDate(d: Date) {
    return d instanceof Date && !isNaN(d.getTime());
}

router.get('/taskLogs.json', async (req: express.Request, res: express.Response<ApiError | ApiTaskLog[]>) => {
    if (!req.query.task_id) {
        return res.status(400).json({ code: 400, message: `'task_id' param required.` });
    }

    const dateStr = req.query.date?.toString();
    if (!dateStr) {
        return res.status(400).json({ code: 400, message: `'date' param required.` });
    }
    const date = new Date(dateStr);
    if (!isValidDate(date)) {
        return res.status(400).json({ code: 400, message: `'date' param value '${dateStr}' is invalid.` });
    }

    try {
        const logs = await TasksDb.getTaskLogs(req.query.task_id.toString(), date)
        console.log(logs);

        return res.json(logs.map(presentTaskLog));
    } catch (error) {
        res.status(500).json({ code: 500, message: `Failed to fetch taskslogs. ${error}` });
    }
});

router.post('/taskLogs.json', async (req: express.Request, res: express.Response<ApiError | ApiTaskLog>) => {
    if (req.body) {
        const apiTaskLog = req.body as ApiTaskLog;
        try {
            await TasksDb.saveTaskLog(apiTaskLog);
            return res.json(apiTaskLog);
        } catch (error) {
            res.status(500).json({ code: 500, message: `Failed saving TaskLog ${apiTaskLog}: ${error}` });
        }
    } else {
        return res.status(400).json({ code: 400, message: `TaskLog value missing in body.` });
    }
});

router.delete('/taskLogs.json', async (req: express.Request, res: express.Response) => {
});

module.exports = router;