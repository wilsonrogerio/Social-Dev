import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../utils/services/posts/post-service';
import { CommonModule } from '@angular/common';
import { IPostResponse } from '../../utils/interfaces/posts-interface/posts-reponse';
import { Observable } from 'rxjs';
import { UserStateService } from '../../utils/services/users/user-state-service';
import { ILoginResponse } from '../../utils/interfaces/users-interfaces/login-reponse';
import { IUserResponse } from '../../utils/interfaces/users-interfaces/user-reponse';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { CreatePost } from "../create-post/create-post";

@Component({
  selector: 'app-feed',
  imports: [CommonModule, Header,  CreatePost],
  templateUrl: './feed.html',
  styleUrl: './feed.scss'
})
export class Feed implements OnInit {
  private postService = inject(PostService);
  private userStateService = inject(UserStateService);

  // Variável para controlar a visibilidade do componente de criação de post
  createPostVisible: boolean = false;

  posts$ : Observable<IPostResponse[]> | null = null;
  currentUser$: IUserResponse | null = null;
  // Método obter o nume do usuário
  userName : string | null = 'User Name'; 

  constructor(){ 
    
  }
  
  ngOnInit() {
    // Inicializa o componente e obtém os posts  
    this.posts$ = this.postService.getPosts();
    this.userStateService.user$.subscribe(user => {
      this.currentUser$ = user;
      this.userName =  user ? user.name : 'User Name';
      
    });   
  }
  
}
