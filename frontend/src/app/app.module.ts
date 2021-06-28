import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TaskLogDeleteDialogComponent } from './components/task-log-delete-dialog/task-log-delete-dialog.component';
import { TaskLogFormComponent } from './components/task-log-form/task-log-form.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { TasksViewComponent } from './pages/tasks-view/tasks-view.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AuthService } from './services/auth.service';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TasksComponent,
    TasksViewComponent,
    TaskLogFormComponent,
    TaskLogDeleteDialogComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HomeComponent,
    AuthButtonComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'baby-tracker'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
