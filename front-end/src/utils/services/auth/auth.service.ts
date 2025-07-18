import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IAuthLogin } from "../../interfaces/auth-interface/auth-login";
import { map } from "rxjs";
import { environment } from "../../../environment/environment";
import { IAuthRegister } from "../../interfaces/auth-interface/auth-register";
import { ILoginResponse } from "../../interfaces/users-interfaces/login-reponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClientService = inject(HttpClient);

  login(userLoginData: IAuthLogin) {
    // Envia os dados de login para o servidor e espera receber um token de autenticação
    return this.httpClientService.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, userLoginData).pipe(
      map((res: ILoginResponse) => {
        // Extrai o token se existir na resposta
        const token = res.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        return res;
      })
    );
  }

  register(userRegisterData: IAuthRegister) {
    // Envia os dados de registro para o servidor
    return this.httpClientService.post<IAuthRegister>(`${environment.apiUrl}/users/create`, userRegisterData).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    );

  }
}