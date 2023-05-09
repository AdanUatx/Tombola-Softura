import { Component, Input, OnInit } from '@angular/core';
import { InicioService } from '../../Services/inicio.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Ganadores: boolean;
  sumaProbabilidad: number;
  lstPremios: any;
  premioGanador: any;
  descuentoArticulo: any;

  constructor(
    private inicioService: InicioService,
    private router: Router,
    private paginator: MatPaginatorIntl
  ) {
    this.paginator.itemsPerPageLabel = 'Usuarios por pagina:';
    this.paginator.previousPageLabel = 'Previous';
    this.paginator.nextPageLabel = ' Next';
    this.Usuarios = true;
    this.Regalos = false;
    this.load = false;
    this.Sorteo = false;
    this.descargando = false;
    this.Terminos = false;
    this.pageSize = 8;
    this.pageIndex = 0;
    this.lowValue = 0;
    this.highValue = 8;
    this.loaderGiro = true;
    this.total = 0;
    this.resultado = '';
    this.festejo = '';
    this.logueado = false;
  }
  public listaUsuarios: any[] = [];
  public listaGanadores: any[] = [];
  public pageSize: number;
  public festejo: string;
  public pageIndex: number;
  public resultado: any;
  public ganador: any;
  public interval: any;
  public local: string;
  public logueado: boolean;
  public load: boolean;
  public descargando: boolean;
  public Usuarios: boolean;
  public Regalos: boolean;
  public Sorteo: boolean;
  public Terminos: boolean;
  public lowValue: number;
  public loaderGiro: boolean;
  public highValue: number;
  public total: number;
  public nombre: any;
  public cantidad: any;
  public probabilidad: any;
  public formGroup1: FormGroup;
  ngOnInit(): void {
    this.obtenerPremios();
    this.obtenerUsuarios();
    this.local = localStorage.getItem('logueado');
    if (this.local) {
      this.logueado = true;
    } else {
      this.logueado = false;
    }
    this.festejo = localStorage.getItem('festividad');
    this.descargando = false;
    this.loaderGiro = true;
  }

  addItem(newItem: boolean) {
    this.logueado = newItem;
  }


/**
 * Funcion para obtener lista de Usuarios participantes
 */
  obtenerUsuarios() {
    this.inicioService.obtenerUsuarios().subscribe((resp) => {
      this.listaUsuarios = resp.data.usuario;
      this.total = this.listaUsuarios.length;
      console.log(this.listaUsuarios);
    });
  }

  /**
   * Funcion para obtener lista de Usuarios Ganadores
   */

  obtenerUsuariosGanadores() {
    this.inicioService.obtenerUsuariosGanadores().subscribe((resp) => {
      this.listaGanadores = resp.data.ganadores;
    });
  }

  /**
   * Funciona para confirmar truncado de tabla de usuarios
   */
  eliminarTablaUsuariosConfirm() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez que confirmes, no podrás deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Reestablacer Valores',
    }).then((result) => {
      if (result.value) {
        //aqui se ejecuta el servicio
        this.eliminarTablaUsuarios();
      }
    });
  }

  /**
   * Funcion para confirmar truncado de tabla de ganadores
   */
  eliminarTablaGanadoresConfirm() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez que confirmes, no podrás deshacer esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Reestablacer Valores',
    }).then((result) => {
      if (result.value) {
        //aqui se ejecuta el servicio
        this.eliminarTablaGanadores();
      }
    });
  }

  /**
   * Funcion para truncar tabla de usuarios
   */
  eliminarTablaUsuarios() {
    this.inicioService.truncarTablaUsuarios().subscribe((response) => {
      if (response.status == false) {
        Swal.fire('', 'Usuarios Eliminados Correctamente', 'success');
        this.obtenerUsuarios();
      } else {
        Swal.fire(
          'Opsssss',
          'Ha ocurrido un error al truncar la tabla',
          'error'
        );
      }
    });
  }

  /**
   * Funcion para truncar tabla de ganadores
   */
  eliminarTablaGanadores() {
    this.inicioService.truncarTablaGanadores().subscribe((response) => {
      if (response.status == false) {
        Swal.fire('', 'Usuarios Eliminados Correctamente', 'success');
        this.obtenerUsuariosGanadores();
      } else {
        Swal.fire(
          'Opsssss',
          'Ha ocurrido un error al truncar la tabla',
          'error'
        );
      }
    });
  }

  /**
   * Funcion para acceder a las seccion del menu del administrador
   * @param seccion
   */
  public seccionActiva(seccion: any) {
    this.Regalos = false;
    this.Usuarios = false;
    this.Sorteo = false;
    this.Terminos = false;
    this.Ganadores = false;
    if (seccion === 'Usuario') {
      this.Usuarios = true;
    }
    if (seccion === 'Sorteo') {
      this.Sorteo = true;
    }
    if (seccion === 'Regalos') {
      this.Regalos = true;
    }
    if (seccion === 'TyC') {
      this.Terminos = true;
    }
    if (seccion === 'Ganadores') {
      this.Ganadores = true;
      this.obtenerUsuariosGanadores();
    }
  }

  getPaginatorData(event?: PageEvent) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
    this.loaderGiro = false;
  }

  regresarInicio() {
    localStorage.removeItem('logueado');
    this.router.navigateByUrl('/inicio');
  }

  /**
   *
   * @param id
   * Funcion para eliminar usuario por id
   */
  public eliminar(id: number) {
    this.inicioService.eliminarUsuario(id).subscribe(
      (Result) => {
        Swal.fire('Exito', 'Usuario Eliminado correctamente', 'success');
        this.obtenerUsuarios();
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al enviar la solicitud.', 'error');
      }
    );
  }

  public eliminarUsuarioGanador(id: number) {
    this.inicioService.eliminarUsuario(id).subscribe(
      (Result) => {
        this.obtenerUsuarios();
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al enviar la solicitud.', 'error');
      }
    );
  }

  /**
   * Algoritmo para realizar el sorteo dentro de la tombola obteniendo ganador y premio a la vez
   *
  public girar() {
    // Detener cualquier animación en curso o reiniciar el resultado
    this.detener();
    this.sumaProbabilidad = this.lstPremios.reduce((acumulador, premio) => acumulador + parseInt(premio.probabilidad),0);
    // Simular el efecto de la máquina tragamonedas
    this.interval = setInterval(() => {
      this.resultado = this.listaUsuarios[Math.floor(Math.random() * this.listaUsuarios.length)];
      this.ganador = this.resultado;
      let numAleatorio = Math.random() * this.sumaProbabilidad;
      let ganadorPremio = null;
      for (let i = 0; i < this.lstPremios.length; i++) {
        numAleatorio -= parseInt(this.lstPremios[i].probabilidad);
        if (numAleatorio <= 0) {
          ganadorPremio = this.lstPremios[i];
          break;
        }
      }
      this.premioGanador = ganadorPremio.nombre;
      this.descuentoArticulo = ganadorPremio.idarticulo;
    }, 100);
    // Detener el efecto después de un tiempo determinado (por ejemplo, 2 segundos)
    setTimeout(() => {
      this.detener();
      this.agregarGanador(this.ganador, this.premioGanador);
      this.descontarArticulo(this.descuentoArticulo);
      console.log(this.ganador, this.premioGanador);
      Swal.fire({
        title: 'El ganador es:',
        text: this.ganador.nombre + 'y su premio ha sido:' +  this.premioGanador,
        icon: 'success',
      });
    }, 2000);
    //this.sendMessage();
  }*/

  public girar() {
    // Detener cualquier animación en curso o reiniciar el resultado
    this.detener();
    this.sumaProbabilidad = this.lstPremios.reduce((acumulador, premio) => acumulador + parseInt(premio.probabilidad),0);
    // Asignar pesos a cada premio proporcional a su probabilidad
    const pesos = this.lstPremios.map(premio => parseInt(premio.probabilidad) / this.sumaProbabilidad * 100);
    // Simular el efecto de la máquina tragamonedas
    this.interval = setInterval(() => {
      this.resultado = this.listaUsuarios[Math.floor(Math.random() * this.listaUsuarios.length)];
      this.ganador = this.resultado;
      let numAleatorio = Math.random() * 100;
      let ganadorPremio = null;
      for (let i = 0; i < this.lstPremios.length; i++) {
        numAleatorio -= pesos[i];
        if (numAleatorio <= 0) {
          ganadorPremio = this.lstPremios[i];
          break;
        }
      }
      this.premioGanador = ganadorPremio.nombre;
      this.descuentoArticulo = ganadorPremio.idarticulo;
    }, 100);
    // Detener el efecto después de un tiempo determinado (por ejemplo, 2 segundos)
    setTimeout(() => {
      this.detener();
      this.agregarGanador(this.ganador, this.premioGanador);
      this.descontarArticulo(this.descuentoArticulo);
      console.log(this.ganador, this.premioGanador);
      Swal.fire({
        title: 'El ganador es:',
        text: this.ganador.nombre + ' y su premio ha sido: ' +  this.premioGanador,
        icon: 'success',
      });
    }, 2000);
    //this.sendMessage();
  }


  /**
   * Funcion para el envio de mensaje al ganador del sorteo
   */
  sendMessage() {
    this.inicioService
      .sendSMS(
        '+522228498421',
        'Felicidades Has Sido Ganador de la Tómbola Organizada por Bitoo <br> Sucribete '
      )
      .subscribe(
        (response) => {
          console.log('La solicitud se ha completado exitosamente.', response);
        },
        (error) => {
          console.error('Ocurrió un error al enviar la solicitud.', error);
        }
      );
  }

  public detener() {
    // Detener la animación y obtener el resultado final
    clearInterval(this.interval);
  }

  /**
   * Funcion para guardar regalo tomando como tope el 100% de probabilidad total
   */
  public guardaRegalo() {
    if (this.sumaProbabilidad + this.probabilidad <= 100) {
      this.inicioService
        .GuardarRegalos(this.nombre, this.cantidad, this.probabilidad)
        .subscribe(
          (Result) => {
            Swal.fire('Exito', 'Articulo Guardado Correctamente', 'success');
            this.obtenerPremios();
          },
          (error) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al enviar la solicitud.',
              'error'
            );
          }
        );
    } else {
      Swal.fire(
        'Opsssss',
        'No puede exceder el limite de probabilidad',
        'error'
      );
    }
  }

  /**
   * Funcion para guardar al ganador junto con su premio al final de la ronda de la tombola
   * @param ganador
   * @param premio
   */
  public agregarGanador(ganador: any, premio: any) {
    this.inicioService.agregarGanador(ganador, premio).subscribe(
      (Response) => {
        this.eliminarUsuarioGanador(ganador.idusuario);
      },
      (error) => {
        console.log('Nel We');
      }
    );
  }

  /**
   * Funcion para agregar festividad alusiva de la tombola
   */
  public agregarFestividad() {
    this.load = true;
    localStorage.setItem('festividad', this.festejo);
    setTimeout(() => {
      this.load = false;
    }, 2000);
  }

  /**
   * Descargar documento de excel Tb Usuarios
   */
  descargarExcel() {
    this.descargando = true;
    const name = 'Usuarios.xlsx';
    const element = document.getElementById('usuarios');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Respuestas');
    XLSX.writeFile(book, name);
    setTimeout(() => {
      this.descargando = false;
    }, 2000);
  }

  /**
   * Descargar documento de excel Tb Ganadores
   */
  descargarExcelGanadores() {
    this.descargando = true;
    const name = 'UsuariosGanadores.xlsx';
    const element = document.getElementById('ganadores');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Respuestas');
    XLSX.writeFile(book, name);
    setTimeout(() => {
      this.descargando = false;
    }, 2000);
  }

  /**
   * Obtener listado de premios a sortear
   */
  public obtenerPremios() {
    this.inicioService.obtenerPremios().subscribe((resp) => {
      // @ts-ignore
      const listaPremio = resp.data.articulo;
      this.lstPremios = listaPremio;
      this.obtenerPorcentaje(listaPremio);
    });
  }

  /**
   * Obtener porcentaje total conforme se van registrando los articulos
   * @param listaPremio
   */
  obtenerPorcentaje(listaPremio: any) {
    let sumaProbabilidades = 0;
    // Recorre cada objeto en el array y suma sus probabilidades
    for (const obj of listaPremio) {
      sumaProbabilidades += parseInt(obj.probabilidad);
    }
    this.sumaProbabilidad = sumaProbabilidades;
  }

  /**
   * Funcion para descontar en stock el premio que salga en cada ronda de la tombola
   * @param idarticulo
   */
  descontarArticulo(idarticulo: any) {
    this.inicioService.descontarArticulo(idarticulo).subscribe((response) => {
      this.obtenerPremios();
    });
  }
}
