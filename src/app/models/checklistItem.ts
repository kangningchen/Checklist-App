export class ChecklistItem {

    public constructor (private checklistItemName: string,
                        private checklistItemId: number) {

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