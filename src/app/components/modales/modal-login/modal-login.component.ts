import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  @Input() public logueado: boolean;
  // @ts-ignore
  @Output() logueadosalida = new EventEmitter <boolean>();
  public formGroup1: FormGroup;
  public username = 'CarlaHdz';
  public password = 'Softura2006';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    ) {

    this.formGroup1 = this.formBuilder.group(
      {nombre: '', password: ''}
    );
    this.logueado = false;
  }

  ngOnInit() {
  }


  login(){
    const datosForm = this.formGroup1.value;
    if (datosForm.nombre === this.username && datosForm.password === this.password){
      localStorage.setItem('logueado', 'true');
      this.logueadosalida.emit(true);
      Swal.fire('Excelente', 'Login Existoso!!!', 'success');
    }else{
      Swal.fire('Opssss', 'El usuario o contraseña son incorrectos', 'error');
      localStorage.removeItem('logueado');
    }

  }


}
