import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiTask } from 'src/app/types/api';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  activeTasks: ApiTask[];
  currDay: Date;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.currDay = new Date();
    this.updateTasks();
  }

  onDateChange(date: Date) {
    this.currDay = date;
    this.updateTasks();
  }

  private updateTasks() {
    this.taskService.getTasks()
      .pipe(
        // if not disabled, only render active tasks
        map(tasks => tasks.filter(t => !t.disabled_at || new Date(t.disabled_at).getTime() >= this.currDay.getTime()))
      )
      .subscribe((tasks) => this.activeTasks = tasks);
  }
}
