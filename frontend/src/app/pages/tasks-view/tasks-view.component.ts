import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { TaskRecordDeleteDialogComponent } from 'src/app/components/task-record-delete-dialog/task-record-delete-dialog.component';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiTask, ApiTaskRecord, UUID } from 'src/app/types/api';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {
  date: Date;
  taskId: UUID;

  task: ApiTask;
  taskRecords: ApiTaskRecord[];

  constructor(private route: ActivatedRoute, private taskService: TasksService, private dialog: MatDialog) {
    this.date = new Date(Date.parse(this.route.snapshot.queryParamMap.get('date')));
    this.taskId = this.route.snapshot.paramMap.get('id');

    console.log('TasksViewComponent', this.date);
  }

  ngOnInit(): void {
    const observables = [
      this.taskService.getTaskRecords(this.taskId, this.date),
      this.taskService.getTask(this.taskId)
    ];

    forkJoin(observables)
      .subscribe(([taskRecords, task]: [ApiTaskRecord[], ApiTask]) => {
        this.taskRecords = taskRecords;
        this.task = task;
      });
  }

  newTaskRecordCreated(taskRecord: ApiTaskRecord) {
    console.log('new task record', taskRecord);
    this.reloadTasksRecords();
  }

  private reloadTasksRecords(): Subscription {
    return this.taskService.getTaskRecords(this.taskId, this.date)
      .subscribe(taskRecords => {
        this.taskRecords = taskRecords;
      });
  }

  deleteTaskRecord(taskRecordId: UUID) {
    const dialogRef = this.dialog.open(TaskRecordDeleteDialogComponent);

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        mergeMap(() => this.taskService.deleteTaskRecord(taskRecordId)),
      )
      .subscribe(() => this.reloadTasksRecords());
  }
}
