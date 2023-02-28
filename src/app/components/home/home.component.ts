import { Component, OnInit } from '@angular/core';
import {InicioService} from "../../Services/inicio.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaUsuarios:any;
  ganador: any;
  logueado: boolean = false;
  public username:string = 'CarlaHdz';
  public password:string = 'Softura2006';
  public formGroup1: FormGroup;
  constructor(
    private inicioService: InicioService,
    private router: Router,
     private formBuilder: FormBuilder
  ) {
    this.formGroup1=this.formBuilder.group(
      {'nombre':'','password':''}
    );
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    if (localStorage.getItem('logueado')){
      this.logueado = true;
    }else{
      this.logueado = false;
    }

  }

  obtenerUsuarios(){
    this.inicioService.obtenerUsuarios().subscribe(
      resp => {
        this.listaUsuarios = resp.data.usuario;
      }
    )
  }

  login(){
    const datosForm = this.formGroup1.value;
    if(datosForm.nombre === this.username && datosForm.password === this.password){
      this.logueado = true;
      localStorage.setItem('logueado','true');
      Swal.fire('Excelente','Login Existoso!!!','success');
    }else{
      Swal.fire('Opssss','El usuario o contraseña son incorrectos','error');
    }

  }


  hacerSorteo() {
    const listaMezclada = this.shuffle([...this.listaUsuarios]);
    this.ganador = listaMezclada.shift();
    //console.log(`El ganador es ${this.ganador.nombre} con id ${this.ganador.idusuario}`);
    Swal.fire({
      title: 'El ganador es:',
      text: `${this.ganador.nombre} con ID ${this.ganador.idusuario}`,
      icon: "success"
    });
    this.inicioService.eliminarUsuario(this.ganador.idusuario).subscribe(
      resp => {
        //console.log(resp);
      }
    );
    this.obtenerUsuarios();
  }

  shuffle(array: any) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {

      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  regresarInicio(){
    this.router.navigateByUrl('/inicio');
  }

}
