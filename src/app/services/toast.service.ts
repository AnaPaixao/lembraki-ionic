import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(message: string, duration: number = 2000, cssClass: string = "default-toast") {
    const toast = await this.toastController.create({
      message,
      duration,
      cssClass,
    });

    toast.present();
  }
}
