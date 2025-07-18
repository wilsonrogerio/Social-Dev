import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IAuthLogin } from "../../interfaces/auth-interface/auth-login";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClientService = inject(HttpClient);

  login(userLoginData: IAuthLogin) {
    // Envia os dados de login para o servidor e espera receber um token de autenticação

    return this.httpClientService.post<{ message: string, token: string }>('http://25.23.16.204:3000/auth/login', userLoginData).pipe
      (
        map(res => {
          localStorage.setItem('token', res.token); // Armazena o token no localStorage
          return res
        })
        // Armazena o token no localStorage
      );
  }

  register() {

  }
}