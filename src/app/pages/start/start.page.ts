import { DecksService } from './../../services/decks.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from './../../services/cards.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  // Guardar
  direction: string;
  index: number = 0;

  @ViewChild('cardBackContent') cardBackContent: ElementRef;
  @ViewChild('backInner') cardBackInner: ElementRef;

  @ViewChild('cardInner') cardInner: ElementRef;


  // Result
  wrongCards: Card[] = [];
  rightCards: Card[] = [];

  constructor(
    private auth: AuthService,
    private cardsService: CardsService,
    private route: ActivatedRoute,
    private decksService: DecksService
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.deckId = this.route.snapshot.paramMap.get('deckId');
    this.direction = this.route.snapshot.paramMap.get('direction');

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

  ngDoCheck() {}

  ngAfterViewChecked() {
    // if(this.cardBackContent){
    //   console.log(this.cardBackContent.nativeElement);
    // }

    if (this.cardBackInner && this.cardBackContent) {
      console.log(this.cardBackInner.nativeElement.textContent.length);

      if (this.cardBackInner.nativeElement.textContent.length < 210) {
        this.cardBackContent.nativeElement.classList.add('flex-center');
      } else {
        this.cardBackContent.nativeElement.classList.remove('flex-center');
      }
    }

  }

  Remember(card: Card) {
    this.rightCards.push(card);
    this.incrementIndex();
  }

  NoRemember(card: Card) {
    this.wrongCards.push(card);
    this.incrementIndex();
  }

  incrementIndex() {
    this.index++;
    console.log(this.index);
  }

  flipCard() {
    if (this.cardInner.nativeElement.style.transform == 'rotateY(180deg)') {
      this.cardInner.nativeElement.style.transform = 'rotateY(0deg)';
    } else {
      this.cardInner.nativeElement.style.transform = 'rotateY(180deg)';
    }
  }
}
