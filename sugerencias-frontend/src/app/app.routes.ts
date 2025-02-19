import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SugerenciasComponent } from './sugerencias/sugerencias.component';
import { AdminSugerenciasComponent } from './admin-sugerencias/admin-sugerencias.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  {
    path: 'sugerencias',
    component: SugerenciasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['USER'] },
  },
  {
    path: 'admin',
    component: AdminSugerenciasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: '**', redirectTo: '/login' },
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
