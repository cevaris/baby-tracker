import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Task, TaskRecord } from 'src/app/api';
import { TasksService } from 'src/app/services/tasks.service';
import { numberValidator } from 'src/app/validators/number.validator';

@Component({
  selector: 'app-task-record-form',
  templateUrl: './task-record-form.component.html',
  styleUrls: ['./task-record-form.component.scss']
})
export class TaskRecordFormComponent implements OnInit {

  @Input() task: Task;
  @Output() taskRecordEmitter: EventEmitter<TaskRecord> = new EventEmitter();

  taskRecordForm: FormGroup;

  // string containing non-specific field form errors
  formError: string;
  submitting: boolean;

  constructor(private tasksService: TasksService) {
    this.submitting = false;
  }

  ngOnInit(): void {
    const controls = {};
    this.task.fields.map(taskField => {
      const validators = [];
      if (taskField.isRequired) {
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

    console.log(this.taskRecordForm.value, this.taskRecordForm.errors);

    this.tasksService.newTaskRecord(this.task.id, new Date(), {})
      .pipe(finalize(() => this.submitting = false))
      .subscribe(taskRecord => this.taskRecordEmitter.emit(taskRecord));
  }
}
