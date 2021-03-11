import { DecksService } from './../../services/decks.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Card } from 'src/app/classes/card';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  groupId: string;
  deckId: string;
  userId: string;
  cards: Observable<Card[]>;
  deckName: string;
  deckColor: string;

  cardsArray: Card[] = [];
  deckLength: number;

  index: number = 0;

  constructor(
    private auth: AuthService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private decksService: DecksService
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

      this.decksService
        .getDeckOnce(res.uid, this.groupId, this.deckId)
        .subscribe((e) => {
          // console.log(e.data())
          this.deckName = e.data().name;
          this.deckColor = e.data().color;
        });

      this.cards.subscribe((res) => {
        res.map((data) => {
          this.cardsArray.push(<Card>data);
        });
        this.deckLength = this.cardsArray.length;
      });

    });
  }


  Remember() {
    this.incrementIndex();
  }
  NoRemember() {
    this.incrementIndex();
  }

  incrementIndex() {
    this.index++;
    console.log(this.index);
  }
}
