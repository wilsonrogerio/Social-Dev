import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from '../../utils/services/users/user-state-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit  {

private userStateService = inject(UserStateService);

userName: string = 'User Name'; // Placeholder for user name

ngOnInit(): void {
  // Subscribe to user state service to get the current user's name
  this.userStateService.user$.subscribe(user => {
    this.userName = user ? user.name : 'User Name'; // Update userName if user exists
  });
}

}
