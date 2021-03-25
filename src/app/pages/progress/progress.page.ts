import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/classes/card';
import { Deck } from 'src/app/classes/deck';
import { Group } from 'src/app/classes/group';
import { AuthService } from 'src/app/services/auth.service';
import { CardsService } from 'src/app/services/cards.service';
import { DecksService } from 'src/app/services/decks.service';
import { GroupService } from 'src/app/services/group.service';

class DeckInProgress extends Deck {
  groupIndex: number;
  cards: Card[] = [];
}

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  userId: string;
  groups: Group[] = [];
  decksInProgress: DeckInProgress[] = [];
  cards: Card[] = [];

  constructor(
    private cardService: CardsService,
    private deckService: DecksService,
    private groupService: GroupService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;

      let groupIndex = 0;

      this.groupService.getGroupsOnce(res.uid).subscribe(res => {
        res.forEach(e => {

          let group = <Group>e.data();
          group.id = e.id;
          this.groups.push(group);


          this.deckService.getDecksInProgress(this.userId, group.id).subscribe(res => {
            let deckIndex = 0;
            res.forEach(e => {
              let deck = <DeckInProgress>e.data();
              deck.id = e.id;
              deck.groupIndex = groupIndex;
              this.decksInProgress.push(deck);

              this.cardService.getCardsOnce(this.userId, group.id, deck.id).subscribe(res => {
                this.decksInProgress[deckIndex].cards = [];
                res.forEach(e => {
                  let card = <Card>e.data();
                  card.id = e.id;

                  this.decksInProgress[deckIndex].cards.push(card);
                })
                ++deckIndex;
              })
            })
            ++groupIndex;
          })




        });

        console.log(this.decksInProgress);

      });
    });
  }


  ngOnDestroy(){
    console.log('Progress Destruído.')
  }

}
