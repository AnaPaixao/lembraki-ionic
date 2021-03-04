import { Group } from './../../../classes/group';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterContentInit {

  @Input('group') group: Group;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(){
    console.log(this.group);
  }

  rename(){

  }

  delete(){

  }

  archive(){

  }

}
