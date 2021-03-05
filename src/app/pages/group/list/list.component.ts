import { ToastService } from './../../../services/toast.service';
import { GroupService } from './../../../services/group.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { Group } from './../../../classes/group';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterContentInit {
  @Input('group') group: Group;
  @Input('userId') userId: string;

  constructor(
    private alertController: AlertController,
    private popover: PopoverController,
    private groupService: GroupService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    // console.log(this.group);
  }

  rename() {
    this.changeNameAlertInput();
    this.popover.dismiss();
  }

  delete() {
    this.alertConfirmDelete();
    this.popover.dismiss();
  }

  archive() {
    this.alertConfirmArchive();
    this.popover.dismiss();
  }

  async alertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'alert-confirm-delete',
      header: 'Confirmar',
      message: 'Tem certeza que deseja <strong>deletar</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            try {
              this.groupService.deleteGroup(this.userId, this.group.id);
              this.toastService.presentToast(`O conjunto [${this.group.name}] foi excluido!`)
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async alertConfirmArchive() {
    const alert = await this.alertController.create({
      cssClass: 'alert-confirm-delete',
      header: 'Confirmar',
      message: 'Tem certeza que deseja <strong>Arquivar</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            try {
              this.groupService.toggleArchived(this.userId, this.group.id, this.group.archived);
              this.toastService.presentToast(`O conjunto [${this.group.name}] foi arquivado!`)
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async changeNameAlertInput() {
    const alert = await this.alertController.create({
      cssClass: 'alertGroup',
      header: 'Renomear Conjunto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.group.name,
          placeholder: 'Novo Nome'
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
            try{
              this.groupService.renameGroup(this.userId, this.group.id, data.name);
              this.toastService.presentToast(`Conjunto renomeado!`);
            } catch(e){
              console.error(e);
            }

          }
        }
      ]
    });

    await alert.present();
  }

}
