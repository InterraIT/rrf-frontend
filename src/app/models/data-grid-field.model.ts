export class DataGridField {
    fieldName: string;
    sortingClass: string;
    constructor(fieldName: string, sortingClass: string) {
        this.fieldName = fieldName;
        this.sortingClass = sortingClass;
    }
}