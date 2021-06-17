import express from 'express';
import { ApiError, ApiTaskRecord } from '../types/api';

const router = express.Router();

const tasksRecords: ApiTaskRecord[] = [
    { id: '10', task_id: '1', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
    { id: '20', task_id: '2', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [{ name: 'ml', value: '70' }], completed_at: new Date().toISOString() },
    { id: '30', task_id: '2', user_id: '3870cba4-c6ae-46ff-ae24-b744eb283f8c', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-05').toISOString() },
    { id: '40', task_id: '2', user_id: '3870cba4-c6ae-46ff-ae24-b744eb283f8c', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-05').toISOString() },
    { id: '40', task_id: '2', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-06').toISOString() },
    { id: '50', task_id: '1', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
    { id: '60', task_id: '3', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
    { id: '70', task_id: '4', user_id: '3870cba4-c6ae-46ff-ae24-b744eb283f8c', field_values: [], completed_at: new Date().toISOString() },
    { id: '80', task_id: '4', user_id: '1eb47181-d029-45ff-8a50-9deff70bb077', field_values: [], completed_at: new Date().toISOString() },
];

function sameDay(left: Date, right: Date): boolean {
    return left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate();
}

function isValidDate(d: Date) {
    return d instanceof Date && !isNaN(d.getTime());
}

// date param requires local year, month, day, timzone; date=2021-06-16:00:00:000-600
// http://localhost:3000/taskrecords.json?task_id=2&date=2021-06-16:00:00:000-600
// see https://stackoverflow.com/q/17415579/3538289
router.get('/taskrecords.json', (req: express.Request, res: express.Response<ApiError | ApiTaskRecord[]>) => {
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

    const filtered = tasksRecords.filter(x =>
        x.task_id === req.query.task_id &&
        sameDay(new Date(x.completed_at), date)
    );

    console.log(req.query.task_id, date, filtered);
    return res.json(filtered);
});

module.exports = router;