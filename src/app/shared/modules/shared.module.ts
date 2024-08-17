import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ReplaceCharWithService } from '../pipes/replace-char-with.service';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ToastrComponent } from '../components/toastr/toastr.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PaginationComponent,
    ReplaceCharWithService,
    FooterComponent,
    LoaderComponent,
    ToastrComponent

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
    ReplaceCharWithService,
    FooterComponent,
    LoaderComponent,
    ToastrComponent

  ]
})
export class SharedModule { }
