import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from '../../utils/services/users/user-state-service';
import { CommonModule } from '@angular/common';
import { IUserResponse } from '../../utils/interfaces/users-interfaces/user-reponse';
import { Observable } from 'rxjs';
import { Header } from "../header/header";

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, Header],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {
   private userStateService = inject(UserStateService);
  user$: IUserResponse | null = null;

  ngOnInit() {
    this.userStateService.user$.subscribe(user => {
      this.user$ = user;
    });
  }
}
