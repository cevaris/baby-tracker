import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { ApiTask, ApiTaskFieldValue, ApiTaskRecord, UUID } from '../types/api';


const URL_TASKS = `${environment.apiDomain}/tasks.json`;
const URL_TASK = (id: UUID) => `${environment.apiDomain}/tasks/${id}.json`;
const URL_TASKRECORDS = (task_id: UUID, date: Date) =>
  `${environment.apiDomain}/taskrecords.json?task_id=${task_id}&date=${date.toISOString()}`;

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

  getTaskRecords(taskId: UUID, date: Date): Observable<ApiTaskRecord[]> {
    // const filtered = tasksRecords
    //   .filter(tr => tr.task_id === taskId && sameDay(new Date(tr.completed_at), date));
    return this.http.get<ApiTaskRecord[]>(URL_TASKRECORDS(taskId, date))
    // .pipe(
    //   map(xs => xs.filter(x => x.task_id === taskId && sameDay(new Date(x.completed_at), date)))
    // )
    // return of(filtered);
  }

  // TODO update writes
  newTaskRecord(task_id: string, now: Date, fieldValues: Array<ApiTaskFieldValue>): Observable<ApiTaskRecord> {
    const record = { id: uuidv4(), task_id: task_id, field_values: fieldValues, completed_at: now.toISOString() };
    // tasksRecords.push(record);
    return of(record);
  }

  // TODO update writes
  deleteTaskRecord(id: UUID): Observable<void> {
    // console.log(tasksRecords);
    // const taskRecordIndex = tasksRecords.findIndex(tr => tr.id === id);
    // if (taskRecordIndex > 0) {
    //   tasksRecords.splice(taskRecordIndex, 1);
    // }
    return of(null);
  }
}