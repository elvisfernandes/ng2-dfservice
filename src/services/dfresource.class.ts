export class DFResource {
    private _serviceName:string = null;
    private _resourceType:string = null;
    private _resourceName:string = null;
    private _resourceID:number = null;

    private _body:any;
    set body( body:any ) {
        this._body = body;
    }
    get body() {
        return this._body;
    }

    constructor(serviceName:string, resourceType?:string, resourceName?:string, resourceID?:number) {
        if( serviceName )    this._serviceName = serviceName;
        if( resourceType )   this._resourceType = resourceType;
        if( resourceName )   this._resourceName = resourceName;
        if( resourceID )     this._resourceID = resourceID;
    }
    
    getResourcePath() {
        let path = "";
        
        if( this._serviceName )      path += this._serviceName + '/';
        if( this._resourceType )     path += this._resourceType + '/';
        if( this._resourceName )     path += this._resourceName + '/';
        if( this._resourceID )       path += this._resourceID;

        return path;
    }
}