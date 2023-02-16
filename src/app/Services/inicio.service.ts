import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingService} from "../app-setting.service";
import {map, Observable} from "rxjs";
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
    }))
  }
}
