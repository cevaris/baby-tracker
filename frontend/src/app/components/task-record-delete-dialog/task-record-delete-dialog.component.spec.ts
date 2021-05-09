import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRecordDeleteDialogComponent } from './task-record-delete-dialog.component';

describe('TaskRecordDeleteDialogComponent', () => {
  let component: TaskRecordDeleteDialogComponent;
  let fixture: ComponentFixture<TaskRecordDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRecordDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRecordDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
