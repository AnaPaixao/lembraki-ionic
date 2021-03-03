import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  async aboutAlert(){
    const alert = await this.alertController.create({
      cssClass: 'about-alert-first-page',
      header: 'Lembraki',
      subHeader: 'Versão: 1.0',
      message: 'Bem vindo ao Lembraki.<br>Aqui você poderá estudar <br>e relembrar conceitos. ',
      buttons: ['OK']
    });

    await alert.present();
  }

}
