import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  template: '<div></div>'
})
export class SignoutRedirectComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.completeLogout().then(() => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}
