import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Feed } from './feed/feed';

const routes: Routes = [ 
  {path : '', loadComponent: () => import('./feed/feed').then(c => c.Feed)},
  {path: 'profile', loadComponent: () => import('./user-profile/user-profile').then(c => c.UserProfile)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
