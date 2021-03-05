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
    return this.afs.collection('users').doc(id).collection<Group>('group', ref => ref.where('archived', '==', false)).valueChanges({idField: 'id'})
  }

  updateColor(userId: string, groupId: string, color: string){
    return this.afs.collection('users').doc(userId).collection<any>('group').doc(groupId).update({
      color: color
    })
  }

  filter(fieldName: string, userId: string, orderDesc: boolean) {

    let field = fieldName;

    if(field == 'created_at' || field == 'updated_at'){
      orderDesc = !orderDesc
    }

    return this.afs.collection('users').doc(userId).collection<Group>('group', ref => ref.where('archived', '==', false).orderBy(field, orderDesc == true ? 'desc' : 'asc')).valueChanges({idField: 'id'});
  }

  deleteGroup(userId: string, groupId: string){
    return this.afs.collection('users').doc(userId).collection('group').doc(groupId).delete();
  }

  toggleArchived(userId: string, groupId: string, archived: boolean){
    return this.afs.collection('users').doc(userId).collection<any>('group').doc(groupId).update({
      archived: !archived,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  renameGroup(userId: string, groupId: string, newName: string){
    return this.afs.collection('users').doc(userId).collection<any>('group').doc(groupId).update({
      name: newName,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  addGroup(idUser: string, data: Group){

    return this.afs.collection('users').doc(idUser).collection('group').add({
      name: data.name,
      color: data.color,
      archived: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

  }
}
