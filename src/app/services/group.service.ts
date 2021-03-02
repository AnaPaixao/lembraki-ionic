import { Group } from './../classes/group';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private afs: AngularFirestore) {}

  getGroups(id: string) {
    return this.afs.collection('users').doc(id).collection<Group>('group').valueChanges({idField: 'id'})
  }

  updateColor(userId: string, groupId: string, color: string){
    return this.afs.collection('users').doc(userId).collection<any>('group').doc(groupId).update({
      color: color
    })
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
