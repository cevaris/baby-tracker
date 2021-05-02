import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task, TaskFieldValues, TaskRecord } from '../api';

const tasks: Task[] = [
  { title: 'Tummy time', description: 'Sit tummy down for at least 3 minutes.', id: '1', fields: [], isActive: true },
  { title: 'Feeding', description: 'Feed and burp.', id: '2', fields: [{ id: 'fluid-ounces', text: 'How much fl. oz.?', type: 'number' }], isActive: true },
  { title: 'Poop', description: 'Observed poop in pamper.', id: '3', fields: [], isActive: true },
  { title: 'Old task', description: 'This task is no longer', id: '4', fields: [], isActive: false },
];

const tasksRecords: TaskRecord[] = [
  { taskId: '1', fieldValues: {}, completedAt: new Date() },
  { taskId: '2', fieldValues: { 'fluid-ounces': '1.0' }, completedAt: new Date() },
  { taskId: '2', fieldValues: { 'fluid-ounces': '1.2' }, completedAt: new Date() },
  { taskId: '1', fieldValues: {}, completedAt: new Date() },
  { taskId: '3', fieldValues: {}, completedAt: new Date() },
  { taskId: '4', fieldValues: {}, completedAt: new Date() },
  { taskId: '4', fieldValues: {}, completedAt: new Date() },
]

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(tasks);
  }

  getTaskRecords(): Observable<TaskRecord[]> {
    return of(tasksRecords);
  }

  newTaskRecord(taskId: string, now: Date, fieldValues: TaskFieldValues): Observable<TaskRecord[]> {
    tasksRecords.push({ taskId: taskId, fieldValues, completedAt: now });
    return of(tasksRecords);
  }
}
