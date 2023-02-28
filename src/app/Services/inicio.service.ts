import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettingService} from '../app-setting.service';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) { }

  url = `${AppSettingService.API_ENDPOINT}`;

  obtenerUltimo(): Observable <any>{
    return this.http.get(
      this.url + '/back/rutas.php?peticion=usuario&funcion=conteo',
      {},
      //{headers: AppSettingService.getHeaders()} Se usa en caso de que sea POST
    ).pipe(map(resp => {
      return resp;
    }));
  }

  obtenerUsuarios(): Observable <any>{
    return this.http.get(
      this.url + '/back/rutas.php?peticion=usuario&funcion=listado',
      {},
      //{headers: AppSettingService.getHeaders()} Se usa en caso de que sea POST
    ).pipe(map(resp => {
      return resp;
    }));
  }

  agregarUsuario(usuario: any): Observable<any>{
    var request="/back/rutas.php?peticion=usuario&funcion=nuevo";
    let datas = new FormData();
    datas.append('nombre',usuario.nombre);
    datas.append('correo',usuario.correo);
    datas.append('telefono',usuario.telefono);
    datas.append('cargo',usuario.cargo);
    return this.http.post(
      this.url + '/back/rutas.php?peticion=usuario&funcion=nuevo',
      datas).pipe(map(respuesta=>{
        return respuesta;
      }));
  }

  eliminarUsuario(id_usuario:any): Observable<any>{
    let datas = new FormData();
    datas.append('idusuario',id_usuario);
    return this.http.post(
      this.url + '/back/rutas.php?peticion=usuario&funcion=eliminar', datas
    ).pipe(map(respuesta => {
      return respuesta;
    }));
  }
}
