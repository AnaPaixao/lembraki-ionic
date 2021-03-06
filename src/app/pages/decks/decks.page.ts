import { ArchivedPage } from './archived/archived.page';
import { AlertController, ActionSheetController, PopoverController, ModalController } from '@ionic/angular';
import { Deck } from './../../classes/deck';
import { DecksService } from './../../services/decks.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListPopoverComponent } from './list-popover/list-popover.component';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private decksService: DecksService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    public modalController: ModalController
  ) {}

  userId: string;
  groupId: string;
  groupName: string;

  decks: Observable<Deck[]>;


  //Filter
  decksOrderNameDesc: boolean = false;
  decksOrderCreatedAtDesc: boolean = true;
  decksOrderUpdatedAtDesc: boolean = false;

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    this.groupName = this.route.snapshot.paramMap.get('groupName');

    this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;
      this.decks = this.decksService.getDecks(res.uid, this.groupId);
    });
  }

  addDeck(){
    this.presentDecksAlertInput();
  }

  async presentDecksAlertInput() {
    const alert = await this.alertController.create({
      cssClass: 'alertGroup',
      header: 'Criar Novo Deck',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome do Deck',
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
            try {
              this.decksService.addDeck(this.userId, this.groupId, <Deck>data);
            } catch (e) {
              console.error(e);
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
      buttons: [{
      text: `Ultimos Alterados`,
        handler: () => {
          // try {
          //   this.groups = this.groupService.filter('updated_at',this.userId, this.groupsOrderUpdatedAtDesc);
          //   this.groupsOrderUpdatedAtDesc = !this.groupsOrderUpdatedAtDesc;
          //   this.groupsOrderNameDesc = false;
          //   this.groupsOrderCreatedAtDesc = false;
          // } catch(e){
          //   console.error(e);
          // }
        }
      },{
        text: 'Ordem Alfabética',
        handler: () => {
          // try {
          //   this.groups = this.groupService.filter('name', this.userId, this.groupsOrderNameDesc);
          //   this.groupsOrderNameDesc = !this.groupsOrderNameDesc;
          //   this.groupsOrderCreatedAtDesc = false;
          //   this.groupsOrderUpdatedAtDesc = false;
          // } catch(e){
          //   console.error(e);
          // }
        }
      }, {
        text: 'Data de Criação',
        handler: () => {
          // try {
          //   this.groups = this.groupService.filter('created_at',this.userId, this.groupsOrderCreatedAtDesc);
          //   this.groupsOrderCreatedAtDesc = !this.groupsOrderCreatedAtDesc;
          //   this.groupsOrderNameDesc = false;
          //   this.groupsOrderUpdatedAtDesc = false;
          // } catch(e){
          //   console.error(e);
          // }
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  async archivedModal() {
    const modal = await this.modalController.create({
      component: ArchivedPage,
      cssClass: 'my-custom-class',
      componentProps: {userId: this.userId, groupId: this.groupId}
    });
    return await modal.present();
  }

  async showList(ev: Event, data: Deck){
    const popover = await this.popoverController.create({
      component: ListPopoverComponent,
      componentProps: {deck: data, userId: this.userId},
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
