import { Component, OnInit } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {InicioService} from '../../Services/inicio.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public blnMostrarCookies: boolean = true;
  public festejo: string;

  public usuariosTotal: number = 0;
  public modal_reference: NgbModalRef | undefined;
  public showFiller: boolean;
  public formGroup1: FormGroup;
  condiciones_servicio: boolean = false;
  listaPremios: any;
  constructor(
    private inicioService: InicioService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _modalService: NgbModal,
  ) {
    this.formGroup1=this.formBuilder.group(
      {'nombre':'','correo':'','telefono':'','cargo':''}
    );
    this.showFiller = false;
    this.festejo = '';
  }

  ngOnInit(): void {

    if(localStorage.getItem('cookies')){
      this.blnMostrarCookies = false;
    }else{
      this.blnMostrarCookies = true;
    }
    this.obtenerPremios();
    this.obtenerUltimoUsuario();
    this.festejo = localStorage.getItem('festividad');
  }



    public obtenerUltimoUsuario(){
    this.inicioService.obtenerUltimo().subscribe(
      resp =>{
        const data = resp.data.usuario;
        this.usuariosTotal = data[0].total;
      }
    )
    }

    public obtenerPremios(){
    this.inicioService.obtenerPremios().subscribe(
      resp => {
        // @ts-ignore
        const data = resp.data.articulo;
        this.listaPremios = data;
      });
    }

  public abrirModal(modal: any, size: any) {
    this.modal_reference = this._modalService.open(modal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: size,
      windowClass: 'modal-holder'
    });
  }
    openSM(contenido: any){
      this.modalService.open(contenido,{size:'md'})
    }

  nuevo(){
    if(this.formGroup1.valid){
      this.inicioService.agregarUsuario(this.formGroup1.value).subscribe(
        result=>{
          this.obtenerUltimoUsuario();
          console.log(result);
          },
        error=>{
          console.log(error)
        });
      this.modalService.dismissAll();
      Swal.fire('', 'Registro Completo','success')
    }else{
      Swal.fire('Opsss', 'Campos Vacios', 'error');
    }
  }

  aceptarCookies(){
    localStorage.setItem('cookies','1');
    this.blnMostrarCookies = false;
  }

  aceptarTerminosCondiciones(event){
    this.condiciones_servicio = false;
    if (event.target.checked) {
      this.condiciones_servicio = true;
    }
  }
}
