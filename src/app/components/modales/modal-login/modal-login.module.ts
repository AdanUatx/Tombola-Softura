import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalLoginRoutingModule} from './modal-login-routing.module';
import {ModalLoginComponent} from './modal-login.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ModalLoginComponent
  ],
    imports: [
        CommonModule,
      ModalLoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
  exports: [
    ModalLoginComponent
  ]
})
export class ModalLoginModule { }
