import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from 'src/app/api';

@Component({
  selector: 'app-task-record-form',
  templateUrl: './task-record-form.component.html',
  styleUrls: ['./task-record-form.component.scss']
})
export class TaskRecordFormComponent implements OnInit {

  @Input() task: Task;
  taskRecordForm: FormGroup;

  // string containing non-specific field form errors
  formError: string;
  submitting: boolean;

  constructor() {
    this.submitting = false;
    // TODO: dynamically build
    this.taskRecordForm = new FormGroup({});
  }

  ngOnInit(): void {
    console.log(this.task);
    // this.taskRecordForm = new FormGroup({
    //   link: new FormControl('', [Validators.required]),
    // });
  }

  onSubmit(): void {
    console.log('submitting', this.taskRecordForm.value);
  }

}
