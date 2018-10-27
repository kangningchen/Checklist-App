import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private modal: ModalController, private navParams: NavParams) { }
  
  edittedChecklistItemName: string;

  ngOnInit() {
  }

  closeModal() {
    this.modal.dismiss(this.edittedChecklistItemName);
  }

}
