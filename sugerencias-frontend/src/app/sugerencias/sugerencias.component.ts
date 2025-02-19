import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SugerenciasService } from '../services/sugerencias.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sugerencias',
  standalone: true,
  imports: [ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.scss']
})
export class SugerenciasComponent implements OnInit {
  sugerenciaForm: FormGroup;
  currentUserEmail: string | null = null;

  constructor(private fb: FormBuilder, private sugerenciasService: SugerenciasService, private authService: AuthService) {
    this.sugerenciaForm = this.fb.group({
      texto: ['', Validators.required],
      usuario: [{ value: '', disabled: true }] // Ensure the user email field is present
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserEmail = user ? user.email : null;
      this.sugerenciaForm.patchValue({ usuario: this.currentUserEmail }); // Patch the form with the current user's email
    });
  }

  enviarSugerencia() {
    if (this.sugerenciaForm.valid) {
      const formValue = {
        ...this.sugerenciaForm.getRawValue(),
        usuario: this.currentUserEmail // Ensure the email is included
      };
      this.sugerenciasService.addSugerencia(formValue).subscribe(() => {
        alert('Sugerencia enviada con éxito');
        this.sugerenciaForm.reset();
        this.sugerenciaForm.patchValue({ usuario: this.currentUserEmail }); // Reset the form and patch the email again
      });
    }
  }

  logout() {
    this.authService.logout();
    // Redirect to login page or home page after logout
    window.location.href = '/login';
  }
}
