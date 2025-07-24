import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPostResponse } from '../../interfaces/posts-interface/posts-reponse';
import { environment } from '../../../environment/environment';
import { ICreatePost } from '../../interfaces/posts-interface/create-post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private httpService = inject(HttpClient);

  // Método para criar um novo post
  getPosts() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpService.get<IPostResponse[]>(`${environment.apiUrl}/posts`, { headers });
  }

  // Método para criar um novo post
  createPost(postData: ICreatePost ) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Adiciona o userId ao corpo da requisição
    return this.httpService.post<IPostResponse>(`${environment.apiUrl}/posts/create`, postData, { headers });
  }
}
