import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input} from '@angular/core';
import { Deck } from 'src/app/classes/deck';
import { DecksService } from 'src/app/services/decks.service';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  @Input('deck') deck: Deck;
  @Input('userId') userId: string;
  @Input('groupId') groupId: string;

  constructor(
     private decksService: DecksService,
     private modalController: ModalController,
     private alertController: AlertController
  ) { }

  ngOnInit() {
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
    try{
      this.decksService.updateDeck(this.userId, this.groupId, this.deck.id, this.deck)
      this.closeModal();
    }catch(e){
      console.error(e)
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
