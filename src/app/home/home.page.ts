import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Checklist } from '../models/checklist';
import { ChecklistService} from '../checklist.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  checklists: Checklist[];
  newChecklistName: string;
  selectedChecklist: Checklist;

  public constructor(private router: Router, private checklistService: ChecklistService) {
    
  }

  ngOnInit() {
    this.checklistService.getChecklists().subscribe(checklists => this.checklists = checklists);
    // console.log(this.checklists);
    
  }

  goToChecklist(checklist: Checklist): void {
    this.selectedChecklist = checklist;
    this.router.navigate( ['/checklist', this.selectedChecklist.getChecklistId()] );
  }

  addChecklist(newChecklistName: string): void {
    this.checklistService.addChecklist(newChecklistName);
  }

}
