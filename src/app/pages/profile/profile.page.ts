import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    
    public auth: AngularFireAuth,
  ) { }

  ngOnInit() { }
    
    profile() { 
      window.open('https://myaccount.google.com/');
      return false;
    }
 

}
