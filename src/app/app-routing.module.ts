import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeModule} from './components/home/home.module';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/home/home.module').then(m => HomeModule)
  },
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
