import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninRedirectComponent } from './core/components/auth-signin-redirect.component';
import { SignoutRedirectComponent } from './core/components/auth-signout-redirect.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: 'protected',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)
  },
  { path: 'signin', component: SigninRedirectComponent },
  { path: 'signout', component: SignoutRedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
