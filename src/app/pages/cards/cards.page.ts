import { AlertController, ModalController } from '@ionic/angular';
import { DecksService } from 'src/app/services/decks.service';
import { Observable } from 'rxjs';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Card } from 'src/app/classes/card';
import {EditModalPage} from './edit-modal/edit-modal.page';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  userId: string;
  deckId: string;
  groupId: string;
  cards: Observable<Card[]>;
  deckName: string;
  deckColor: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private cardsService: CardsService,
    private decksService: DecksService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
   this.groupId = this.route.snapshot.paramMap.get('groupId')
   this.deckId = this.route.snapshot.paramMap.get('deckId')

    this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;
      this.cards = this.cardsService.getCards(res.uid, this.groupId, this.deckId);

      this.decksService.getDeckOnce(res.uid, this.groupId, this.deckId).subscribe(e => {
        console.log(e.data())
        this.deckName = e.data().name;
        this.deckColor = e.data().color;
      })
    });
  }

  addCard(){
    this.presentCardsAlertInput();
  }

  async presentCardsAlertInput() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-cssClass',
      header: 'Criar Nova Carta',
      inputs: [
        {
          name: 'front',
          type: 'text',
          placeholder: 'Termo',
        },
        {
          name: 'back',
          type: 'textarea',
          placeholder: 'Definição'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            try {
              data.color = this.deckColor;
              this.cardsService.addCard(this.userId, this.groupId, this.deckId, <Card>data);
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async editModal(card: Card) {
    const modal = await this.modalController.create({
      component: EditModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        userId: this.userId,
        groupId: this.groupId,
        deckId: this.deckId,
        card: card,
      }
    });
    return await modal.present();
  }



}
