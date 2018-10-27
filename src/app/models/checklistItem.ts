export class ChecklistItem {

    checked: boolean=false;

    public constructor (public checklistItemName: string,
                        public checklistItemId: number) {

    }

    public setChecklistItemName(newChecklistItemName: string): void {
        this.checklistItemName = newChecklistItemName;
    }

    public getChecklistItemName(): string {
        return this.checklistItemName;
    }

    public getChecklistItemId(): number {
        return this.checklistItemId;
    }

}