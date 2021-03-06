import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';
import { ChecklistManager } from './models/checklistManager';
import { Checklist } from './models/checklist';
import { ChecklistItem } from './models/checklistItem';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  private checklistManager: ChecklistManager;
  private checklist: Checklist;
  private checklistData: Object;
  public checklistList: Checklist[];
  public checklistObservable: Observable<Object>;
  public checklistObserver: Observer<Object>;
  public checklistItemObservable: Observable<Object>;
  public checklistItemObserver: Observer<Object>;



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



  public getChecklists(): Checklist[] {
    this.checklistList = this.checklistManager.getChecklists();
    return this.checklistList;
  }

  public getChecklistItemObservable(): Observable<Object> {
    if (this.checklistItemObservable === undefined) {
      this.checklistItemObservable = Observable.create((observer) => {
        this.checklistItemObserver = observer;
      });
    }
    return this.checklistItemObservable;
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


  public getChecklistItemsByChecklistId(checklistId: number) {
    this.checklistManager.checklists[checklistId].hideCompleteChecked = false;
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);    
    let checklistItems = this.checklistManager.checklists[checklistId]['checklistItems'];
    this.checklistItemObserver.next(checklistItems);
    return checklistItems;
  }

  getUncompletedChecklistItems(checklistId: number) {
    this.checklistManager.checklists[checklistId].hideCompleteChecked = true;
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);    
    let checklistItems = this.checklistManager.checklists[checklistId]['checklistItems'];
    let UncompletedChecklistItems = [];
    for (let i in checklistItems) {
      if (checklistItems[i].checked === false) {
        UncompletedChecklistItems.push(checklistItems[i]);
      }
    }
    this.checklistItemObserver.next(UncompletedChecklistItems);
    return UncompletedChecklistItems;
  }

  getHideCompleteValue(checklistId: number) {
    let hideCompleteChecked = this.checklistManager.checklists[checklistId].hideCompleteChecked;
    return hideCompleteChecked;
  }

  getSortValue(checklistId: number) {
    let sortBy = this.checklistManager.checklists[checklistId].sortBy;
    return sortBy; 
  }

  public getChecklistObservable(): Observable<Object> {
    if (this.checklistObservable === undefined) {
      this.checklistObservable = Observable.create((observer) => {
        this.checklistObserver = observer;
      });
    }
    return this.checklistObservable;
  } 

  public addChecklistItemsByChecklistId(newChecklistItemName: string, checklistId: number) {
    let checklist = this.checklistManager.checklists[checklistId];
    checklist.createChecklistItem(newChecklistItemName);
    if (checklist.sortBy === 'sortAlphabet') {
      this.sortChecklistItemsAlphabetically(checklistId);
    }
    if (checklist.sortBy === 'sortPriority') {
      this.sortChecklistItemsPriority(checklistId);
    }
    let updatedChecklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    this.checklistItemObserver.next(updatedChecklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);    
  }

  removeChecklistItem(checklistItem: ChecklistItem, checklistId: number) {
    let checklist = this.checklistManager.checklists[checklistId];
    checklist.removeChecklistItem(checklistItem);
    if (checklist.sortBy === 'sortAlphabet') {
      this.sortChecklistItemsAlphabetically(checklistId);
    }
    if (checklist.sortBy === 'sortPriority') {
      this.sortChecklistItemsPriority(checklistId);
    }
    let updatedChecklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    this.checklistItemObserver.next(updatedChecklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);
  }

  editChecklistItemByChecklistItemId(edittedData: any, checklistId: number) {
    let checklistItems = this.checklistManager.checklists[checklistId]['checklistItems'];
    for (let i in checklistItems) {
      if (edittedData['checklistItemId'] === checklistItems[i].checklistItemId) {
        checklistItems[i].setChecklistItemName(edittedData['edittedChecklistItemName']);
      }
    }
    // console.log(edittedData, checklistId);
    let updatedChecklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    this.checklistItemObserver.next(updatedChecklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);
  }

  checkChecklistItem(checklistItem: ChecklistItem, checklistId: number) {
    let checklistItems = this.checklistManager.checklists[checklistId]['checklistItems'];
    // console.log('Hey', checklistItems);
    for (let i in checklistItems) {
      if (checklistItems[i].checklistItemId === checklistItem.checklistItemId) {
        checklistItem.checked = true;
        // console.log(checklistItem);
      }
    }
    let updatedChecklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    this.checklistItemObserver.next(updatedChecklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);
  }

  setChecklistItemPriority(checklistId: number) {
    let checklist = this.checklistManager.checklists[checklistId];
    if (checklist.sortBy === 'sortAlphabet') {
      this.sortChecklistItemsAlphabetically(checklistId);
    }
    if (checklist.sortBy === 'sortPriority') {
      this.sortChecklistItemsPriority(checklistId);
    }
    let updatedChecklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    console.log(updatedChecklistItems);
    this.checklistItemObserver.next(updatedChecklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);  
  }

  sortChecklistItemsAlphabetically(checklistId: number) {
    this.checklistManager.checklists[checklistId].sortBy = 'sortAlphabet';
    let checklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    checklistItems.sort(function(a, b) {
      var nameA = a.checklistItemName.toUpperCase(); 
      var nameB = b.checklistItemName.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    // console.log('alpha', checklistItems);
    this.checklistItemObserver.next(checklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);  
  }

  sortChecklistItemsPriority(checklistId: number) {
    this.checklistManager.checklists[checklistId].sortBy = 'sortPriority';
    let checklistItems = this.checklistManager.checklists[checklistId].getChecklistItems();
    checklistItems.sort(function (a, b) {
      return Number(a.priority) - Number(b.priority);
    });
    // console.log('prio', checklistItems)
    this.checklistItemObserver.next(checklistItems);
    let updatedChecklists = this.checklistManager.getChecklists();
    this.storage.set('checklists', updatedChecklists);  
  }
}
