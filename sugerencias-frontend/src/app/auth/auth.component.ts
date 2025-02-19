import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-auth',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule here
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isRegisterMode = false;
  currentUserEmail: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER'] // Default role
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserEmail = user ? user.email : null;
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { email, password, role } = this.authForm.value;
      if (this.isRegisterMode) {
        this.authService.register(email, password, role).subscribe(() => {
          alert('Usuario registrado con éxito');
          this.toggleMode();
        });
      } else {
        this.authService.login(email, password).subscribe(() => {
          const roles = this.authService.getCurrentUserRoles();
          if (roles && roles.includes('ADMIN')) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/sugerencias']);
          }
        });
      }
    }
  }
}

