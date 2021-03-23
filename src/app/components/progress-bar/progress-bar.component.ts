import { CardsService } from 'src/app/services/cards.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

  @Input("userId") userId: string;
  @Input("groupId") groupId: string;
  @Input("deckId") deckId: string;
  @Input("deckProgress") deckProgress: number;

  deckLength:number;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {

    this.cardsService.getCards(this.userId, this.groupId, this.deckId).subscribe(res=>{
console.log(res);
        this.deckLength = res.length;
    });


  }

}
