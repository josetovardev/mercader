import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { SellerComponent } from './modules/seller/seller.component';
import { ShopComponent } from './modules/shop/shop.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { ProductsComponent } from './modules/seller/products/products.component';
import { NewProductComponent } from './modules/seller/new-product/new-product.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'tienda', component: ShopComponent, pathMatch: 'full' },
  {
    path: 'dashboard', component: SellerComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, children:
      [
        { path: 'productos', component: ProductsComponent, pathMatch: 'full' },
        { path: 'nuevo', component: NewProductComponent, pathMatch: 'full' },
      ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
