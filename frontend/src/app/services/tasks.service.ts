import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
// import { Task, TaskFieldValue, TaskRecord, UUID } from '../api';
import { ApiPet, ApiTask, ApiTaskFieldValue, ApiTaskRecord, UUID } from '../types/api';

const tasks: ApiTask[] = [
  { title: 'Tummy time', description: 'Sit tummy down for at least 3 minutes.', id: '1', fields: [] },
  { title: 'Feeding', description: 'Feed and burp.', id: '2', fields: [{ name: 'ml', description: 'How much milliliters?', type: 'number', is_required: true }] },
  { title: 'Poop', description: 'Observed poop in pamper.', id: '3', fields: [] },
  { title: 'Old task', description: 'This task is no longer.', id: '4', fields: [], disabled_at: new Date('04/05/2020').toISOString() },
  { title: 'Non Required field', description: 'This field task value is not required.', id: '5', fields: [{ name: 'task_field1', description: 'optional field?', type: 'input', is_required: false }] },
];

const tasksRecords: ApiTaskRecord[] = [
  { id: '10', task_id: '1', field_values: [], completed_at: new Date().toISOString() },
  { id: '20', task_id: '2', field_values: [{ name: 'ml', value: '70' }], completed_at: new Date().toISOString() },
  { id: '30', task_id: '2', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-05').toISOString() },
  { id: '40', task_id: '2', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-05').toISOString() },
  { id: '40', task_id: '2', field_values: [{ name: 'ml', value: '75' }], completed_at: new Date('2021-05-06').toISOString() },
  { id: '50', task_id: '1', field_values: [], completed_at: new Date().toISOString() },
  { id: '60', task_id: '3', field_values: [], completed_at: new Date().toISOString() },
  { id: '70', task_id: '4', field_values: [], completed_at: new Date().toISOString() },
  { id: '80', task_id: '4', field_values: [], completed_at: new Date().toISOString() },
];

const pets: ApiPet = {
  id: 110, name: 'Alfred', birthday: new Date().toISOString()
}

function utcDateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() { }

  getTask(taskId: UUID): Observable<ApiTask> {
    const filtered = tasks.filter(t => t.id === taskId);
    if (filtered.length > 0) {
      return of(filtered[0]);
    }
    return null;
  }

  getTasks(): Observable<ApiTask[]> {
    return of(tasks);
  }

  getTaskRecords(taskId: UUID, date: Date): Observable<ApiTaskRecord[]> {
    function sameDay(left: Date, right: Date): boolean {
      return left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate();
    }

    const filtered = tasksRecords
      .filter(tr => tr.task_id === taskId && sameDay(new Date(tr.completed_at), date));
    return of(filtered);
  }

  newTaskRecord(task_id: string, now: Date, fieldValues: Array<ApiTaskFieldValue>): Observable<ApiTaskRecord> {
    const record = { id: uuidv4(), task_id: task_id, field_values: fieldValues, completed_at: now.toISOString() };
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