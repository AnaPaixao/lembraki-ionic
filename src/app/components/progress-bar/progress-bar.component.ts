import { CardsService } from 'src/app/services/cards.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  @Input("userId") userId: string;
  @Input("groupId") groupId: string;
  @Input("deckId") deckId: string;
  @Input("deckProgress") deckProgress: number;

  deckLength: number;
  percent: number;

  subscribe: Subscription;


  constructor(private cardsService: CardsService) { }

  ngOnInit() {

    this.subscribe = this.cardsService.getCards(this.userId, this.groupId, this.deckId).subscribe(res=>{
        this.deckLength = res.length;
        console.log('piscou')
        this.percent = Number((((this.deckProgress) / this.deckLength)).toFixed(2))
    });

  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

}
