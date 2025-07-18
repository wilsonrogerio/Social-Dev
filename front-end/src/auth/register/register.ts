import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../utils/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IAuthRegister } from '../../utils/interfaces/auth-interface/auth-register';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  formRegister = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })
  onSubmit() {
    const userRegisterData = this.formRegister.value;
    if (!userRegisterData || !userRegisterData.name || !userRegisterData.email || !userRegisterData.password) {
      return;
    }
    // Converte os dados do formulário para o tipo IAuthLogin
    const registerData: IAuthRegister = {
      name: userRegisterData.name!,
      email: userRegisterData.email!,
      password: userRegisterData.password!
    };
    this.authService.register(registerData).subscribe({
      next: (res) => {
        console.log('Registro bem-sucedido', res);
        this.router.navigate(['/auth/login']); // Redireciona para a página de login após o registro
      },
      error: (err) => {
        console.error('Falha no registro', err);
      }
    });
  }

}
