import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private currentUser = new BehaviorSubject<any>(null);
  private secretKey = 'miClaveSecretaSuperSeguraDe32Car';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Registro de un nuevo usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @param role Rol del usuario (ej. 'admin' o 'user').
   * @returns Observable con la respuesta del servidor.
   */
  register(email: string, password: string, role: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/register`, { email, password, role })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  /**
   * Inicio de sesión de un usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.saveToken(response.token); // Almacenar el token
            const decodedToken: any = jwtDecode(response.token);
            this.setCurrentUser({ email: decodedToken.sub, roles: decodedToken.roles });
          }
        }),
        catchError(this.handleError) // Manejo de errores
      );
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.clearToken();
    this.currentUser.next(null);
    this.router.navigate(['/']);
  }

  /**
   * Establece el usuario actual en la aplicación.
   * @param user Datos del usuario actual.
   */
  setCurrentUser(user: any): void {
    this.currentUser.next(user);
  }

  /**
   * Obtiene el observable del usuario actual.
   * @returns Observable con la información del usuario actual.
   */
  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  /**
   * Verifica si el usuario está logueado.
   * @returns True si hay un token almacenado.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtiene el token almacenado en el LocalStorage.
   * @returns El token JWT o null si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Obtiene el email del usuario actual.
   * @returns El email del usuario actual o null si no hay usuario logado.
   */
  getCurrentUserEmail(): string | null {
    const user = this.currentUser.value;
    return user ? user.email : null;
  }

  /**
   * Obtiene los roles del usuario actual.
   * @returns Los roles del usuario actual o null si no hay usuario logado.
   */
  getCurrentUserRoles(): string[] | null {
    const user = this.currentUser.value;
    return user ? user.roles : null;
  }

  /**
   * Almacena el token JWT en el LocalStorage.
   * @param token Token JWT recibido del servidor.
   */
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Elimina el token JWT del LocalStorage.
   */
  private clearToken(): void {
    localStorage.removeItem('token');
  }

  /**
   * Manejo de errores para solicitudes HTTP.
   * @param error Error de tipo HttpErrorResponse.
   * @returns Observable que lanza un error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Ocurrió un error inesperado.';
    if (error.status === 401) {
      errorMsg = 'Credenciales incorrectas.';
    } else if (error.error && error.error.message) {
      errorMsg = error.error.message; // Mensaje específico del servidor
    }
    return throwError(() => new Error(errorMsg));
  }
}
