import { Group } from './../../classes/group';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
  
  groups: Observable<Group[]>;
  groupsOrderNameDesc: boolean = false;
  groupsOrderCreatedAtDesc: boolean = true;
  groupsOrderUpdatedAtDesc: boolean = false;


  groupColor: string = "#AE2121";


  userId: string;


  constructor(
    private groupService: GroupService,
    private auth: AuthService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
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

  updateGroup(id: string){
    console.log(id);
  }

  changeColor(idGroup: string, color: string){
    try{
      this.groupService.updateColor(this.userId, idGroup, color)
    } catch(e){
      console.error(e);
    }
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
            data.color = '#AE2121';

            try{
              this.groupService.addGroup(this.userId, <Group>data);
            } catch(e){
              console.error(e);
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async filterSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Filtros',
      cssClass: 'filter-groups',
      buttons: [{
      text: `Ultimos Alterados`,
        handler: () => {
          try {
            this.groups = this.groupService.filter('updated_at',this.userId, this.groupsOrderUpdatedAtDesc);
            this.groupsOrderUpdatedAtDesc = !this.groupsOrderUpdatedAtDesc;
            this.groupsOrderNameDesc = false;
            this.groupsOrderCreatedAtDesc = false;
          } catch(e){
            console.error(e);
          }
        }
      },{
        text: 'Ordem Alfabética',
        handler: () => {

          try {
            this.groups = this.groupService.filter('name', this.userId, this.groupsOrderNameDesc);
            this.groupsOrderNameDesc = !this.groupsOrderNameDesc;
            this.groupsOrderCreatedAtDesc = false;
            this.groupsOrderUpdatedAtDesc = false;
          } catch(e){
            console.error(e);
          }

        }
      }, {
        text: 'Data de Criação',
        handler: () => {
          
          try {
            this.groups = this.groupService.filter('created_at',this.userId, this.groupsOrderCreatedAtDesc);
            this.groupsOrderCreatedAtDesc = !this.groupsOrderCreatedAtDesc;
            this.groupsOrderNameDesc = false;
            this.groupsOrderUpdatedAtDesc = false;
          } catch(e){
            console.error(e);
          }


        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {


        }
      }]
    });
    await actionSheet.present();
  }


}
