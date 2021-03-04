import { AlertController } from '@ionic/angular';
import { Deck } from './../../classes/deck';
import { DecksService } from './../../services/decks.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private decksService: DecksService,
    private alertController: AlertController
  ) {}

  userId: string;
  groupId: string;

  decks: Observable<Deck[]>;

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');

    this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;
      // this.decks = this.decksService.getDecks(
      //   'PyClOxV9wXQj9Jvn4mWJ0TAyir22',
      //   'itx0EJytRV27dRkggmG4'
      // );
      this.decks = this.decksService.getDecks(res.uid, this.groupId);
    });
  }

  addDeck(){
    this.presentDecksAlertInput();
  }

  async presentDecksAlertInput() {
    const alert = await this.alertController.create({
      cssClass: 'alertGroup',
      header: 'Criar Novo Deck',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome do Deck',
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
            try {
              this.decksService.addDeck(this.userId, this.groupId, <Deck>data)
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
