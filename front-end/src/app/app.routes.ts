import { Routes } from '@angular/router';
import { Feed } from '../components/feed/feed';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('../auth/auth-module').then(m => m.AuthModule) },
  { path: 'feed', component: Feed, title: 'Feed' }
];
