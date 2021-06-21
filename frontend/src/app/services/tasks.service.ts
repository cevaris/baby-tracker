import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { ApiTask, ApiTaskFieldValue, ApiTaskLog, UUID } from '../types/api';


const URL_TASKS = `${environment.apiDomain}/tasks.json`;
const URL_TASK = (id: UUID) => `${environment.apiDomain}/tasks/${id}.json`;
const URL_TASKRECORDS = (task_id: UUID, date: Date) =>
  `${environment.apiDomain}/tasklogs.json?task_id=${task_id}&date=${date.toISOString()}`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  getTask(taskId: UUID): Observable<ApiTask> {
    return this.http.get<ApiTask>(URL_TASK(taskId))
  }

  getTasks(): Observable<ApiTask[]> {
    return this.http.get<ApiTask[]>(URL_TASKS);
  }

  getTaskRecords(taskId: UUID, date: Date): Observable<ApiTaskLog[]> {
    // const filtered = tasksRecords
    //   .filter(tr => tr.task_id === taskId && sameDay(new Date(tr.completed_at), date));
    return this.http.get<ApiTaskLog[]>(URL_TASKRECORDS(taskId, date))
    // .pipe(
    //   map(xs => xs.filter(x => x.task_id === taskId && sameDay(new Date(x.completed_at), date)))
    // )
    // return of(filtered);
  }

  // TODO update writes
  newTaskRecord(task_id: string, now: Date, fieldValues: Array<ApiTaskFieldValue>): Observable<ApiTaskLog> {
    const log = { id: uuidv4(), task_id: task_id, user_id: 'user_id', field_values: fieldValues, completed_at: now.toISOString() };
    return of(log);
  }

  // TODO update writes
  deleteTaskRecord(id: UUID): Observable<void> {
    return of(null);
  }
}