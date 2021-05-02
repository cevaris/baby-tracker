import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksViewComponent } from './pages/tasks-view/tasks-view.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TasksViewComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
