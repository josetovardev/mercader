import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html'
})
export class SellerComponent {

  constructor(private auth: Auth) { }

  public username = this.auth.currentUser?.displayName;

}
