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
        this.dfservice.get( this.dfresource )
            .subscribe( next => {
                this._subject.next( next.json().resource );
            });
    }
}