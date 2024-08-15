import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports:[]
})
export class AuthModule { }
