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
  public checklistList: Checklist[];
  public checklistObservable: Observable<Object>;
  public checklistObserver: Observer<Object>;
  public checklistUpdate: any;



  constructor(public storage: Storage) {
    this.checklistManager = new ChecklistManager();

    this.storage.get('checklists').then(data => {    
      this.checklistData = data;
      if (this.checklistData === undefined) {      
        return false;
      } else {
        this.checklistManager.initFromStorage(this.checklistData);
        this.checklistObserver.next(this.checklistManager.getChecklists());
      }
    });
  }


  getChecklistObserver() {
    this.checklistUpdate = Observable.create(observer => {
      this.checklistObserver = observer;
    });
  }


  public getChecklists(): Checklist[] {
    this.checklistList = this.checklistManager.getChecklists();
    return this.checklistList;
  }


  public getChecklistObservable(): Observable<Object> {
    if (this.checklistObservable === undefined) {
      this.checklistObservable = Observable.create((observer) => {
        this.checklistObserver = observer;
      });
    }
    return this.checklistObservable;
  } 

  addChecklist(newChecklistName: string): void {
    this.checklistManager.addChecklist(newChecklistName);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.checklistObserver.next(updatedChecklists);
    this.storage.set('checklists', updatedChecklists); 
  }

  removeChecklist(checklist: Checklist): void {
    this.checklistManager.removeChecklist(checklist);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.checklistObserver.next(updatedChecklists);
    this.storage.set('checklists', updatedChecklists); 
  }

  getChecklistNameById(id: number) {
    return this.checklistManager.getChecklistNameById(id);
  }
}
