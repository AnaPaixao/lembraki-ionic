import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  deckId: string;
  groupId: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   this.groupId = this.route.snapshot.paramMap.get('groupId')
   this.deckId = this.route.snapshot.paramMap.get('deckId')
    console.log(this.groupId, this.deckId)
  }

}
