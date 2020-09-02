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
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule'
  },
  {
    path: 'protected',
    loadChildren: './protected/protected.module#ProtectedModule'
  },
  { path: 'signin', component: SigninRedirectComponent },
  { path: 'signout', component: SignoutRedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
