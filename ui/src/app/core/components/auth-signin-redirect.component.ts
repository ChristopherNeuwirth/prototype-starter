import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  template: '<div></div>'
})
export class SigninRedirectComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.completeLogin().then((u) => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }
}
