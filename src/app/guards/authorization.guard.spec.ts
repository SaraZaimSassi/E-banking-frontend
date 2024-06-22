import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthorizationGuard,
        { provide: AuthService, useValue: { roles: [] } } // Mock AuthService
      ]
    });
    guard = TestBed.inject(AuthorizationGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow the authenticated user to access admin route if they have ADMIN role', () => {
    authService.roles = ['ADMIN'];
    expect(guard.canActivate(null as any, null as any)).toBe(true);
  });

  it('should redirect the user to notAuthorized if they do not have ADMIN role', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    authService.roles = ['USER'];
    expect(guard.canActivate(null as any, null as any)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith('/admin/notAuthorized');
  });
});
