import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPostResponse } from '../../interfaces/posts-interface/posts-reponse';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private httpService = inject(HttpClient);

  getPosts() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpService.get<IPostResponse[]>(`${environment.apiUrl}/posts`, { headers });
  }
}
