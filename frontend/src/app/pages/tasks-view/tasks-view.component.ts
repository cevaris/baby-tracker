import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  taskRecords: TaskRecord[]

  constructor(private route: ActivatedRoute, private taskService: TasksService) {
    this.date = new Date(Date.parse(this.route.snapshot.queryParamMap.get('date')));
    this.taskId = this.route.snapshot.paramMap.get('id');
    console.log(this.taskId, this.date);
  }

  ngOnInit(): void {
    this.taskService.getTaskRecords(this.taskId, this.date)
      .subscribe(taskRecords => this.taskRecords = taskRecords);

    this.taskService.getTask(this.taskId)
      .subscribe(task => this.task = task);
  }

}
