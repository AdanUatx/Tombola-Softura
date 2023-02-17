import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InicioComponent} from "./inicio.component";
import { InicioRoutingModule } from './inicio-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InicioModule { }
