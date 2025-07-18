import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../utils/services/auth/auth.service';
import { IAuthLogin } from '../../utils/interfaces/auth-interface/auth-login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  private authService = inject(AuthService);
  private router = inject(Router)

  onSubmit() {
    // Obtém os dados do formulário
    // Verifica se os campos email e password estão preenchidos
    const userLoginData = this.formLogin.value;
    if (!userLoginData || !userLoginData.email || !userLoginData.password) {
      return;
    }

    // Converte os dados do formulário para o tipo IAuthLogin
    const loginData: IAuthLogin = {
      email: userLoginData.email!,
      password: userLoginData.password!
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        console.log('Login successful');
        this.router.navigate(['/']); // Redireciona para a página inicial após o login
      },
      error: (err) => {
        console.error('Login failed', err);
      }

    }

    );
  }
}
