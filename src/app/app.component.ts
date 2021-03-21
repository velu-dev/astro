import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    let isLogin = localStorage.getItem("isLogin");
    if (isLogin == "true") {
      this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/landing'])
    }
  }
}
