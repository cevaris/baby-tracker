import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRecordFormComponent } from './task-record-form.component';

describe('TaskRecordFormComponent', () => {
  let component: TaskRecordFormComponent;
  let fixture: ComponentFixture<TaskRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRecordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
