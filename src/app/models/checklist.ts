import { ChecklistItem } from './checklistItem';

var nextChecklistItemId: number = 0;

export class Checklist {

    checklistItems: ChecklistItem[]=[];
    hideCompleteChecked: boolean=false;

    public constructor (private checklistName: string, 
                        private checklistId: number) {
        
    }

    private getNextChecklistItemId() {
        return nextChecklistItemId ++;
    }

    public setChecklistName(newChecklistName: string): void {
        this.checklistName = newChecklistName;
    }

    public getChecklistName(): string {
        return this.checklistName;
    }

    public getChecklistId() {
        return this.checklistId;
    }

    public getChecklistItems(): ChecklistItem[] {
        return this.checklistItems;
    }

    public createChecklistItem(checklistItemName: string) {
        let checklistItemId = this.getNextChecklistItemId();
        let checklistItem = new ChecklistItem(checklistItemName, checklistItemId);
        this.checklistItems.push(checklistItem);
        return checklistItem;
    }

    public getChecklistItemById(id: number): ChecklistItem {
        return this.checklistItems[id];
    }

    public getChecklistItemByName(name: string): ChecklistItem {
        let checklistItemList = this.getChecklistItems();
        for (let i in checklistItemList) {
            if (checklistItemList[i].getChecklistItemName() === name) {
                return checklistItemList[i];
            }
        }
        return undefined;
    }

    public removeChecklistItem(checklistItem: ChecklistItem) {
        for (let i in this.checklistItems) {
            if (checklistItem === this.checklistItems[i]) {
                this.checklistItems.splice(Number(i), 1);
            }
        }   
    }

    public removeChecklistItemById(id: number) {
        delete this.checklistItems[id];
    }

}