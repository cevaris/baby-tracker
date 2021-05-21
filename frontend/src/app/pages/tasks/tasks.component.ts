import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/api';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  activeTasks: Task[];
  today: Date;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.updateTasks();
  }

  onDateChange(date: Date) {
    this.today = date;
    this.updateTasks();
  }

  private updateTasks() {
    this.taskService.getTasks()
      .pipe(
        // if not disabled, only render active tasks
        map(tasks => tasks.filter(t => !t.disabled_at || t.disabled_at.getTime() >= this.today.getTime()))
      )
      .subscribe((tasks) => this.activeTasks = tasks);
  }
}
