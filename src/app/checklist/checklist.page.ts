import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChecklistItem } from '../models/checklistItem';
import { ChecklistService} from '../checklist.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  checklistId: number;
  checklistName: string;
  checklistItems: any;
  newChecklistItemName: string;
  priority: string;
  hideCompleteChecked: boolean=false;
  sort: string;


  constructor(private route: ActivatedRoute, private modal: ModalController, private checklistService: ChecklistService) { 
    this.route.params.subscribe((params) => {
      this.checklistId = params['id'];
    });
    this.checklistService.getChecklistItemObservable().subscribe( checklistItems => this.checklistItems = checklistItems);
  }


  addChecklistItem(newChecklistItemName: string) {
    this.checklistService.addChecklistItemsByChecklistId(newChecklistItemName, this.checklistId);
    this.hideComplete();
  }

  removeChecklistItem(checklistItem: ChecklistItem) {
    this.checklistService.removeChecklistItem(checklistItem, this.checklistId);
    this.hideComplete();
  }

  async openModal(checklistItem: ChecklistItem) {
    let checklistItemName = checklistItem.getChecklistItemName();
    let checklistItemId = checklistItem.getChecklistItemId();
    let edittedData = {
      checklistItemName: checklistItemName,
      checklistItemId: checklistItemId
    }
    const modal = await this.modal.create({
      component: ModalPage,
    });
    modal.onDidDismiss().then( data => {
      edittedData['edittedChecklistItemName'] = data['data'];
      this.checklistService.editChecklistItemByChecklistItemId(edittedData, this.checklistId);
    });
    return await modal.present();
  }


  check(checklistItem: ChecklistItem) {
    this.checklistService.checkChecklistItem(checklistItem, this.checklistId);
    this.hideComplete();
  }

  setPriority() {
    this.checklistService.setChecklistItemPriority(this.checklistId);
    console.log('triggered');
  }

  hideComplete() {
    if (this.hideCompleteChecked === true) {
      this.checklistItems = this.checklistService.getUncompletedChecklistItems(this.checklistId);
      // console.log(this.hideCompleteChecked);
    }
    else {
      this.checklistItems = this.checklistService.getChecklistItemsByChecklistId(this.checklistId);
    }
    
  }

  getHideCompleteValue() {
    this.checklistService.getHideCompleteValue(this.checklistId);
  }

  sortChecklistItems() {
    if (this.sort === 'sortAlphabet') {
      this.checklistService.sortChecklistItemsAlphabetically(this.checklistId);
    }

    if (this.sort === 'sortPriority') {
      this.checklistService.sortChecklistItemsPriority(this.checklistId);
    }
  }

  ngOnInit() {
    this.checklistName = this.checklistService.getChecklistNameById(this.checklistId);
    this.hideCompleteChecked = this.checklistService.getHideCompleteValue(this.checklistId);
    this.sort = this.checklistService.getSortValue(this.checklistId);
    // this.checklistItems = this.checklistService.getChecklistItemsByChecklistId(this.checklistId);
    this.hideComplete();
    this.sortChecklistItems();
    console.log(this.checklistItems);
  }

}
