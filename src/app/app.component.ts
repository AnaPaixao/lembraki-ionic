import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public showMenu: boolean = true;

  constructor(
    private navCtrl: NavController,
    public auth: AngularFireAuth,
    private route: Router
  ) {}

  ngOnInit() {}

  ngAfterContentChecked() {
    switch (this.route.url) {
      case '/login':
      case '/first-page':
      case '/register':
        this.showMenu = false;
        break;
      default:
        this.showMenu = true;
    }
  }

  public appPages = [
    { title: 'Conjuntos', url: '/group', icon: 'grid' },
    { title: 'Progresso', url: '/progress', icon: 'stats-chart' },
  ];

  navToProgressPage() {
    this.navCtrl.navigateForward(['progress']);
  }
}
