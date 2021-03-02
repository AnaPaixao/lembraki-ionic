import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private navCtrl: NavController, public auth: AngularFireAuth, private route: ActivatedRoute){}

  ngOnInit(){}

  public appPages = [
    { title: 'Progresso', url: '/progress', icon: 'stats-chart' },
    { title: 'Outro', url: '/progress', icon: 'person' },

  ];

  navToProgressPage(){
    this.navCtrl.navigateForward(['progress'])
  }

}
