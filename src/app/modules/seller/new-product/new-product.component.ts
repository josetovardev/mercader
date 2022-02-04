import { Component, OnInit } from '@angular/core';
import { collection, Firestore, setDoc, doc, query, where, getDocs } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth'
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from '@angular/fire/storage'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html'
})
export class NewProductComponent {

    constructor(
        private firestore: Firestore,
        private auth: Auth,
        private router: Router,
        private toastr: ToastrService) { }

    public progressBar!: number;
    public showProgress: boolean = false;

    public form = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        sku: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        sale: new FormControl('', Validators.required),
        startSale: new FormControl(''),
        endSale: new FormControl(''),
        images: new FormControl('', Validators.required),
    });

    public async addProduct(product: any, images: any) {


        const sku: any = [];

        const productsBySku = await getDocs(query(collection(this.firestore, 'products'), where("sku", "==", product.sku)));

        productsBySku.forEach((doc) => { sku.push(doc.id); });

        if (!sku.length) {

            this.showProgress = true;

            const storage = getStorage();
            const storageRef = ref(storage, `images/${this.auth.currentUser?.uid}/${product.name}`);

            const upload = uploadBytesResumable(storageRef, images[0], { contentType: 'image/jpeg' });

            upload.on('state_changed',
                (snapshot) => { this.progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; },
                (err) => { console.log(err); },
                () => {
                    getDownloadURL(upload.snapshot.ref).then((url: string) => {

                        setDoc(doc(collection(this.firestore, 'products')), {
                            ...product,
                            userId: this.auth.currentUser?.uid,
                            image: url
                        })
                        this.toastr.success('Producto creado!', '', {
                            positionClass: "toast-bottom-center"
                        });
                        this.router.navigate(['dashboard/productos']);
                    });
                }
            );
        } else {
            this.toastr.error('Modifique el campo', 'SKU Duplicado', {
                positionClass: "toast-bottom-center"
            });
        }
    }
}