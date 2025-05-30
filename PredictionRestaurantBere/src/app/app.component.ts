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
  predictions: any = null;
  clima: string = '';
  nombreDia: string = '';
  imgPath = 'https://iili.io/3Q4dEDG.png';
  
  constructor(private apiService: ApiService) {}
  
  keepOriginalOrder = (a: any, b: any) => 0;
  onSubmit() {
    console.log('onSubmit called');

    // Validar que los campos no estén vacíos
    if (!this.clima || !this.nombreDia) {
      alert('Por favor, seleccione un clima y un día.');
      return;
    }

    const data = {
      clima: this.clima.toLowerCase(), // Convertir a minúsculas
      nombre_dia: this.nombreDia.toLowerCase(), // Convertir a minúsculas
      es_fin_de_semana: this.esFinDeSemana ? 1 : 0 // Convertir booleano a entero
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