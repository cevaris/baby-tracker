import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskFieldValues, TaskRecord } from '../api';


const tasks: Task[] = [
  { title: 'Tummy time', description: 'Sit tummy down for at least 3 minutes.', id: '1', fields: [] },
  { title: 'Feeding', description: 'Feed and burp.', id: '2', fields: [{ id: 'fluid-ounces', text: 'How much fl. oz.?', type: 'number' }] },
  { title: 'Poop', description: 'Observed poop in pamper.', id: '3', fields: [] },
  { title: 'Old task', description: 'This task is no longer.', id: '4', fields: [], disabledAt: new Date('04/05/2020') },
];

const tasksRecords: TaskRecord[] = [
  { id: '1', taskId: '1', fieldValues: {}, completedAt: new Date() },
  { id: '2', taskId: '2', fieldValues: { 'fluid-ounces': '1.0' }, completedAt: new Date() },
  { id: '3', taskId: '2', fieldValues: { 'fluid-ounces': '1.2' }, completedAt: new Date() },
  { id: '4', taskId: '1', fieldValues: {}, completedAt: new Date() },
  { id: '5', taskId: '3', fieldValues: {}, completedAt: new Date() },
  { id: '6', taskId: '4', fieldValues: {}, completedAt: new Date() },
  { id: '7', taskId: '4', fieldValues: {}, completedAt: new Date() },
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
    tasksRecords.push({ id: uuidv4(), taskId: taskId, fieldValues, completedAt: now });
    return of(tasksRecords);
  }
}
