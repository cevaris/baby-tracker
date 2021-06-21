import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TasksService } from 'src/app/services/tasks.service';
import { ApiTask, ApiTaskLog } from 'src/app/types/api';
import { numberValidator } from 'src/app/validators/number.validator';

@Component({
  selector: 'app-task-log-form',
  templateUrl: './task-log-form.component.html',
  styleUrls: ['./task-log-form.component.scss']
})
export class TaskLogFormComponent implements OnInit {

  @Input() task: ApiTask;
  @Output() taskRecordEmitter: EventEmitter<ApiTaskLog> = new EventEmitter();

  taskRecordForm: FormGroup;

  // string containing non-specific field form errors
  formError: string;
  submitting: boolean;

  constructor(private tasksService: TasksService) {
    this.submitting = false;
  }

  ngOnInit(): void {
    console.log('task log form', this.task)

    const controls = {};
    this.task.fields.map(taskField => {
      const validators = [];
      if (taskField.is_required) {
        validators.push(Validators.required);
      }
      if (taskField.type === 'number') {
        validators.push(numberValidator());
      }
      controls[taskField.name] = new FormControl('', validators);
    });

    this.taskRecordForm = new FormGroup(controls);
  }

  onSubmit(): void {
    this.submitting = true;
    this.tasksService.newTaskRecord(this.task.id, new Date(), this.taskRecordForm.value)
      .pipe(finalize(() => this.submitting = false))
      .subscribe(taskRecord => {
        this.taskRecordForm.reset();
        this.taskRecordEmitter.emit(taskRecord);
      });
  }
}
