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
    console.log('date', date);
    this.today = date;
    this.updateTasks();
  }

  private updateTasks() {
    this.taskService.getTasks()
      .pipe(
        // only render active tasks
        map(tasks => tasks.filter(t => !t.disabledAt || t.disabledAt.getTime() >= this.today.getTime()))
      )
      .subscribe((tasks) => this.activeTasks = tasks);
  }
}
