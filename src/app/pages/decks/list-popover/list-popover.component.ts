import { Deck } from './../../../classes/deck';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-popover',
  templateUrl: './list-popover.component.html',
  styleUrls: ['./list-popover.component.scss'],
})
export class ListPopoverComponent implements OnInit {


  @Input('deck') deck: Deck;
  @Input('userId') userId: string;

  constructor() { }

  ngOnInit() {}

  edit(){

  }

  delete(){

  }

  archive(){

  }

}
