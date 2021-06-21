import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskLogDeleteDialogComponent } from './task-log-delete-dialog.component';

describe('TaskLogDeleteDialogComponent', () => {
  let component: TaskLogDeleteDialogComponent;
  let fixture: ComponentFixture<TaskLogDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskLogDeleteDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
