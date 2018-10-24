import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';

import { ChecklistManager } from './models/checklistManager';
import { Checklist } from './models/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  private checklistManager: ChecklistManager;
  private checklistData: Object;
  private checklistObservable: Observable<Checklist[]>;


  constructor(public storage: Storage) {
    this.checklistManager = new ChecklistManager();
    this.storage.get('checklists').then(data => {    
      this.checklistData = data;
      if (this.checklistData === undefined) {      
        return false;
      } else {
        this.checklistManager.initFromStorage(this.checklistData);
      }
    });
  }

  // getChecklists(): Checklist[] {
  //   this.checklistManager.getChecklists();
  // }


  public getChecklists(): Observable<Checklist[]> {
    if (this.checklistObservable === undefined) {
      this.checklistObservable = Observable.create((observer) => {
        observer.next(this.checklistManager.getChecklists());
      });
    }
    return this.checklistObservable;
  } 

  addChecklist(newChecklistName: string): void {
    this.checklistManager.addChecklist(newChecklistName);
    let updatedChecklists = this.checklistManager.getChecklists();
    // console.log(updatedChecklists[0].getChecklistName());
    this.storage.set('checklists', updatedChecklists); 
    // this.storage.get('checklists').then( data => {
    //   console.log(data);
    // });

  }

  removeChecklist(checklist: Checklist): void {
    this.checklistManager.removeChecklist(checklist);
  }

}
