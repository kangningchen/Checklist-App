import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checklist } from '../models/checklist';
import { ChecklistItem } from '../models/checklistItem';
import { ChecklistService} from '../checklist.service';

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

  constructor(private route: ActivatedRoute, private checklistService: ChecklistService) { 
    this.route.params.subscribe((params) => {
      this.checklistId = params['id'];
    });
    this.checklistService.getChecklistItemObservable().subscribe( checklistItems => this.checklistItems = checklistItems);
  }


  addChecklistItem(newChecklistItemName: string) {
    this.checklistService.addChecklistItemsByChecklistId(newChecklistItemName, this.checklistId);
  }

  removeChecklistItem(checklistItem: ChecklistItem) {
    this.checklistService.removeChecklistItem(checklistItem, this.checklistId);
  }


  ngOnInit() {
    this.checklistName = this.checklistService.getChecklistNameById(this.checklistId);
    this.checklistItems = this.checklistService.getChecklistItemsByChecklistId(this.checklistId);
    console.log(this.checklistItems);
  }

}
