import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { IUserResponse } from '../../interfaces/users-interfaces/user-reponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private httpClientService = inject(HttpClient);

  // Usando BehaviorSubject para manter o estado do usuário
  private userSubject = new BehaviorSubject<IUserResponse | null>(null);
  public user$: Observable<IUserResponse | null> = this.userSubject.asObservable();


  constructor() {
    // Tenta recuperar o usuário do localStorage ao inicializar o serviço
    this.validateUser().subscribe()
  }

  getUser(): IUserResponse | null {
    return this.userSubject.getValue();
  }
  setUser(user: IUserResponse | null): void {
    this.userSubject.next(user);
  }

  validateUser(): Observable<IUserResponse | null> {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem('token');
   if (!token) {
    this.setUser(null);
    return of(null);
   }
    // Se o token existir, faz uma requisição para validar o usuário
    return this.httpClientService.post<IUserResponse>(`${environment.apiUrl}/auth/validate`, 
     {token : token}
    ).pipe(
      map((response: IUserResponse) => {
        this.setUser(response);
        return response;
      }),
      catchError((error) => {
        console.error('Erro ao validar usuário:', error);
        this.setUser(null);
        return of(null);
      })
    );

  }
}
