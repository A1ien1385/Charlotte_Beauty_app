import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CmsComponent } from './cms/cms.component';
import { NotesComponent } from './notes/notes.component';

const appRoutes: Routes = [
  {  path: '',  redirectTo: '/calendar', pathMatch: 'full'},
  {  path: 'calendar',  component: CalendarComponent},
  {  path: 'cms',  component: CmsComponent},
  {  path: 'notes',  component: NotesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
