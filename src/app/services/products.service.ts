import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { producto } from '../shared/producto.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private producstCollection = this.firestore.collection("productos");
  constructor(private firestore: AngularFirestore, private toastController: ToastController) { }

  create_NewProduct(product) {
    try {
      this.producstCollection.add({ nombre: product.Nombre, codigo: product.Codigo});
      this.presentToast("Producto Agregado correctamente", true);
    } catch (error) {
      this.presentToast(error.message, false);
    }
  }
 
  read_All_Products(){
    return this.producstCollection.snapshotChanges();
  }

  read_Product(productName: string){
    return this.firestore.collection('productos', ref => {
      let query = ref.orderBy("nombre").startAt(productName).endAt(`${ productName }\uf8ff`);
      return query;
    }).snapshotChanges();
  }
 
  update_Product(product: producto){
    try {
      this.producstCollection.doc(product[".key"]).update({nombre: product.Nombre, codigo: product.Codigo});
      this.presentToast("Producto modificado correctamente", true);
    } catch (error) {
      this.presentToast(error.message, false);
    }
  }
 
  delete_Product(product: producto) {
    try {
      this.producstCollection.doc(product[".key"]).delete();
      this.presentToast("Producto eliminado correctamente", true)
    } catch (error) {
      this.presentToast(error.message, false);
    }
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color ? "success" : "danger"
    });
    toast.present();
  }
}
