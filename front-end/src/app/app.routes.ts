import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('../auth/auth-module').then(m => m.AuthModule) },
  { path: 'feed', loadChildren: ()=> import('../components/components-module').then(m => m.ComponentsModule) },
]
