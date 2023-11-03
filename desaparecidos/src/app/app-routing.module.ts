import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissingPeopleComponent } from './missing-people/missing-people.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: MissingPeopleComponent,
    children: [
      { path: "desaparecidos", component: MissingPeopleComponent},
      { path: "pessoa", component: PersonDetailComponent},
    ]
  },
  { 
    path: "not-found", 
    component: PageNotFoundComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
