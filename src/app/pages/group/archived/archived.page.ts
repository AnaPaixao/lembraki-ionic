import { GroupService } from './../../../services/group.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Group } from 'src/app/classes/group';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
})
export class ArchivedPage implements OnInit, OnDestroy {
  constructor(
    private modalCtrl: ModalController,
    private groupService: GroupService
  ) {}

  @Input('userId') userId: string;
  archivedGroupsObservable: Observable<Group[]>;
  archivedGroups: Group[] = [];
  sub: Subscription;

  ngOnInit() {
    this.archivedGroupsObservable = this.groupService.getGroups(
      this.userId,
      true,
      'updated_at'
    );
    this.sub = this.archivedGroupsObservable.subscribe((res) => {
      res.map((data) => {
        data.updated_at = new Date(data.updated_at.seconds * 1000);
        this.archivedGroups.push(<Group>data);
      });
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  undo(groupId: string) {
    this.groupService.toggleArchived(this.userId, groupId, true);
    this.archivedGroups = [];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
