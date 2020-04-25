import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { producto } from '../../shared/producto.class'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent  {

  product: producto;
  btn: String;


  constructor(private modalController: ModalController,
    private navParams: NavParams, private prdSvc: ProductsService) { }

    ionViewWillEnter() {
      this.product = this.navParams.get('product');
      if (this.product[".key"] != "") {
        this.btn = "Modificar";
      } else {
        this.btn = "Agregar";
      }
    }

  async mydismiss(){
    await this.modalController.dismiss(this.product);
  }

  async updateProduct(){
    if (this.btn === "Modificar") {
      this.prdSvc.update_Product(this.product);
    } else if(this.btn === "Agregar"){
      this.prdSvc.create_NewProduct(this.product);
    }
    await this.modalController.dismiss(this.product);
  }

}
