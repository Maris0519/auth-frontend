import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    successMessage: string | null = null;

    registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)/),
            ],
        ],
        confirmPassword: ['', Validators.required],
        age: [null as number | null, [Validators.min(13), Validators.max(120)]],
    });

    isLoading = this.authService.isLoading;
    error = this.authService.error;

    onSubmit(): void {
        this.successMessage = null;

        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        const { name, email, password, confirmPassword, age } = this.registerForm.value;

        if (password !== confirmPassword) {
            if (typeof (this.authService as unknown as { setError?: (msg: string) => void }).setError === 'function') {
                (this.authService as unknown as { setError: (msg: string) => void }).setError('Passwords do not match');
            }
            return;
        }

        this.authService
            .register({
                name: name!.trim(),
                email: email!.trim().toLowerCase(),
                password: password!,
                ...(age !== null && age !== undefined ? { age } : {}),
            })
            .subscribe({
                next: (response) => {
                    this.successMessage = response.message;
                    this.registerForm.reset();
                },
                error: (err) => {
                    console.error('Registration failed:', err);
                },
            });
    }

    get f() {
        return this.registerForm.controls;
    }
}