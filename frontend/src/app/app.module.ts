import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { TasksViewComponent } from './pages/tasks-view/tasks-view.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskRecordFormComponent } from './components/task-record-form/task-record-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskRecordDeleteDialogComponent } from './components/task-record-delete-dialog/task-record-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TasksComponent,
    TasksViewComponent,
    TaskRecordFormComponent,
    TaskRecordDeleteDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
