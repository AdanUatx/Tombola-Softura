import { Injectable } from '@angular/core';
import {URLS_ENTORNO} from '../environments/urlEntorno';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  private static ENTORNO = URLS_ENTORNO.beta;
  public static API_ENDPOINT = AppSettingService.ENTORNO.API_ENDPOINT;

  public static getHeaders() {
    return {
      'Access-Control-Allow-Origin': '*',
      //    'Access-Control-Allow-Origin' : 'https://bitoo-back.azurewebsites.net/',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };
  }
  constructor() { }
}
