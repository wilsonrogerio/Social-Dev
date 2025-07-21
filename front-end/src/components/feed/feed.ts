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

@Component({
  selector: 'app-feed',
  imports: [CommonModule, Header],
  templateUrl: './feed.html',
  styleUrl: './feed.scss'
})
export class Feed implements OnInit {
  private postService = inject(PostService);
  private userStateService = inject(UserStateService);

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
      console.log('Usuário atual:', user);
    });   
    
  }
  
}
