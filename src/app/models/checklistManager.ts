import { Checklist } from './checklist';

var nextChecklistId: number = 0;

export class ChecklistManager {
    
    private checklists: Object = {};

    public constructor () {}

    public initFromStorage(checklistData: Object) {
        
        for (let i in checklistData) {
            let checklistName:string = checklistData[i]['checklistName'];
            let checklistId: number = parseInt(checklistData[i]['checklistId']);
            this.createChecklistWithId(checklistName, checklistId);
        }
        // console.log(this.checklists);
    }

    private createChecklistWithId(checklistName: string, checklistId: number): Checklist {
        let checklist = new Checklist(checklistName, checklistId);
        this.checklists[checklistId] = checklist;
        return checklist;
    }

    private getNextChecklistId() {
        return nextChecklistId ++;
    }

    // public getChecklists(): Checklist[] {
    //     let checklistList: Checklist[] = [];
    //     for (let i in this.checklists) {
    //         checklistList.push(this.checklists[i]);
    //     }
    //     return checklistList;
    // }

    public getChecklists(): Checklist[] {
        let checklistList: Checklist[] = [];
        console.log(this.checklists);
        for (let i in Object.keys(this.checklists)) {
            console.log('Loop running')
            checklistList.push(this.checklists[i]);
        }
        console.log('Out of loop')
        return ;
    }

    // public getChecklists(): Checklist[] {
    //     return [new Checklist('test', 100), new Checklist('test2', 101)];
    // }  

    public addChecklist(newChecklistName: string) {
        let checklistId = this.getNextChecklistId();
        let checklist = new Checklist (newChecklistName, checklistId);
        this.checklists[checklistId] = checklist;
        // console.log(this.checklists);
    }

    public getChecklistById(id: number): Checklist {
        return this.checklists[id];
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
    }

    public removeChecklistById(id: number) {
        delete this.checklists[id];
    }

}