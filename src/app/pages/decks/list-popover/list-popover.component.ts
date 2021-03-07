import { Deck } from './../../../classes/deck';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { DecksService } from 'src/app/services/decks.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list-popover',
  templateUrl: './list-popover.component.html',
  styleUrls: ['./list-popover.component.scss'],
})
export class ListPopoverComponent implements OnInit {


  @Input('deck') deck: Deck;
  @Input('userId') userId: string;
  @Input('groupId') groupId: string;

  constructor(
    private alertController: AlertController,
    private popover: PopoverController,
    private decksService: DecksService,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

  edit(){
    this.popover.dismiss();
  }

  delete(){
    this.alertConfirmDelete();
    this.popover.dismiss();
  }

  archive(){
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
              // this.groupService.deleteGroup(this.userId, this.group.id);
              this.decksService.deleteDeck(this.userId, this.groupId, this.deck.id);
              this.toastService.presentToast(`O deck [${this.deck.name}] foi excluido!`)
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
              this.decksService.toggleArchived(this.userId, this.groupId, this.deck.id, this.deck.archived);
              this.toastService.presentToast(`O conjunto [${this.deck.name}] foi arquivado!`)
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
