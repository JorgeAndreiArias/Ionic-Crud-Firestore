import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormProductComponent } from './form-product/form-product.component'
import { ProductsService } from '../services/products.service'
import { producto } from '../shared/producto.class';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  produ: producto =  new producto();
  products : producto[];
  constructor(private modalController: ModalController, private prodSvc: ProductsService) {}

  async ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    // we call getEmployees() from EmployeeService to get list of employees
    this.prodSvc.read_All_Products().subscribe(data => {
      // this.employees stores list of employee
      this.products = data.map(e => {
        return {
          ".key": e.payload.doc.id,
          Nombre: e.payload.doc.data()["nombre"],
          Codigo: e.payload.doc.data()["codigo"]
        };
      })
    });
  }

  getProduct(productName){
    this.prodSvc.read_Product(productName).subscribe(data => {
      // this.employees stores list of employee get from search result
      this.products = data.map(e => {
        return {
          ".key": e.payload.doc.id,
          Nombre: e.payload.doc.data()["nombre"],
          Codigo: e.payload.doc.data()["codigo"]
        };
      });
    });
  }

  deleteProduct(produc){
    this.prodSvc.delete_Product(produc);
  }

  editarProducto(prod){
    this.presentModal(prod);
  }

  agregarProducto(){
    this.presentModal(this.produ);
  }

  async presentModal(prod) {
    const modal = await this.modalController.create({
      component: FormProductComponent,
      componentProps: {
        'product': prod,
      }
    });
    await modal.present();
    await modal.onDidDismiss();  
  }
}
