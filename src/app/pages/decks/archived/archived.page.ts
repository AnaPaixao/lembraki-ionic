import { DecksService } from './../../../services/decks.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Deck } from 'src/app/classes/deck';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
})
export class ArchivedPage implements OnInit {

  @Input('userId') userId: string;
  @Input('groupId') groupId: string;
  archivedDecksObservable: Observable<Deck[]>;
  archivedDecks: Deck[] = [];
  sub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private decksService: DecksService
  ) { }

  ngOnInit() {
    this.archivedDecksObservable = this.decksService.getDecks(this.userId, this.groupId, true, 'updated_at');
    this.sub = this.archivedDecksObservable.subscribe((res) => {
      this.archivedDecks = [];
      res.map((data) => {
        console.log(data);
        data.updated_at = new Date(data.updated_at.seconds * 1000);
        this.archivedDecks.push(<Deck>data);
      });
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  undo(deckId: string) {
    this.decksService.toggleArchived(this.userId,this.groupId, deckId, true);
    this.archivedDecks = [];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
