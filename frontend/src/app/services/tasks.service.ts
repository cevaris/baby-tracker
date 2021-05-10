import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFieldValues, TaskRecord, UUID } from '../api';


const tasks: Task[] = [
  { title: 'Tummy time', description: 'Sit tummy down for at least 3 minutes.', id: '1', fields: [] },
  { title: 'Feeding', description: 'Feed and burp.', id: '2', fields: [{ name: 'ml', description: 'How much milliliters?', type: 'number', isRequired: true }] },
  { title: 'Poop', description: 'Observed poop in pamper.', id: '3', fields: [] },
  { title: 'Old task', description: 'This task is no longer.', id: '4', fields: [], disabledAt: new Date('04/05/2020') },
  { title: 'Non Required field', description: 'This field task value is not required.', id: '5', fields: [{ name: 'task_field1', description: 'optional field?', type: 'input', isRequired: false }] },
];

const tasksRecords: TaskRecord[] = [
  { id: '10', taskId: '1', fieldValues: {}, completedAt: new Date() },
  { id: '20', taskId: '2', fieldValues: { 'ml': '70' }, completedAt: new Date() },
  { id: '30', taskId: '2', fieldValues: { 'ml': '75' }, completedAt: new Date('2021-05-05') },
  { id: '40', taskId: '2', fieldValues: { 'ml': '75' }, completedAt: new Date('2021-05-05') },
  { id: '40', taskId: '2', fieldValues: { 'ml': '75' }, completedAt: new Date('2021-05-06') },
  { id: '50', taskId: '1', fieldValues: {}, completedAt: new Date() },
  { id: '60', taskId: '3', fieldValues: {}, completedAt: new Date() },
  { id: '70', taskId: '4', fieldValues: {}, completedAt: new Date() },
  { id: '80', taskId: '4', fieldValues: {}, completedAt: new Date() },
]

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() { }

  getTask(taskId: UUID): Observable<Task> {
    const filtered = tasks.filter(t => t.id === taskId);
    if (filtered.length > 0) {
      return of(filtered[0]);
    }
    return null;
  }

  getTasks(): Observable<Task[]> {
    return of(tasks);
  }

  getTaskRecords(taskId: UUID, date: Date): Observable<TaskRecord[]> {
    function sameDay(left: Date, right: Date): boolean {
      return left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate();
    }

    const filtered = tasksRecords
      .filter(tr => tr.taskId === taskId && sameDay(tr.completedAt, date));
    return of(filtered);
  }

  newTaskRecord(taskId: string, now: Date, fieldValues: TaskFieldValues): Observable<TaskRecord> {
    const record = { id: uuidv4(), taskId: taskId, fieldValues, completedAt: now };
    tasksRecords.push(record);
    return of(record);
  }

  deleteTaskRecord(id: UUID): Observable<void> {
    console.log(tasksRecords);
    const taskRecordIndex = tasksRecords.findIndex(tr => tr.id === id);
    if (taskRecordIndex > 0) {
      tasksRecords.splice(taskRecordIndex, 1);
    }
    return of(null);
  }
}
