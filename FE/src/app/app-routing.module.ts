import { LoginComponent } from './shared/components/login/login.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { IsUserLoggedIn } from './core/guards/isUserLoggedIn';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsUserLoggedIn],
    component: LayoutComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
