import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, KeyValuePipe } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PredictionRestaurantBere';
  climaOptions = ['Soleado', 'Lluvioso', 'Ventoso', 'Nublado'];
  diaOptions = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  esFinDeSemana = false;
  esFeriado = false;
  predictions: any = null;
  clima: string = '';
  nombreDia: string = '';
  imgPath = 'https://iili.io/3Q4dEDG.png';

  // Mapeo de días en español a inglés
  private diaMapping: { [key: string]: string } = {
    'Lunes': 'Monday',
    'Martes': 'Tuesday',
    'Miércoles': 'Wednesday',
    'Jueves': 'Thursday',
    'Viernes': 'Friday',
    'Sábado': 'Saturday',
    'Domingo': 'Sunday'
  };

  // Mapeo de clima para asegurar la capitalización
  private climaMapping: { [key: string]: string } = {
    'Soleado': 'Soleado',
    'Lluvioso': 'Lluvioso',
    'Ventoso': 'Ventoso',
    'Nublado': 'Nublado'
  };

  constructor(private apiService: ApiService) {}

  keepOriginalOrder = (a: any, b: any) => 0;

  onSubmit() {
    console.log('onSubmit called');

    // Validar que los campos no estén vacíos
    if (!this.clima || !this.nombreDia) {
      alert('Por favor, seleccione un clima y un día.');
      return;
    }

    // Mapear los valores del formulario al formato esperado por el backend
    const mappedDia = this.diaMapping[this.nombreDia];
    const mappedClima = this.climaMapping[this.clima];

    const data = {
      clima: mappedClima, // Enviar con capitalización correcta
      nombre_dia: mappedDia, // Enviar en inglés
      es_fin_de_semana: this.esFinDeSemana ? 1 : 0, // Convertir booleano a entero
      es_feriado: this.esFeriado ? 1 : 0
    };

    console.log('Data being sent:', data);

    this.apiService.Predictions(data).subscribe(
      (response) => {
        console.log('API response:', response);
        this.predictions = response;
        console.log('Predictions after assignment:', this.predictions);
      },
      (error) => {
        console.error('Error al obtener predicciones:', error);
        alert('Error al conectar con el backend. Verifica la URL de ngrok o el estado del servidor.');
      }
    );
  }
}