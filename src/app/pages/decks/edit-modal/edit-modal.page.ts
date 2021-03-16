import { ToastService } from 'src/app/services/toast.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Deck } from 'src/app/classes/deck';
import { DecksService } from 'src/app/services/decks.service';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit, OnDestroy {

  @Input('deck') deck: Deck;
  @Input('userId') userId: string;
  @Input('groupId') groupId: string;

  private deckName: string;
  private deckColor: string;

  constructor(
     private decksService: DecksService,
     private modalController: ModalController,
     private alertController: AlertController,
     private toastService: ToastService
  ) { }

  ngOnInit() {
    this.deckName = this.deck.name;
    this.deckColor = this.deck.color;
  }

  ngOnDestroy(){
    this.deck.name = this.deckName;
    this.deck.color = this.deckColor;
  }

  changeColor(){
    try{
      this.decksService.updateColor(this.userId, this.groupId, this.deck.id, this.deck.color)
    } catch(e){
      console.error(e);
    }
  }

  closeModal(){
    this.modalController.dismiss();
  }

  updateDeck(){
    if(this.deck.name == ""){

      this.toastService.presentToast('Não é possível atualizar um deck sem nome!')

    } else {
      
      try{
        this.decksService.updateDeck(this.userId, this.groupId, this.deck.id, this.deck)
        this.closeModal();
      }catch(e){
        console.error(e)
      }
    }

  }

  async alertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'alert-confirm-delete',
      header: 'Resetar progresso',
      message: 'Tem certeza que deseja <strong>resetar</strong> o seu progresso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {

          },
        },
      ],
    });

    await alert.present();
  }





}
