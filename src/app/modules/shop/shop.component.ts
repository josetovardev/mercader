import { Component, OnInit } from '@angular/core';
import { collection, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  constructor(private firestore: Firestore) { }

  public products!: DocumentData[]

  ngOnInit(): void {
    collectionData(collection(this.firestore, 'products')).subscribe(res => {
      this.products = res;
    })
  }

}
