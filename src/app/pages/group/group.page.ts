import { AlertController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  groupColor : string = "#AE2121";

  groups: Observable<any[]>;

  userId: string;


  constructor(
    private groupService: GroupService,
    private auth: AuthService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.auth.getAuth().authState.subscribe(res=>{
      this.userId = res.uid;
      // this.groups = this.groupService.getGroups('PyClOxV9wXQj9Jvn4mWJ0TAyir22');
      this.groups = this.groupService.getGroups(res.uid);
    })
  }

  addGroup(){
    this.presentGroupAlertInput();
  }

  async presentGroupAlertInput() {
    const alert = await this.alertController.create({
      cssClass: 'alertGroup',
      header: 'Criar Novo Conjunto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome do conjunto'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.groupService.addGroup(this.userId, data.name);
          }
        }
      ]
    });

    await alert.present();
  }

}
