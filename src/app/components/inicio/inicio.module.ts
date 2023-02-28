import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InicioComponent} from "./inicio.component";
import { InicioRoutingModule } from './inicio-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    InicioComponent
  ],
  exports: [
    InicioComponent
  ],
    imports: [
        CommonModule,
        InicioRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSidenavModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule
    ]
})
export class InicioModule { }
