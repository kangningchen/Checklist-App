import { Checklist } from './checklist';
import { ChecklistItem } from './checklistItem';

export class ChecklistManager {
    
    public checklists: Object = {};
 

    public constructor () {}

    public initFromStorage(checklistData: Object) {
        
        for (let i in checklistData) {
            console.log(checklistData);
            let checklistName:string = checklistData[i]['checklistName'];
            let checklistId:number = parseInt(checklistData[i]['checklistId']);  
            let checklistHideCompleteChecked: boolean = checklistData[i]['hideCompleteChecked'];
            let checklistSortBy: string = checklistData[i]['sortBy'];
            console.log('hey', checklistHideCompleteChecked);
            let checklistItems:any = checklistData[i]['checklistItems']; 
            let checklist = this.createChecklistWithId(checklistName, checklistId);
            checklist.hideCompleteChecked = checklistHideCompleteChecked;
            checklist.sortBy = checklistSortBy;
            for (let i in checklistItems) {
                let checklistItem = checklist.createChecklistItem(checklistItems[i]['checklistItemName']);
                checklistItem.checked = checklistItems[i].checked;
                checklistItem.priority = checklistItems[i].priority;
            }       

        }
    }

    public createChecklistWithId(checklistName: string, checklistId: number): Checklist {
        let checklist = new Checklist(checklistName, checklistId);
        this.checklists[checklistId] = checklist;
        return checklist;
    }

    private getNextChecklistId() {
        let maxId = 0;
        for (let k in this.checklists) {
            if (this.checklists[k]['checklistId'] > maxId) {
                maxId = this.checklists[k]['checklistId'];
            }
        }
        maxId ++;
        return maxId ++;
    }

    public getChecklists(): Checklist[] {
        let checklistList: Checklist[] = [];
        for (let i in this.checklists) {
            checklistList.push(this.checklists[i]);
        }
        return checklistList;
    }


    public addChecklist(newChecklistName: string) {
        let checklistId = this.getNextChecklistId();
        let checklist = new Checklist (newChecklistName, checklistId);
        this.checklists[checklistId] = checklist;
    }

    public getChecklistById(id: number): Checklist {
        return this.checklists[id];
    }

    public getChecklistNameById(id: number): string {
        return this.checklists[id]['checklistName'];
    }

    public getChecklistByName(name: string): Checklist {
        let checklistList = this.getChecklists();
        for (let i in checklistList) {
            if (checklistList[i].getChecklistName() === name) {
                return checklistList[i];
            }
        }
        return undefined;
    }

    public removeChecklist(checklist: Checklist) {
        delete this.checklists[checklist.getChecklistId()];
        console.log(this.checklists);
    }

    public removeChecklistById(id: number) {
        delete this.checklists[id];
    }

}