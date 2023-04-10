import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AdminguardService } from './services/adminguard.service';
import { AuthguardService } from './services/authguard.service';
import { FacultyApplicantguardService } from './services/faculty-applicantguard.service';
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
import { FacultyRatingComponent } from './views/faculty-rating/faculty-rating.component';
import { HomeComponent } from './views/home/home.component';
import { JobListingComponent } from './views/job-listing/job-listing.component';
import { LoginComponent } from './views/login/login.component';
import { ManagementComponent } from './views/management/management.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { RegisterComponent } from './views/register/register.component';
import { ViewApplicantsComponent } from './views/view-applicants/view-applicants.component';
import { ViewAvailabilityComponent } from './views/view-availability/view-availability.component';
import { ViewCourseScheduleComponent } from './views/view-course-schedule/view-course-schedule.component';
import { ViewCoursesTaughtComponent } from './views/view-courses-taught/view-courses-taught.component';
import { ViewCoursesComponent } from './views/view-courses/view-courses.component';
import { ViewFacultyComponent } from './views/view-faculty/view-faculty.component';
import { ViewProgramsComponent } from './views/view-programs/view-programs.component';
import { ViewSkillsComponent } from './views/view-skills/view-skills.component';
import { FacultyHomeComponent } from './views/faculty-home/faculty-home.component';
import { SearchBySkillComponent } from './views/search-by-skill/search-by-skill.component';
import { AddFacultySkillsComponent } from './views/add-faculty-skills/add-faculty-skills.component';
import { FacultySkillsComponent } from './views/faculty-skills/faculty-skills.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'faculty/home',
    component: FacultyHomeComponent,
    title: 'Home'
  },
  {
    path: 'search-by-skill',
    component: SearchBySkillComponent,
    title: 'Search by skill'
  },
  {
    path: 'faculty-skills',
    component: FacultySkillsComponent,
    title: "View User Skills",
    canActivate: [AdminguardService]
  },
  {
    path: 'faculty-rating/:id',
    component: FacultyRatingComponent,
    title: 'Rate Faculty',
    canActivate: [AdminguardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'management',
    component: ManagementComponent,
    title: 'Manage',
    canActivate: [AdminguardService],
  },
  {
    path: 'job-postings',
    component: JobListingComponent,
    title: 'Open Positions',
    canActivate: [AuthguardService],
  },
  {
    path: 'application-form/:job_id',
    component: ApplicationFormComponent,
    title: 'Application Form',
    canActivate: [FacultyApplicantguardService],
  },
  {
    path: 'all-applications',
    component: AllApplicationsComponent,
    title: 'All Applications',
    canActivate: [AdminguardService],
  },
  {
    path: 'add-program',
    component: AddProgramComponent,
    title: 'Add Program',
    canActivate: [AdminguardService],
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    title: 'Add a Course',
    canActivate: [AdminguardService],
  },
  {
    path: 'add-availability',
    component: AddAvailabilityComponent,
    title: 'Add Availability',
    canActivate: [AuthguardService],
  },
  {
    path: 'add-course-schedule/:id',
    component: AddCourseScheduleComponent,
    title: 'Add schedule',
    canActivate: [AuthguardService],
  },
  {
    path: 'add-job-posting',
    component: AddJobpostingComponent,
    title: 'Add Job Posting',
    canActivate: [AdminguardService],
  },
  {
    path: 'faculty/form/:faculty_type',
    component: FacultyFormComponent,
    title: 'Add Faculty Member',
    canActivate: [AdminguardService],
  },
  {
    path: 'add-faculty-skills',
    component: AddFacultySkillsComponent,
    title: 'Add skills'
  },
  {
    path: 'view-skills/:u_id/:type_id',
    component: ViewSkillsComponent,
    title: 'View Skills',
    canActivate: [AuthguardService],
  },
  {
    path: 'view-applicants',
    component: ViewApplicantsComponent,
    title: 'View Applicants',
    canActivate: [AuthguardService],
  },
  {
    path: 'view-course-schedule/:id',
    component: ViewCourseScheduleComponent,
    title: 'View Course Schedule',
    canActivate: [AuthguardService],
  },
  {
    path: 'view-faculty',
    component: ViewFacultyComponent,
    title: 'View Faculty',
    canActivate: [AdminguardService],
  },
  {
    path: 'view-courses',
    component: ViewCoursesComponent,
    title: 'View All Courses',
    canActivate: [AdminguardService],
  },
  {
    path: 'view-courses-taught/:u_id',
    component: ViewCoursesTaughtComponent,
    title: 'View Courses',
  },
  {
    path: 'view-availability/:u_id/:type_id',
    component: ViewAvailabilityComponent,
    title: 'Staff/Applicant Availability',
    canActivate: [AuthguardService],
  },
  {
    path: 'view-programs',
    component: ViewProgramsComponent,
    title: 'View All Programs',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-programs/:programName',
    component: AddProgramComponent,
    title: 'Edit program',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-courses/:id',
    component: AddCourseComponent,
    title: 'Edit Course',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-job-posting/:id',
    component: EditJobpostingComponent,
    title: 'Edit Job Posting',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-course/:id',
    component: EditCourseComponent,
    title: 'Edit Course',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-applicant/:u_id',
    component: EditApplicantComponent,
    title: 'Edit Applicant',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-faculty/:u_id',
    component: EditFacultyComponent,
    title: 'Edit Faculty Member',
    canActivate: [AdminguardService],
  },
  {
    path: 'edit-faculty-schedule/:id',
    component: EditFacultyScheduleComponent,
    title: 'Edit Faculty Schedule',
    canActivate: [AdminguardService]
  },
  {
    path: 'delete/:previousPage/:table/:id',
    component: DeleteComponent,
    title: 'Delete',
    canActivate: [AuthguardService],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 - Not found',
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    title: 'Scheduler Template / Playground',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
