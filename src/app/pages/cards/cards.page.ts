import { ToastService } from './../../services/toast.service';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { DecksService } from 'src/app/services/decks.service';
import { Observable } from 'rxjs';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Card } from 'src/app/classes/card';
import { EditModalPage } from './edit-modal/edit-modal.page';
import { Deck } from 'src/app/classes/deck';

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
  cardsArray: Card[];
  deckName: string;
  deckColor: string;

  //Conditionals
  enableStart: boolean = false;
  deckInProgress: boolean;
  changeButton: string; 


  loading: any;

  /* Start Message */

  @ViewChild('startMessage') startMessage: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private cardsService: CardsService,
    private decksService: DecksService,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastService: ToastService,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.deckId = this.route.snapshot.paramMap.get('deckId');

    this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;
      this.cards = this.cardsService.getCards(
        res.uid,
        this.groupId,
        this.deckId
      );

      this.cards.subscribe((res) => {
        // console.log(res);
        if (res[0]) {
          this.enableStart = true;
          this.startMessage.nativeElement.style.display = "none";
        } else {
          this.startMessage.nativeElement.style.display = "flex";
        }
      });

      this.decksService
        .getDeckOnce(res.uid, this.groupId, this.deckId)
        .subscribe((e) => {
          // console.log(e.data());
          this.deckName = e.data().name;
          this.deckColor = e.data().color;
          this.deckInProgress = e.data().in_progress;
        });


    });
  }

  addCard() {
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
          placeholder: 'Definição',
        },
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
            if (data.front == "" || data.back == "") {
              this.toastService.presentToast("É necessário informar o termo e a definição!", 3000)
            } else {
              try {
                data.color = this.deckColor;
                this.cardsService.addCard(
                  this.userId,
                  this.groupId,
                  this.deckId,
                  <Card>data
                );
              } catch (e) {
                console.error(e);
              }
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
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data == 'deleted') {
        this.cards.subscribe((res) => {
          if (!res[0]) {
            this.enableStart = false;
            // console.log(this.enableStart);
          }
        });
      }
    });

    return await modal.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'title-ubuntu',
      header: 'Escolha:',
      subHeader: 'Deseja jogar pelo termo ou a definição?',
      inputs: [
        {
          name: 'term',
          type: 'radio',
          label: 'Termo',
          value: 'term',
          checked: true
        },
        {
          name: 'definition',
          type: 'radio',
          label: 'Definição',
          value: 'definition'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {

            this.changeButton = 'continue';

            const deck = {
              in_progress: true,
              direction: data
            }

            try {
              this.decksService.updateDeck(this.userId, this.groupId, this.deckId, <Deck>deck);
            }
            catch(e){
              console.error(e);
            }

            this.router.navigate(['/start', this.groupId, this.deckId]);
          }
        }
      ]
    });

    await alert.present();
  }


  async resetCards(){
    
    await this.presentLoading();

    try {
      this.cardsService.resetCards(this.userId, this.groupId, this.deckId, this.cards);
      this.decksService.updateDeck(this.userId, this.groupId, this.deckId, <Deck>{
        progress: 0,
        in_progress: false,
        wrongCards: 0,
        rightCards: 0
      })
      
    } catch(e) {
      console.error(e);
    } finally {
      this.loadingController.dismiss();
      this.changeButton = null;
      this.deckInProgress = false;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

}
