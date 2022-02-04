import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

    constructor(
        private firestore: Firestore,
        private auth: Auth) { }

    public userProducts: any = [];

    async ngOnInit() {

        const q = query(
            collection(this.firestore, "products"),
            where('userId', '==', `${this.auth.currentUser?.uid}`)
        );

        const getProducts = await getDocs(q);
        getProducts.forEach((product) => {
            this.userProducts.push(product.data())
        });

    }

}