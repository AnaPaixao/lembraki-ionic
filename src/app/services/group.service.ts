import { Group } from './../classes/group';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private auth: AuthService, private afs: AngularFirestore) {}

  getGroups(id: string) {
    return this.afs.collection('users').doc(id).collection<Group>('group').valueChanges()
  }

  addGroup(idUser: string, data: Group){

    return this.afs.collection('users').doc(idUser).collection('group').add({
      name: data.name,
      color: data.color,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

  }
}
