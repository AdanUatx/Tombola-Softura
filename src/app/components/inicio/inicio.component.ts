import { Component, OnInit } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {InicioService} from "../../Services/inicio.service";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usuariosTotal: number = 0;
  constructor(
    private inicioService: InicioService
  ) { }

  ngOnInit(): void {
    const texts = ['Participar', 'Sortear', 'Ganar!!!'];
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

    updateText();


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
}
