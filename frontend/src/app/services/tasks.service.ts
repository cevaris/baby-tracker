import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiTask, ApiTaskLog, UUID } from '../types/api';

const URL_TASKS = `${environment.apiDomain}/tasks.json`;
const URL_TASK = (id: UUID) => `${environment.apiDomain}/tasks/${id}.json`;
const URL_TASKLOGS = (task_id: UUID, date: Date) =>
  `${environment.apiDomain}/taskLogs.json?task_id=${task_id}&date=${date.toISOString()}`;
const URL_TASKLOG = `${environment.apiDomain}/taskLogs.json`;

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
    return this.http.get<ApiTaskLog[]>(URL_TASKLOGS(taskId, date))
  }

  saveTaskRecord(taskLog: ApiTaskLog): Observable<ApiTaskLog> {
    return this.http.post<ApiTaskLog>(URL_TASKLOG, taskLog);
  }

  // TODO update writes
  deleteTaskRecord(id: UUID): Observable<void> {
    return of(null);
  }
}