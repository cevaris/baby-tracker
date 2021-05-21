import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { Task, TaskRecord, UUID } from 'src/app/api';
import { TaskRecordDeleteDialogComponent } from 'src/app/components/task-record-delete-dialog/task-record-delete-dialog.component';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {
  date: Date;
  taskId: UUID;

  task: Task;
  taskRecords: TaskRecord[];

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
      .subscribe(([taskRecords, task]: [TaskRecord[], Task]) => {
        this.taskRecords = taskRecords;
        this.task = task;
      });
  }

  newTaskRecordCreated(taskRecord: TaskRecord) {
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
