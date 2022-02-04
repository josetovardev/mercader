import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithPopup, Auth, GoogleAuthProvider } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private auth: Auth,
    private router: Router) { }

  public async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.router.navigate(['dashboard/productos']);
  }

}
