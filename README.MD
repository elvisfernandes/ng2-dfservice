# ng2-dfservice
This module provides an Angular 2 service to access DreamFactory (tm) from Angular 2.

Please note this is still in alpha and not ready for production.

Contributions are welcome! Just fork this repository, make changes and send a pull request.

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

    this.dfservice.get( new DFResource('service_name', DFService.TABLE, 'table_name') );

# Example
To see a [pretty simplistic] working example please refer to [this GitHub repository](https://github.com/elvisfernandes/dfservice-example)

## License

MIT © [Elvis Fernandes](http://elvis.eti.br)
