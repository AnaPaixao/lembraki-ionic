import { Injectable, OnInit } from '@angular/core';
import { Deck } from './../classes/deck';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getDeck(userId: string, groupId: string, deckId: string) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection<Deck>('decks').doc(deckId)
      .valueChanges({ idField: 'id' })
  }

  getDecks(userId: string, groupId: string, archived: boolean = false) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection<Deck>('decks', ref => ref.where('archived', '==', archived)).valueChanges({ idField: 'id' })
  }

  addDeck(userId: string, groupId: string, data: Deck) {

    console.log(data);

    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').add({
        name: data.name,
        color: data.color,
        direction: '',
        in_progress: false,
        progress: 0,
        archived: false,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      })

  }

  updateDeck(userId: string, groupId: string, deckId: string, data: Deck) {

    data.updated_at = firebase.firestore.FieldValue.serverTimestamp();

    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .update(data);
  }

  deleteDeck(userId: string, groupId: string, deckId: string) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .delete();
  }

  toggleArchived(userId: string, groupId: string, deckId: string, archived: boolean) {
    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection('decks').doc(deckId)
      .update({
        archived: !archived,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  filter(fieldName: string, userId: string, groupId: string, orderDesc: boolean) {
    let field = fieldName;

    if (field == 'created_at' || field == 'updated_at') {
      orderDesc = !orderDesc
    }

    return this.afs
      .collection('users').doc(userId)
      .collection('group').doc(groupId)
      .collection<Deck>('decks', ref => ref
        .where('archived', '==', false)
        .orderBy(field, orderDesc == true ? 'desc' : 'asc'))
      .valueChanges({ idField: 'id' });
  }

}
