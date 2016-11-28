import { Inject } from '@angular/core';
import { DFService } from './df.service';
import { DFResource } from './dfresource.class';
import { Observable } from 'rxjs/observable';
import { DFModel } from './dfmodel.interface';
import { BehaviorSubject } from 'rxjs/Rx';
import { List } from 'immutable';

export abstract class DFDataStore {

    abstract dfresource:DFResource;

    private _subject:BehaviorSubject<List<DFModel>> = new BehaviorSubject(List([]));
    
    public items:Observable<List<DFModel>> = this._subject.asObservable();

    constructor( private dfservice:DFService ) {}

    loadInitialData() {
        this.retrieve();
    }

    create( model:DFModel ) {

    }

    /**
     * Retrieves records for this DataStore from server based on query params
     * defined in this.dfresourceparams 
     */
    retrieve( ) {
        if( this.dfresource ) {
            this.dfservice.get( this.dfresource )
                .subscribe( next => {
                    this._subject.next( next.json().resource );
                });
        }
    }

    /**
     * Clears the stored objects and query the server again, considering the defined
     * params in this.dfresource.params
     */
    reload() {
        // Lets eveyone know what is going on here... shall we?
        this._subject.next( null );

        this.retrieve();
    }

    update( model:DFModel ) {

    }

    delete( model:DFModel ) {

    }
}