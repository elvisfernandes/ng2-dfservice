import { Injectable, EventEmitter, Output, OpaqueToken, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';

import { DFResource } from './dfresource.class';

@Injectable()
export class DFService {
  
  private _base_api:string;
  private _api_key:string;
  private _session_token:string = '';

  private headers:Headers;
  private requestOptions:RequestOptions;

  // Login/logout related event
  @Output() loginEvent = new EventEmitter<number>();

  private static SESSION_TOKEN_IDENTIFIER:string = 'ng2-dfservice-session-token';

  public static RESOURCE_SCHEMA:string = "_schema";
  public static RESOURCE_TABLE:string = "_table";
  public static RESOURCE_PROCEDURE:string = "_proc";
  public static RESOURCE_FUNCTION:string = "_func";

  public static RESULT_OK:number = 200;
  public static RESULT_UNAUTHORIZED:number = 401;
  public static RESULT_NOTFOUND:number = 404;

  public static LOGIN_OK:number = 1;
  public static LOGIN_DISCONNECTED:number = 0;
  public static LOGIN_UNAUTHORIZED = -1

  public static API_URL = new OpaqueToken('df2_api_url');
  public static API_KEY = new OpaqueToken('df2_api_key');
  public static DF_RESOURCES = new OpaqueToken('DFResourceListInterface');

  constructor( 
                @Inject(DFService.API_URL) api_endpoint:string, 
                @Inject(DFService.API_KEY) api_key:string, 
                private http:Http
              ) {
    this._base_api = api_endpoint;
    this._api_key = api_key;

    DFService.SESSION_TOKEN_IDENTIFIER += this._api_key;

    this.headers = new Headers();
    this.headers.append( 'X-DreamFactory-Api-Key', this._api_key );
    this.requestOptions = new RequestOptions({ headers: this.headers });

    // Initializes this.session_token using localStorage
    this.session_token = localStorage.getItem( DFService.SESSION_TOKEN_IDENTIFIER );
  }

  get( resource:DFResource ) {
    return this.http.get( 
                    this._base_api + resource.getResourcePath(), 
                    this.requestOptions 
                  );
  }

  post( resource:DFResource ) {
    return this.http.post(
                    this._base_api + resource.getResourcePath(),
                    resource.body,
                    this.requestOptions
                  );
  }

  patch( resource:DFResource ) {
    return this.http.patch(
                    this._base_api + resource.getResourcePath(),
                    resource.body,
                    this.requestOptions
                  );
  }

  put( resource:DFResource ) {
    return this.http.put(
                    this._base_api + resource.getResourcePath(),
                    resource.body,
                    this.requestOptions
                  );
  }

  delete( resource:DFResource ) {
    return this.http.delete(
                    this._base_api + resource.getResourcePath(),
                    this.requestOptions
                  );
  }

  /*
  * Login/logout related methods
  */
  get session_token() {
    return this._session_token;
  }
  set session_token(token) {
    this._session_token = token;
    localStorage.setItem( DFService.SESSION_TOKEN_IDENTIFIER, this._session_token );
    
    if( this._session_token || this._session_token === '') {
      this.requestOptions.headers.delete('X-DreamFactory-Session-Token');
    }
    else {
      this.requestOptions.headers.set('X-DreamFactory-Session-Token', this._session_token);
    }
  }

  login( email:string, password:string ) : Observable<any> {
    let dfr:DFResource = new DFResource( "user", null, "session" );
    dfr.body = { email: email, password: password, remember_me: true };

    let ret = this.post( dfr );

    ret.subscribe( (next) => {
      if( next.status == DFService.RESULT_OK ) {
        this.session_token = next.json().session_token;
        this.loginEvent.emit(DFService.LOGIN_OK);
      }
    }, (error) => {
      if ( error.status == DFService.RESULT_UNAUTHORIZED ) {
        this.loginEvent.emit(DFService.LOGIN_UNAUTHORIZED);
      }
    });

    return ret;
  }

  logout( ) {
    let dfr:DFResource = new DFResource("user", null, "session");

    let ret = this.delete( dfr );
    
    ret.subscribe( (next) => {
      if( next.status == DFService.RESULT_OK ) {
        this.session_token = '';
        this.loginEvent.emit(DFService.LOGIN_DISCONNECTED);
      }
    });

    return ret;
  }

  refreshToken() {
    let dfr:DFResource = new DFResource('user', null, 'session');

    return this.put(dfr);
  }

  isLoggedIn():boolean {
    return this.session_token != "null" && this.session_token.length > 0;
  }
}