import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/authService';
import { RegisterModel } from '../../models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.formBuilder.group(
    {
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: RegisterComponent.passwordMatch }
  );

  registerSuccess = false;
  emailAlreadyExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.registerSuccess = false;
    this.emailAlreadyExists = false;
    if (this.registerForm.invalid) {
      console.log('form is invalid');
      return;
    }

    let registerModel = new RegisterModel(
      this.registerForm.get('email')?.value!,
      this.registerForm.get('password')?.value!
    );

    this._authService.register(registerModel).subscribe({
      next: (res: any) => {},
      error: (e) => {
        console.error('error', e);
        if (e.status == 400) {
          console.error('such email already exists');
          this.emailAlreadyExists = true;
        }
      },
      complete: () => {
        console.info('registered successfully');
        this.registerSuccess = true;
      },
    });
  }

  static passwordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.value.password;
    const confirm = group.value.confirmPassword;
    return password === confirm ? null : { matchingError: true };
  }
}
