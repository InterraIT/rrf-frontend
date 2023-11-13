export class IBreadCrumb {
    label: string;
    url: string;
    canLink: boolean;
    isLast: boolean;
    params: [];
    fooParams: any
    constructor(label: string, url: string, canLink: boolean, isLast: boolean, params: [], queryParams: any = {}) {
        this.label = label;
        this.url = url;
        this.canLink = canLink;
        this.params = params;
        this.isLast = isLast;
        this.fooParams = queryParams;
    }
}