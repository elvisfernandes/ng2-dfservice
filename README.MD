# ng2-dfservice

**This module has been deprecated, basically due to naming conventions. The same functionality is provided by [ng-dfservice](htts://github.com/elvisfernandes/ng-dfservice) module**. Use that other module instead (unless you want to stay on Angular 2).

This module provides an Angular 2 service to access DreamFactory (tm) from Angular 2.

Please note this is still in alpha and not ready for production.

Contributions are welcome! Just fork this repository, make changes and send a pull request.

For more information about DreamFactory (tm) visit [their website](http://dreamfactory.com).

# Features
- Uses Angular 2 dependency injection to provide api URL and API key, so you can keep your DSP data in a convenient place (environments/environment.ts, for example). You can even keep development, testing and production API URL and key in your codebase without worrying to change it depending on your environment.
- Provides a helper class to create DreamFactory resources URL (you shouldn't worry with URL specification in the middle of your code).
- Manages user login / logout, storing AWT session token in browser's local storage. You don't need a separate package to deal with that.
- Emits events for login / logout / unauthorized login.
- Provides methods for all REST operations on your DreamFactory instance.
- Provides DataStore objects to simplify access to data to/from the server.
- Set query options to retrieve data from the server.

# How to use
## 1 - Install ng2-dfservice from npm

Make sure you have typings installed, either globally or locally

    $ npm install typings

OR

    $ npm install -g typings

Now you can install ng2-dfservice

    $ npm install ng2-dfservice --save


## 2 - Extend abstract class DFModel and implement proper methods to create your models
    import { DFModel } from 'ng2-dfservice';

    export class YourModel extends DFModel {
    
        // Set your object's properties
        id:number;
        name:string = '';
        
        fromJSON( jsonmodel:any ):void {
            this.id = jsonmodel.id;
            this.name = jsonmodel.name;
        }
    
        toJSON():any {
            let jsonmodel = {
                id: this.id,
                name: this.name
            };
            return jsonmodel;
        }
    
        factory():YourModel {
            return new YourModel();
        }
    }
## 3 - Extend abstract class DFDataStore to create your data store objects
You can initialize the parameters of your data store in the constructor if you need something different than the default options

    import { Inject } from '@angular/core';
    import { DFDataStore, DFService, DFResource } from 'ng2-dfservice';
    import { YourModel } from '../where/your/model/is/located';

    export class YourDataStore extends DFDataStore {

        dfresource:DFResource = new DFResource('yourservice', DFService.RESOURCE_TABLE, 'yourtable');
        modelclass:any = YourModel;
        
        constructor( @Inject(DFService) private dfs: DFService ) { 
            super(dfs);
            
            this.dfresource.params.include_count = true;
            this.dfresource.params.limit = 20;
        }
    }

## 3 - Provide all your DataStores alongside with URL and API keys in your module
    import { DFService } from 'ng2-dfservice';
    import { YourDataStore } from 'where-you-place-it';

    (...)

    providers: [
        DFService,
        { provide: YourDataStore, useClass: YourDataStore, deps: [DFService] },
        { provide: DFService.API_URL, useValue: 'YOUR_DF2_URL' },
        { provide: DFService.API_KEY, useValue: 'YOUR_DF2_API_KEY' },
        (... whatever else you need to provide...)
    ]

## 4 - Enjoy! :)
Just inject you data store / DFService in your component and use CRUD methods or `login` and `logout` methods.

    import { YourDataStore } from 'where-you-place-it';
    import { DFService, DFResource } from 'ng2-dfservice';
    import { YourModel } from '../where/your/model/is/located';

    (...)
    constructor( private yourstore:YourDataStore ) {}
    (...)
    // Use your datastore
    let newmodel = new YourModel();
    newmodel.name = 'New model name';
    
    // Create
    this.yourstore.create( newmodel );
    
    // Retrieve (supposing 3 is the ID of the model you want to retrieve)
    // This model will be added to the `items` list of yourstore
    this.yourstore.retrieve( 3 );
    
    // Update
    newmodel.name = 'Changed name :)';
    this.yourstore.update( newmodel );
    
    // Delete
    this.yourstore.delete( newmodel );

# Example
To see a [pretty simplistic] working example please refer to [this GitHub repository](https://github.com/elvisfernandes/dfservice-example)

## License

MIT © [Elvis Fernandes](http://elvis.eti.br)
