import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {AppSettingService} from '../app-setting.service';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private twilioAccountSid = 'AC6f5d7fefebbf471ebc70c06a141ff648';
  private twilioAuthToken = '64f6df4207890460a482f8c076fa197e';
  private twilioFromNumber = '+14344044569';
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

  obtenerUsuariosGanadores(): Observable <any>{
    return this.http.get(
      this.url + '/back/rutas.php?peticion=ganadores&funcion=listado',
      {},
      //{headers: AppSettingService.getHeaders()} Se usa en caso de que sea POST
    ).pipe(map(resp => {
      return resp;
    }));
  }

  agregarUsuario(usuario: any): Observable<any>{
    var request="/back/rutas.php?peticion=usuario&funcion=nuevo";
    let datas = new FormData();
    datas.append('nombre', usuario.nombre);
    datas.append('correo', usuario.correo);
    datas.append('telefono',usuario.telefono);
    datas.append('cargo',usuario.cargo);
    return this.http.post(
      this.url + '/back/rutas.php?peticion=usuario&funcion=nuevo',
      datas).pipe(map(respuesta=>{
        return respuesta;
      }));
  }

  agregarGanador(usuario: any): Observable<any>{
    let datas = new FormData();
    datas.append('nombreUsuario', usuario.nombre);
    datas.append('correo', usuario.correo);
    datas.append('telefono',usuario.telefono);
    datas.append('cargo',usuario.cargo);
    datas.append('nombreArticulo',null);
    return this.http.post(
      this.url + '/back/rutas.php?peticion=ganador&funcion=nuevo',
      datas).pipe(map(respuesta  => {
      return respuesta;
    }));
  }
  sendSMS(toNumber: string, message: string) {
    const body = new URLSearchParams({
      To: toNumber,
      From: this.twilioFromNumber,
      Body: message
    }).toString();
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.twilioAccountSid + ':' + this.twilioAuthToken))
      .set('Content-Type', 'application/x-www-form-urlencoded');
    // tslint:disable-next-line:max-line-length
    return this.http.post(`https://api.twilio.com/2010-04-01/Accounts/${this.twilioAccountSid}/Messages.json`, body.toString(), { headers });
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
  GuardarRegalos(articulo: any, cantidad: any, probabilidad: any): Observable<any>{
    let datas = new FormData();
    datas.append('nombre', articulo);
    datas.append('cantidad', cantidad);
    datas.append('probabilidad', probabilidad);
    return this.http.post(
      this.url + '/back/rutas.php?peticion=articulo&funcion=nuevo', datas
    ).pipe(map(respuesta => {
      return respuesta;
    }));
  }

  obtenerPremios(){
    return this.http.get(
      this.url + '/back/rutas.php?peticion=articulo&funcion=listado',
      {},
      //{headers: AppSettingService.getHeaders()} Se usa en caso de que sea POST
    ).pipe(map(resp => {
      return resp;
    }));
  }

  truncarTablaUsuarios(): Observable <any>{
    return this.http.get(
      this.url + '/back/rutas.php?peticion=usuario&funcion=truncar',
      {},
    ).pipe(map(resp => {
      return resp;
    }));
  }

  truncarTablaGanadores(): Observable <any>{
    return this.http.get(
      this.url + '/back/rutas.php?peticion=ganadores&funcion=limpiar',
      {},
    ).pipe(map(resp => {
      return resp;
    }));
  }



}
