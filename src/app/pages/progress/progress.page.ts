import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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

  constructor(
    private cardService: CardsService,
    private deckService: DecksService,
    private groupService: GroupService,
    private auth: AuthService
  ) { }

  @ViewChild('startMessage') startMessage: ElementRef;


  ngOnInit() {
    this.auth.getAuth().authState.subscribe((userResponse) => {
      this.userId = userResponse.uid;

      let groupIndex = 0;
      let deckIndex = 0;

      this.groupService.getGroupsOnce(userResponse.uid).subscribe(groupsResponse => {
        groupsResponse.forEach(group => {

          let newGroup = <Group>group.data();
          newGroup.id = group.id;
          this.groups.push(newGroup);


          this.deckService.getDecksInProgress(this.userId, newGroup.id).subscribe(decksResponse => {
            decksResponse.forEach(deck => {
              let newDeck = <DeckInProgress>deck.data();
              newDeck.id = deck.id;
              newDeck.groupIndex = groupIndex;
              this.decksInProgress.push(newDeck);

              this.cardService.getCardsOnce(this.userId, newGroup.id, newDeck.id).subscribe(cardsResponse => {
                cardsResponse.forEach(card => {
                  let newCard = <Card>card.data();
                  newCard.id = card.id;

                  if(!this.decksInProgress[deckIndex].cards){
                    this.decksInProgress[deckIndex].cards = [];
                  }

                  this.decksInProgress[deckIndex].cards.push(newCard);
                })
                ++deckIndex;
              })
            })
            ++groupIndex;
            this.showStartMessage(this.decksInProgress);
          })
        });
      });
    });
  }

  showStartMessage(decksInProgress : DeckInProgress[]){
    if(!decksInProgress[0]){
      this.startMessage.nativeElement.style.display = "flex";
    } else {
      this.startMessage.nativeElement.style.display = "none";
      this.startMessage.nativeElement.toggle = true;
    }
  }
}
