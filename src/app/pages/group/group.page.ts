import { ArchivedPage } from './archived/archived.page';
import { ListComponent } from './list/list.component';
import { Group } from './../../classes/group';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { GroupService } from './../../services/group.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  groups: Observable<Group[]>;
  groupsArray: Group[];
  groupsOrderNameDesc: boolean = false;
  groupsOrderCreatedAtDesc: boolean = true;
  groupsOrderUpdatedAtDesc: boolean = false;

  userId: string;

  /* Start Message */

@ViewChild('startMessage') startMessage: ElementRef;


  constructor(
    private groupService: GroupService,
    private auth: AuthService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private modalController: ModalController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;
      this.groups = this.groupService.getGroups(res.uid);
      this.groups.subscribe((arrayGroups)=>{
        this.groupsArray = arrayGroups;
        this.showStartMessage(arrayGroups);
      })

    });
  }

  showStartMessage(arrayGroups : Group[]){
    if(!arrayGroups[0]){
      this.startMessage.nativeElement.style.display = "flex";
    } else {
      this.startMessage.nativeElement.style.display = "none";
    }
  }

  addGroup() {
    this.presentGroupAlertInput();
  }

  changeColor(idGroup: string, color: string) {
    try {
      this.groupService.updateColor(this.userId, idGroup, color);
    } catch (e) {
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
          placeholder: 'Nome do conjunto',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            data.color = '#AE2121';
            console.log(data);

            if (data.name == '') {
              this.toastService.presentToast(
                'Não é possível criar um conjunto sem nome!'
              );
            } else {
              try {
                this.groupService.addGroup(this.userId, <Group>data);
              } catch (e) {
                console.error(e);
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async filterSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Filtros',
      cssClass: 'filter-groups',
      buttons: [
        {
          text: `Ultimos Alterados`,
          handler: () => {
            try {
              this.groups = this.groupService.filter(
                'updated_at',
                this.userId,
                this.groupsOrderUpdatedAtDesc
              );
              this.groupsOrderUpdatedAtDesc = !this.groupsOrderUpdatedAtDesc;
              this.groupsOrderNameDesc = false;
              this.groupsOrderCreatedAtDesc = false;
            } catch (e) {
              console.error(e);
            }
          },
        },
        {
          text: 'Ordem Alfabética',
          handler: () => {
            try {
              this.groups = this.groupService.filter(
                'name',
                this.userId,
                this.groupsOrderNameDesc
              );
              this.groupsOrderNameDesc = !this.groupsOrderNameDesc;
              this.groupsOrderCreatedAtDesc = false;
              this.groupsOrderUpdatedAtDesc = false;
            } catch (e) {
              console.error(e);
            }
          },
        },
        {
          text: 'Data de Criação',
          handler: () => {
            try {
              this.groups = this.groupService.filter(
                'created_at',
                this.userId,
                this.groupsOrderCreatedAtDesc
              );
              this.groupsOrderCreatedAtDesc = !this.groupsOrderCreatedAtDesc;
              this.groupsOrderNameDesc = false;
              this.groupsOrderUpdatedAtDesc = false;
            } catch (e) {
              console.error(e);
            }
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  async showList(ev: Event, data: Group) {
    const popover = await this.popoverController.create({
      component: ListComponent,
      componentProps: { group: data, userId: this.userId },
      cssClass: 'my-custom-class',
      event: ev,
    });
    return await popover.present();
  }

  async archivedModal() {
    const modal = await this.modalController.create({
      component: ArchivedPage,
      cssClass: 'my-custom-class',
      componentProps: { userId: this.userId },
    });
    return await modal.present();
  }
}
