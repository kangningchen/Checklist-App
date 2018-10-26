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

  checklistList: any;
  newChecklistName: string;
  selectedChecklist: Checklist;

  public constructor(private checklistService: ChecklistService, private router: Router) {
    this.checklistService.getChecklistObservable().subscribe(checklists => this.checklistList = checklists);
  }

  ngOnInit() {
    this.checklistList = this.checklistService.getChecklists();
  }

  goToChecklist(checklist: Checklist): void {
    this.selectedChecklist = checklist;
    this.router.navigate( ['/checklist', this.selectedChecklist.getChecklistId()] );
  }

  addChecklist(newChecklistName: string): void {
    this.checklistService.addChecklist(newChecklistName);
  }

  removeChecklist(checklist: Checklist): void {
    this.checklistService.removeChecklist(checklist);
  }

}
