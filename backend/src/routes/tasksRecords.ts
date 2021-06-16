import express from 'express';
import { ApiTaskRecord } from '../types/api';

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

router.get('/taskrecords.json', (req: express.Request, res: express.Response<ApiTaskRecord[]>) => {
    res.json(tasksRecords);
});

module.exports = router;