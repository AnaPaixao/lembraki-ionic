import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private auth: AuthService, private afs: AngularFirestore) {}

  getGroups(id: string) {
    return this.afs.collection('users').doc(id).collection('group').valueChanges()
  }
}
