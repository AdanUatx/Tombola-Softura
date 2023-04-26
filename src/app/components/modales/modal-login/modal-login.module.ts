import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalLoginRoutingModule} from './modal-login-routing.module';
import {ModalLoginComponent} from './modal-login.component';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ModalLoginComponent
  ],
    imports: [
      ModalLoginRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatIconModule,
      CommonModule,
    ],
  exports: [
    ModalLoginComponent
  ]
})
export class ModalLoginModule { }
