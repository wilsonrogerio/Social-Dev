import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../utils/services/posts/post-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.html',
  styleUrl: './feed.scss'
})
export class Feed implements OnInit {
  private postService = inject(PostService);
  posts$ = this.postService.getPosts();

  ngOnInit() {
    // Inicializa o componente e obtém os posts
    this.posts$ = this.postService.getPosts();
  }
}
