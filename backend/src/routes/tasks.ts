import express from 'express';
import { TasksDb } from '../db';
import { presentTask } from '../presenters/task';
import { ApiError, ApiTask } from '../types/api';

const router = express.Router();

// const tasks: ApiTask[] = [
//     { title: 'Tummy time', description: 'Sit tummy down for at least 3 minutes.', id: '1', fields: [] },
//     { title: 'Feeding', description: 'Feed and burp.', id: '2', fields: [{ name: 'ml', description: 'How much milliliters?', type: 'number', is_required: true }] },
//     { title: 'Poop', description: 'Observed poop in pamper.', id: '3', fields: [] },
//     { title: 'Old task', description: 'This task is no longer.', id: '4', fields: [], disabled_at: new Date('04/05/2020').toISOString() },
//     { title: 'Non Required field', description: 'This field task value is not required.', id: '5', fields: [{ name: 'task_field1', description: 'optional field?', type: 'input', is_required: false }] },
// ];

router.get('/tasks.json', async (req: express.Request, res: express.Response<ApiTask[] | ApiError>) => {
    try {
        const tasks = await TasksDb.getTasks();
        res.json(tasks.map(presentTask));
    } catch (error) {
        res.status(500).json({ code: 500, message: `Failed to fetch tasks. ${error}` });
    }
});

router.get('/tasks/:id.json', async (req: express.Request, res: express.Response<ApiTask | ApiError>) => {
    const task = await TasksDb.getTask(req.params.id);

    if (task) {
        res.json(presentTask(task));
    } else {
        res.status(404).json({ code: 404, message: `Task '${req.params.id} not found.'` })
    }
});

module.exports = router;