import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ReplaceCharWithService } from '../pipes/replace-char-with.service';


@NgModule({
  declarations: [
    NavbarComponent,
    PaginationComponent,
    ReplaceCharWithService

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    PaginationComponent,
    CommonModule,
    ReplaceCharWithService

  ]
})
export class SharedModule { }
