import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { TaskLogDeleteDialogComponent } from 'src/app/components/task-log-delete-dialog/task-log-delete-dialog.component';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiTask, ApiTaskLog, UUID } from 'src/app/types/api';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {
  date: Date;
  dateStr: String;
  taskId: UUID;

  task: ApiTask;
  taskRecords: ApiTaskLog[];

  constructor(private route: ActivatedRoute, private taskService: TasksService, private dialog: MatDialog) {

    this.route.queryParamMap
      .subscribe(queryParamMap => {
        // console.log('trying to load TaskView')
        // // construct local time UTC date based off YYYY-MM-DD string
        // const now = moment(new Date());
        // const dt = moment(queryParamMap.get('date'), 'YYYY-MM-DD');
        // dt.second(now.seconds());
        // dt.minute(now.minutes());
        // dt.hour(now.hours());
        // this.date = dt.toDate();

        // this.taskId = this.route.snapshot.paramMap.get('id');
        // console.log('TasksViewComponent', dt, this.date.toISOString());


        // construct local time UTC date based off YYYY-MM-DD string
        // const now = moment(new Date());
        const dt = moment(queryParamMap.get('date'), 'YYYY-MM-DD');
        this.date = dt.toDate();

        this.taskId = this.route.snapshot.paramMap.get('id');
        console.log('TasksViewComponent', dt, this.date.toISOString());
      })

  }

  ngOnInit(): void {
    const observables = [
      this.taskService.getTaskRecords(this.taskId, this.date),
      this.taskService.getTask(this.taskId)
    ];

    forkJoin(observables)
      .subscribe(([taskRecords, task]: [ApiTaskLog[], ApiTask]) => {
        // console.log('task', task)
        // console.log('taskRecords', taskRecords)
        this.taskRecords = taskRecords;
        this.task = task;
      }, error => {
        console.error('failed fetching task/tasklogs', error);
      });
  }

  newTaskRecordCreated(taskRecord: ApiTaskLog) {
    // console.log('new task log', taskRecord);
    this.reloadTasksRecords();
  }

  private reloadTasksRecords(): Subscription {
    return this.taskService.getTaskRecords(this.taskId, this.date)
      .subscribe(taskRecords => {
        this.taskRecords = taskRecords;
      });
  }

  deleteTaskRecord(taskRecordId: UUID) {
    const dialogRef = this.dialog.open(TaskLogDeleteDialogComponent);

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => this.taskService.deleteTaskRecord(taskRecordId)),
      )
      .subscribe(() => this.reloadTasksRecords());
  }
}
