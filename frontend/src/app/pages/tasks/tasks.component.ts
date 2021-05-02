import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/api';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  activeTasks: Task[];

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {

    this.taskService.getTasks()
      .pipe(
        map(tasks => tasks.filter(t => t.isActive))
      )
      .subscribe((tasks) => this.activeTasks = tasks);
  }

}
