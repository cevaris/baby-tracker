import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Task, TaskRecord, UUID } from 'src/app/api';
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

  constructor(private route: ActivatedRoute, private taskService: TasksService) {
    this.date = new Date(Date.parse(this.route.snapshot.queryParamMap.get('date')));
    this.taskId = this.route.snapshot.paramMap.get('id');
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
}
