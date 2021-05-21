import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFieldValues, TaskRecord, UUID } from '../api';


const tasks: Task[] = [
  { title: 'Tummy time', description: 'Sit tummy down for at least 3 minutes.', id: '1', fields: [] },
  { title: 'Feeding', description: 'Feed and burp.', id: '2', fields: [{ name: 'ml', description: 'How much milliliters?', type: 'number', is_required: true }] },
  { title: 'Poop', description: 'Observed poop in pamper.', id: '3', fields: [] },
  { title: 'Old task', description: 'This task is no longer.', id: '4', fields: [], disabled_at: new Date('04/05/2020') },
  { title: 'Non Required field', description: 'This field task value is not required.', id: '5', fields: [{ name: 'task_field1', description: 'optional field?', type: 'input', is_required: false }] },
];

const tasksRecords: TaskRecord[] = [
  { id: '10', task_id: '1', field_values: {}, completed_at: new Date() },
  { id: '20', task_id: '2', field_values: { 'ml': '70' }, completed_at: new Date() },
  { id: '30', task_id: '2', field_values: { 'ml': '75' }, completed_at: new Date('2021-05-05') },
  { id: '40', task_id: '2', field_values: { 'ml': '75' }, completed_at: new Date('2021-05-05') },
  { id: '40', task_id: '2', field_values: { 'ml': '75' }, completed_at: new Date('2021-05-06') },
  { id: '50', task_id: '1', field_values: {}, completed_at: new Date() },
  { id: '60', task_id: '3', field_values: {}, completed_at: new Date() },
  { id: '70', task_id: '4', field_values: {}, completed_at: new Date() },
  { id: '80', task_id: '4', field_values: {}, completed_at: new Date() },
];

function utcDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

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
      .filter(tr => tr.task_id === taskId && sameDay(tr.completed_at, date));
    return of(filtered);
  }

  newTaskRecord(task_id: string, now: Date, fieldValues: TaskFieldValues): Observable<TaskRecord> {
    const record = { id: uuidv4(), task_id: task_id, field_values: fieldValues, completed_at: now };
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