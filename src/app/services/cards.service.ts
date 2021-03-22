import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Card } from '../classes/card';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getCardOnce(userId: string, groupId: string, deckId: string, cardId: string) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection('cards').doc(cardId)
      .get();

  }


  getCards(userId: string, groupId: string, deckId: string) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection<Card>('cards')
      .valueChanges({ idField: 'id' });
  }

  addCard(userId: string, groupId: string, deckId: string, data: Card) {

    data.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    data.created_at = firebase.firestore.FieldValue.serverTimestamp();

    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection('cards').add(data);
  }

  deleteCard(userId: string, groupId: string, deckId: string, cardId: string) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection('cards').doc(cardId)
      .delete();
  }

  updateCard(userId: string, groupId: string, deckId: string, cardId: string, data: Card) {

    data.updated_at = firebase.firestore.FieldValue.serverTimestamp();

    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection('cards').doc(cardId)
      .update(data);
  }


  resetCards(userId: string, groupId: string, deckId: string, cards: any) {

    let query = this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection('cards').get().subscribe((res)=>{
        res.forEach((res)=>{

          this.updateCard(userId, groupId, deckId, res.id, <Card>{
            situation: ""
          })

        })
      })
  }

  getWrongCards(userId: string, groupId: string, deckId: string){
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .collection<Card>('cards', ref => ref.where('situation', '==', 'wrong'))
      .valueChanges({ idField: 'id' });
  }


}
