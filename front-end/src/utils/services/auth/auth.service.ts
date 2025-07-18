import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IAuthLogin } from "../../interfaces/auth-interface/auth-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClientService = inject(HttpClient);

  login(userLoginData: IAuthLogin) {
    return this.httpClientService.post("", userLoginData);

  }
}