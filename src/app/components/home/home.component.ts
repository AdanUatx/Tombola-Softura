import { Component, OnInit } from '@angular/core';
import {InicioService} from "../../Services/inicio.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listaUsuarios:any;
  ganador: any;
  constructor(
    private inicioService: InicioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(){
    this.inicioService.obtenerUsuarios().subscribe(
      resp => {
        this.listaUsuarios = resp.data.usuario;
      }
    )
  }


  hacerSorteo() {
    const listaMezclada = this.shuffle([...this.listaUsuarios]);
    this.ganador = listaMezclada.shift();
    console.log(`El ganador es ${this.ganador.nombre} con id ${this.ganador.idusuario}`);
    this.inicioService.eliminarUsuario(this.ganador.idusuario).subscribe(
      resp => {
          console.log(resp);
      }
    )
    Swal.fire({
      title: 'El ganador es:',
      text: `${this.ganador.nombre} con ID ${this.ganador.idusuario}`,
    })
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
