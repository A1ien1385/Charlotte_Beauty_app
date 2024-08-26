import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CmsComponent } from './cms/cms.component';
import { NotesComponent } from './notes/notes.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {  path: '',  redirectTo: '/auth', pathMatch: 'full'},
  {  path: 'calendar',  component: CalendarComponent},
  {  path: 'cms',  component: CmsComponent},
  {  path: 'notes',  component: NotesComponent},
  {  path: 'auth',  component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

