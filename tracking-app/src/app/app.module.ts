import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorMessageComponent } from './components/forms/error-message/error-message.component';
import { FileUploadComponent } from './components/forms/file-upload/file-upload.component';
import { FormInputComponent } from './components/forms/form-input/form-input.component';
import { FormSubmitComponent } from './components/forms/form-submit/form-submit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavlinkComponent } from './components/navlink/navlink.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AddAvailabilityComponent } from './views/add-availability/add-availability.component';
import { AddCourseScheduleComponent } from './views/add-course-schedule/add-course-schedule.component';
import { AddCourseComponent } from './views/add-course/add-course.component';
import { AddJobpostingComponent } from './views/add-jobposting/add-jobposting.component';
import { AddProgramComponent } from './views/add-program/add-program.component';
import { AllApplicationsComponent } from './views/all-applications/all-applications.component';
import { ApplicationFormComponent } from './views/application-form/application-form.component';
import { DeleteComponent } from './views/delete/delete.component';
import { EditApplicantComponent } from './views/edit-applicant/edit-applicant.component';
import { EditCourseComponent } from './views/edit-course/edit-course.component';
import { EditFacultyScheduleComponent } from './views/edit-faculty-schedule/edit-faculty-schedule.component';
import { EditFacultyComponent } from './views/edit-faculty/edit-faculty.component';
import { EditJobpostingComponent } from './views/edit-jobposting/edit-jobposting.component';
import { FacultyFormComponent } from './views/faculty-form/faculty-form.component';
import { HomeComponent } from './views/home/home.component';
import { JobListingComponent } from './views/job-listing/job-listing.component';
import { LoginComponent } from './views/login/login.component';
import { ManagementComponent } from './views/management/management.component';
import { NotFoundComponent } from "./views/not-found/not-found.component";
import { RegisterComponent } from './views/register/register.component';
import { ViewApplicantFacultyInfoComponent } from './views/view-applicant-faculty-info/view-applicant-faculty-info.component';
import { ViewApplicantsComponent } from './views/view-applicants/view-applicants.component';
import { ViewAvailabilityComponent } from './views/view-availability/view-availability.component';
import { ViewCourseScheduleComponent } from './views/view-course-schedule/view-course-schedule.component';
import { ViewCoursesComponent } from './views/view-courses/view-courses.component';
import { ViewFacultyComponent } from './views/view-faculty/view-faculty.component';
import { ViewProgramsComponent } from './views/view-programs/view-programs.component';
import { ViewSkillsComponent } from './views/view-skills/view-skills.component';
import { ViewCoursesTaughtComponent } from './views/view-courses-taught/view-courses-taught.component';
import { FacultyRatingComponent } from './views/faculty-rating/faculty-rating.component';
import { FacultyHomeComponent } from './views/faculty-home/faculty-home.component';
import { SearchBySkillComponent } from './views/search-by-skill/search-by-skill.component';
import { FacultySkillsComponent } from './views/faculty-skills/faculty-skills.component';
import { AddFacultySkillsComponent } from './views/add-faculty-skills/add-faculty-skills.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavlinkComponent,
    HomeComponent,
    FormInputComponent,
    FormSubmitComponent,
    LoginComponent,
    RegisterComponent,
    ErrorMessageComponent,
    RegisterComponent,
    ManagementComponent,
    JobListingComponent,
    AllApplicationsComponent,
    ApplicationFormComponent,
    NotFoundComponent,
    FileUploadComponent,
    FacultyFormComponent,
    AddCourseComponent,
    ViewCoursesComponent,
    AddProgramComponent,
    ViewProgramsComponent,
    SchedulerComponent,
    ViewAvailabilityComponent,
    ViewFacultyComponent,
    AddAvailabilityComponent,
    ViewCourseScheduleComponent,
    AddCourseScheduleComponent,
    DeleteComponent,
    ViewApplicantsComponent,
    AddJobpostingComponent,
    EditJobpostingComponent,
    ViewSkillsComponent,
    ViewApplicantFacultyInfoComponent,
    EditCourseComponent,
    EditApplicantComponent,
    EditFacultyScheduleComponent,
    ViewCoursesTaughtComponent,
    EditFacultyComponent,
    FacultyRatingComponent,
    FacultyHomeComponent,
    SearchBySkillComponent,
    FacultySkillsComponent,
    AddFacultySkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScheduleModule,
    ButtonModule,
  ],

  exports: [NavbarComponent, NavlinkComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
