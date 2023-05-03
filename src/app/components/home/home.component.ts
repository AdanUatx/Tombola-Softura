import {Component, Input, OnInit} from '@angular/core';
import {InicioService} from '../../Services/inicio.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { FormGroup} from '@angular/forms';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Ganadores: boolean;

  constructor(
    private inicioService: InicioService,
    private router: Router,
    private paginator: MatPaginatorIntl,
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
  public listaUsuarios: any;
  public listaGanadores: any;
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

  obtenerUsuarios() {
    this.inicioService.obtenerUsuarios().subscribe(
      resp => {
        this.listaUsuarios = resp.data.usuario;
        this.total = this.listaUsuarios.length;
      }
    );
  }

  obtenerUsuariosGanadores() {
    this.inicioService.obtenerUsuariosGanadores().subscribe(
      resp => {
        this.listaGanadores = resp.data.ganadores;
      }
    );
  }

  eliminarTablaUsuarios(){

  }

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
    if (seccion === 'Ganadores'){
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

  public eliminar(id: number) {
    this.inicioService.eliminarUsuario(id).subscribe((Result) => {
     Swal.fire('Exito', 'Usuario Eliminado correctamente', 'success');
     this.obtenerUsuarios();
    }, (error) => {
      Swal.fire('Error', 'Ocurrió un error al enviar la solicitud.', 'error');
    });
  }

  public girar() {
    // Detener cualquier animación en curso o reiniciar el resultado
    this.detener();

    // Simular el efecto de la máquina tragamonedas
    this.interval = setInterval(() => {
      this.resultado = this.listaUsuarios[Math.floor(Math.random() * this.listaUsuarios.length)];
      this.ganador = this.resultado;
    }, 100);
    // Detener el efecto después de un tiempo determinado (por ejemplo, 2 segundos)
    setTimeout(() => {
      this.detener();
      this.agregarGanador(this.ganador);
      console.log(this.ganador);
      Swal.fire({
        title: 'El ganador es:',
        text: this.ganador.nombre,
        icon: 'success'
      });
    },   2000);
    this.sendMessage();
}

  sendMessage(){
    this.inicioService.sendSMS('+522228498421', 'Felicidades Has Sido Ganador de la Tómbola Organizada por Bitoo <br> Sucribete ')
      .subscribe((response) => {
        console.log('La solicitud se ha completado exitosamente.', response);
      }, (error) => {
        console.error('Ocurrió un error al enviar la solicitud.', error);
      });
  }

  public detener() {
    // Detener la animación y obtener el resultado final
    clearInterval(this.interval);
  }
  public guardaRegalo(){
    this.inicioService.GuardarRegalos( this.nombre, this.cantidad, this.probabilidad).subscribe((Result) => {
      Swal.fire('Exito', 'Articulo Guardado Correctamente', 'success');
      this.obtenerUsuarios();
    }, (error) => {
      Swal.fire('Error', 'Ocurrió un error al enviar la solicitud.', 'error');
    });
}
 public agregarGanador(ganador: any){
    this.inicioService.agregarGanador(ganador).subscribe(
      (Response) => {
        console.log('Registro Exitoso');
      }, (error) => {
        console.log("Nel We");
   }
    )
 }
  public agregarFestividad(){
    this.load = true;
    localStorage.setItem('festividad', this.festejo);
    setTimeout(() => { this.load = false;  }, 2000);
  }


  descargarExcel(){
    this.descargando = true;
    const name = 'Usuarios.xlsx';
    const element = document.getElementById('usuarios');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Respuestas');
    XLSX.writeFile(book, name);
    setTimeout(() => { this.descargando = false;   }, 2000);
  }

}
