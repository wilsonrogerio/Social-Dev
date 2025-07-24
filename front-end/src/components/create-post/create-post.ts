import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../utils/services/posts/post-service';
import { ICreatePost } from '../../utils/interfaces/posts-interface/create-post';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePost {
  private postService = inject(PostService);

  // Emite um evento quando um post é criado
  @Output() postCreated = new EventEmitter<void>();

  // Formulário reativo para criar postagens
  formPost : FormGroup = new FormGroup({
    title: new FormControl('' , Validators.required), 
    content: new FormControl('', Validators.required)
  });
  
  createPost() {
    // Verifica se o formulário é válido antes de emitir o evento
    if (this.formPost.valid) {
      const postData : ICreatePost = {
        title: this.formPost.value.title,
        content: this.formPost.value.content,
      }
      // Chama o serviço para criar o post
      this.postService.createPost(postData).subscribe({
        next: (response) => {
          console.log('Post criado com sucesso:', response);
          // Limpa o formulário após a criação do post
          this.formPost.reset();
        },
        error: (error) => {
          console.error('Erro ao criar post:', error);
        }
      });
      
     
      // Emite o evento para notificar que um post foi criado
    this.postCreated.emit();
  } 
  }

}
