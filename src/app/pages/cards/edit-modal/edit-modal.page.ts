import { ToastService } from './../../../services/toast.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/classes/card';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit, OnDestroy {

  @Input('userId') userId: string;
  @Input('groupId') groupId: string;
  @Input('deckId') deckId: string;
  @Input('card') card: Card;

  private front: string;
  private back: string;

  constructor(
    private modalController: ModalController,
    private cardsService: CardsService,
    private alertController: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.front = this.card.front;
    this.back = this.card.back;
  }

  ngOnDestroy() {
    this.card.front = this.front;
    this.card.back = this.back;
  }

  closeModal(){
    this.modalController.dismiss();
  }


  updateCard(){

    if(this.card.front == "" || this.card.back == "" ){

      this.toastService.presentToast("A carta deve ter um termo e uma definição!");

    }else{
      try {
        this.cardsService.updateCard(this.userId, this.groupId, this.deckId, this.card.id, this.card)
        this.modalController.dismiss();
      } catch (e) {
        console.error(e);
      }
    }

  }

  deleteCard(){
    this.alertConfirmDelete();
  }

  async alertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'alert-confirm-delete',
      header: 'Deletar carta',
      message: 'Tem certeza que deseja <strong>deletar</strong> essa carta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            try {
              this.cardsService.deleteCard(this.userId, this.groupId, this.deckId, this.card.id);
              this.modalController.dismiss('deleted');
            } catch (e) {
              console.error(e)
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
