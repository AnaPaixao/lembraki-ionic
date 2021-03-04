import { Injectable } from '@angular/core';
import { Deck } from './../classes/deck';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private afs: AngularFirestore) { }

  getDecks(userId: string, groupId: string){
    return this.afs.collection('users').doc(userId).collection('group').doc(groupId).collection<Deck>('decks').valueChanges({idField: 'id'})
  }

  addDeck(userId: string, groupId: string, data: Deck){

    return this.afs.collection('users').doc(userId).collection('group').doc(groupId).collection('decks').add({
      name: data.name,
      color: '#ae2121',
      direction: '',
      in_progress: false,
      progress: 0,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

  }
}
