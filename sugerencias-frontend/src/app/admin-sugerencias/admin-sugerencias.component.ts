import { Component, OnInit } from '@angular/core';
import { SugerenciasService } from '../services/sugerencias.service';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-sugerencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sugerencias.component.html',
  styleUrls: ['./admin-sugerencias.component.scss']
})
export class AdminSugerenciasComponent implements OnInit {
  sugerencias: any[] = [];
  loading: boolean = true;

  constructor(
    private sugerenciasService: SugerenciasService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.sugerenciasService.getAllSugerencias().subscribe({
      next: data => {
        this.sugerencias = data;
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching sugerencias', error);
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
