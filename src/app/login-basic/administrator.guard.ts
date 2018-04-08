import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationBasicService } from './authentication-basic.service';

@Injectable()
export class AdministratorGuard implements CanActivate {
  constructor(private authentication: AuthenticationBasicService) {}

  canActivate(): boolean {
    return this.authentication.isLoggedIn() && this.authentication.isAdmin();
  }
}
