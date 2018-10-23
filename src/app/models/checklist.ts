import { ChecklistItem } from './checklistItem';

var nextChecklistItemId: number = 0;

export class Checklist {

    private checklistItems: Object = {};

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
        let checklistItemList: ChecklistItem[] = [];
        for (let k in this.checklistItems) {
            checklistItemList.push(this.checklistItems[k]);
            return checklistItemList;
        }
    }

    public createChecklistItem(checklistItemName: string) {
        let checklistItemId = this.getNextChecklistItemId();
        let checklistItem = new ChecklistItem(checklistItemName, this.getNextChecklistItemId());
        this.checklistItems[checklistItemId] = checklistItem;
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

    public removeChecklist(checklistItem: ChecklistItem) {
        delete this.checklistItems[checklistItem.getChecklistItemId()];
    }

    public removeChecklistItemById(id: number) {
        delete this.checklistItems[id];
    }

}