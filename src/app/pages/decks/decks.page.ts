import { Group } from './../../classes/group';
import { GroupService } from './../../services/group.service';
import { ArchivedPage } from './archived/archived.page';
import {
  AlertController,
  ActionSheetController,
  PopoverController,
  ModalController,
} from '@ionic/angular';
import { Deck } from './../../classes/deck';
import { DecksService } from './../../services/decks.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ListPopoverComponent } from './list-popover/list-popover.component';
import { ToastService } from '../../services/toast.service';


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
    private groupService: GroupService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    public modalController: ModalController,
    private toastService: ToastService
  ) {}

  userId: string;
  groupId: string;
  groupName: string;
  groupColor: string;

  decks: Observable<Deck[]>;
  decksArray: Deck[];

  /* Start Message */

@ViewChild('startMessage') startMessage: ElementRef;

  //Filter
  decksOrderNameDesc: boolean = false;
  decksOrderCreatedAtDesc: boolean = true;
  decksOrderUpdatedAtDesc: boolean = false;

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('groupId');

      this.auth.getAuth().authState.subscribe((res) => {
      this.userId = res.uid;
      this.decks = this.decksService.getDecks(res.uid, this.groupId);

       this.groupService.getGroupOnce(res.uid, this.groupId).subscribe((e) => {
        console.log(e.data());
        this.groupName = e.data().name;
        this.groupColor = e.data().color;
      });

      this.decks.subscribe((arrayDecks)=>{
        this.decksArray = arrayDecks;
        this.showStartMessage(arrayDecks);
      })
    });
  }

  showStartMessage(arrayDecks : Deck[]){
    if(!arrayDecks[0]){
      this.startMessage.nativeElement.style.display = "flex";
    } else {
      this.startMessage.nativeElement.style.display = "none";
    }
  }


  addDeck() {
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
            if (data.name == "") {
              this.toastService.presentToast('Não é possível criar um deck sem nome!');
            } else {
              try {
                data.color = this.groupColor;
                this.decksService.addDeck(
                  this.userId,
                  this.groupId,
                  <Deck>data
                );
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
              this.decks = this.decksService.filter(
                'updated_at',
                this.userId,
                this.groupId,
                this.decksOrderUpdatedAtDesc
              );
              this.decksOrderUpdatedAtDesc = !this.decksOrderUpdatedAtDesc;
              this.decksOrderNameDesc = false;
              this.decksOrderCreatedAtDesc = false;
            } catch (e) {
              console.error(e);
            }
          },
        },
        {
          text: 'Ordem Alfabética',
          handler: () => {
            try {
              this.decks = this.decksService.filter(
                'name',
                this.userId,
                this.groupId,
                this.decksOrderNameDesc
              );
              this.decksOrderNameDesc = !this.decksOrderNameDesc;
              this.decksOrderCreatedAtDesc = false;
              this.decksOrderUpdatedAtDesc = false;
            } catch (e) {
              console.error(e);
            }
          },
        },
        {
          text: 'Data de Criação',
          handler: () => {
            try {
              this.decks = this.decksService.filter(
                'created_at',
                this.userId,
                this.groupId,
                this.decksOrderCreatedAtDesc
              );
              this.decksOrderCreatedAtDesc = !this.decksOrderCreatedAtDesc;
              this.decksOrderNameDesc = false;
              this.decksOrderUpdatedAtDesc = false;
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

  async archivedModal() {
    const modal = await this.modalController.create({
      component: ArchivedPage,
      cssClass: 'my-custom-class',
      componentProps: { userId: this.userId, groupId: this.groupId },
    });
    return await modal.present();
  }

  async showList(ev: Event, data: Deck) {
    const popover = await this.popoverController.create({
      component: ListPopoverComponent,
      componentProps: {
        deck: data,
        userId: this.userId,
        groupId: this.groupId,
      },
      cssClass: 'my-custom-class',
      event: ev,
    });
    return await popover.present();
  }


}
