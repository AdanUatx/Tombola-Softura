import { Component, OnInit } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {InicioService} from "../../Services/inicio.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usuariosTotal: number = 0;
  public modal_reference: NgbModalRef | undefined;
  public showFiller: boolean;
  public formGroup1: FormGroup;
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
  }

  ngOnInit(): void {




   /* const texts = ['Participar', 'Sortear', 'Ganar!!!'];
    let index = 0;

    const text = document.querySelector('.multiText');

    function updateText() {
      const currentText = texts[index];
      // @ts-ignore
      const currentLength = text.textContent.length;

      // Eliminar el texto actual letra por letra
      const interval1 = setInterval(() => {
        // @ts-ignore
        if (text.textContent.length > 0) {
          // @ts-ignore
          text.textContent = text.textContent.slice(0, -1);
        } else {
          clearInterval(interval1);

          // Reemplazar el texto con el nuevo texto
          let i = 0;
          const interval2 = setInterval(() => {
            if (i < currentText.length) {
              // @ts-ignore
              text.textContent += currentText.charAt(i);
              i++;
            } else {
              clearInterval(interval2);

              // Actualizar el índice al siguiente texto
              index++;
              if (index >= texts.length) {
                index = 0;
              }

              // Llamar a la función de actualización de texto nuevamente después de un breve retraso
              setTimeout(updateText, 3000);
            }
          }, 50);
        }
      }, 50);
    }

    updateText();*/

    var navbar = document.querySelector('#navbarNav');

    // @ts-ignore
    navbar.addEventListener('show.bs.collapse', function () {
      // se ejecuta cuando el menú se muestra
    });

    // @ts-ignore
    navbar.addEventListener('hide.bs.collapse', function () {
      // se ejecuta cuando el menú se oculta
    });



    this.obtenerUltimoUsuario();
  }



    public obtenerUltimoUsuario(){
    this.inicioService.obtenerUltimo().subscribe(
      resp =>{
        const data = resp.data.usuario;
        this.usuariosTotal = data[0].total;
      }
    )
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
          console.log(result);
          },
        error=>{
          console.log(error)
        }
        );
      this.obtenerUltimoUsuario();
      this.modalService.dismissAll();
      Swal.fire('Excelente!!!','Registro completado correctamente','success')
    }else{
      alert("Campos Vacios");
    }
    this.obtenerUltimoUsuario();
  }
}
