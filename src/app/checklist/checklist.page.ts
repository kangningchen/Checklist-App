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
  checklistItems: ChecklistItem[];

  constructor(private route: ActivatedRoute, private checklistService: ChecklistService) { 
    this.route.params.subscribe((params) => {
      this.checklistId = params['id'];
    });
  }

  getChecklistName() {
    this.checklistName = this.checklistService.getChecklistNameById(this.checklistId);
    console.log('Name', this.checklistName);
  }

  getChecklistItems() {

  }

  addChecklistItems() {

  }


  ngOnInit() {
  }

}
