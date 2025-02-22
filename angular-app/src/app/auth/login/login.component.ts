import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService';
import { LoginModel } from '../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  invalidLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      console.log('form is invalid');
      return;
    }

    this._authService.login(this.loginForm.value as LoginModel).subscribe({
      next: (res: any) => {
        if (res?.accessToken) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/']);
        }
      },
      error: (e) => {
        console.error('error', e);
        if (e?.error?.detail == 'Failed') {
          this.invalidLogin = true;
        }
      },
      complete: () => console.info('complete'),
    });
  }

  inputChange() {
    this.invalidLogin = false;
  }
}
