import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgFor, NgIf, KeyValuePipe} from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PredictionRestaurantBere';
  climaOptions = ['Soleado', 'Lluvioso', 'Ventoso', 'Nublado'];
  diaOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  esFinDeSemana = false;
  predictions: any = null;
  clima: string = '';
  nombreDia: string = '';
  imgPath = 'https://iili.io/3Q4dEDG.png';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    console.log('onSubmit called'); // Log para verificar si la funcion se esta; llamando

    const data = {
      clima: this.climaOptions.find(c => c === this.clima),
      nombre_dia: this.diaOptions.find(d => d === this.nombreDia),
      es_fin_de_semana: this.esFinDeSemana
    };

    console.log('Data being sent:', data); // Log para verificar los datos enviados

    this.apiService.getPredictions(data).subscribe(
      (response) => {
        console.log('API response:', response); // Log para ver la respuesta de la API
        this.predictions = response;
        console.log('Predictions after assignment:', this.predictions); // Log para verificar la asignacion
      },
      (error) => {
        console.error('Error al obtener predicciones:', error);
      }
    );
  }
}
