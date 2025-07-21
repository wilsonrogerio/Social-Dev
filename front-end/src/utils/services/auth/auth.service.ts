import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IAuthLogin } from "../../interfaces/auth-interface/auth-login";
import { map } from "rxjs";
import { environment } from "../../../environment/environment";
import { IAuthRegister } from "../../interfaces/auth-interface/auth-register";
import { ILoginResponse } from "../../interfaces/users-interfaces/login-reponse";
import { UserStateService } from "../users/user-state-service";
import { IUserResponse } from "../../interfaces/users-interfaces/user-reponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClientService = inject(HttpClient);
  private userStateService = inject(UserStateService);

  login(userLoginData: IAuthLogin) {
    // Envia os dados de login para o servidor e espera receber um token de autenticação
    return this.httpClientService.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, userLoginData).pipe(
      map((res: ILoginResponse) => {
        // Extrai o token se existir na resposta
        const token = res.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        this.userStateService.setUser(res.user);
        return res.user;
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

  
  logout() {
    // Limpa o token do localStorage e atualiza o estado do usuário
    localStorage.removeItem('token');
    this.userStateService.setUser(null);
  }
}