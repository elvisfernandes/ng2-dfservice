// Import all services
import {DFService} from './services/df.service';
import {DFResource} from './services/dfresource.class';
import { DFDataStore } from './services/dfdatastore.class';
import { DFModel } from './services/dfmodel.class';

// Export all services
export * from './services/df.service';
export * from './services/dfresource.class';
export * from './services/dfdatastore.class';
export * from './services/DFModel.class';

// Export convenience property
export const PROVIDERS: any[] = [
  DFService,
  DFResource,
  DFDataStore
];
