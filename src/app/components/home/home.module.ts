import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalLoginModule} from '../modales/modal-login/modal-login.module';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ModalPremiosComponent} from '../modales/modal-premios/modal-premios.component';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalLoginModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTooltipModule,
    ModalPremiosComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
