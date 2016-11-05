# ng2-dfservice
This module provides an Angular 2 service to access DreamFactory (tm) from Angular 2.

Please note this is still in alpha and not ready for production.

Contributions are welcome! Just fork this repository, make changes and send a pull request.

# Features
- Uses Angular 2 dependency injection to provide api URL and API key, so you can keep your DSP data in a convenient place (environments/environment.ts, for example). You can even keep development, testing and production API URL and key in your codebase without worrying to change it depending on your environment.
- Provides a helper class to create DreamFactory resources URL (you shouldn't worry with URL specification in the middle of your code).
- Manages user login / logout, storing AWT session token in browser's local storage. You don't need a separate package to deal with this.
- Emits events for login / logout / unauthorized login.
- Provides methods for all REST operations on your DreamFactory instance.

# How to use
## 1 - Install ng2-dfservice from npm
    $ npm install ng2-dfservice --save

## 2 - Provide DFService, URL and API keys in your module
    import { DFService } from 'ng2-dfservice';

    (...)

    providers: [
        DFService,
        { provide: DFService.API_URL, useValue: 'YOUR_DF2_URL' },
        { provide: DFService.API_KEY, useValue: 'YOUR_DF2_API_KEY' },
    ],
## 3 - Be happy :)
Just inject DFService in your component and use `get`, `post`, `put`, `patch`, `delete`, `login` and `logout` methods.

    import { DFService, DFResource } from 'ng2-dfservice';

    (...)

    this.dfservice.get( new DFResource('service_name', DFService.RESOURCE_TABLE, 'table_name') );

# Example
To see a [pretty simplistic] working example please refer to [this GitHub repository](https://github.com/elvisfernandes/dfservice-example)

## License

MIT © [Elvis Fernandes](http://elvis.eti.br)
