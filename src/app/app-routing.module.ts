import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './features/auth/auth.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { IndexComponent } from './features/dashboard/index/index.component';
import { loggedInGuard } from './core/gurads/logged-in.guard';
import { loginRequiredGuard } from './core/gurads/login-required.guard';


const routes: Routes = [

  { path: '', loadChildren: () => AuthModule,canActivate:[loggedInGuard] },
  {
    path: 'dashboard',
    component: IndexComponent,
    canActivate:[loginRequiredGuard],
    loadChildren: ()=> DashboardModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
