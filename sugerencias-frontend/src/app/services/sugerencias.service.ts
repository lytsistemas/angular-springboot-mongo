import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SugerenciasService {
  private baseUrl = 'http://localhost:8080/sugerencias';

  constructor(private http: HttpClient) {}

  /**
   * Método para agregar una sugerencia.
   * @param sugerencia Objeto con los datos de la sugerencia.
   * @returns Observable con la respuesta del servidor.
   */
  addSugerencia(sugerencia: { texto: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, sugerencia, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  /**
   * Método para obtener todas las sugerencias.
   * @returns Observable con la lista de sugerencias.
   */
  getAllSugerencias(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, {
      headers: this.getHeaders(),
    }).pipe(catchError(this.handleError));
  }

  /**
   * Método para generar las cabeceras de las solicitudes.
   * @returns HttpHeaders con el token de autenticación.
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });
  }

  /**
   * Método para manejar errores en las peticiones HTTP.
   * @param error Error capturado en la solicitud.
   * @returns Observable con el error procesado.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      // Errores del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Errores del servidor
      errorMessage = `Error del servidor - Código: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
