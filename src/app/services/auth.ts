import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //  Initialize auth state from localStorage
  private authState$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('userEmail')
  );

  //  Public observable
  isAuthenticated$ = this.authState$.asObservable();

  constructor() {}

  // Login
  login(email: string) {

    // Store email as "token"
    localStorage.setItem('userEmail', email);

    // Update auth state
    this.authState$.next(true);
  }

  //  Logout
  logout(): void {
    localStorage.removeItem('userEmail');
    this.authState$.next(false);
  }
  

  //  Synchronous check
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  //  Get current user
  getCurrentUser(): string | null {
    return localStorage.getItem('userEmail');
  }
}
