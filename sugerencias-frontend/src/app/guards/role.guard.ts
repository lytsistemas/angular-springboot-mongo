import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data['roles'];
    const userRoles = this.authService.getCurrentUserRoles();
    const hasRole = userRoles ? userRoles.some(role => roles.includes(role)) : false;
    if (hasRole) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
