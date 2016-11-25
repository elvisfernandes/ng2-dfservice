// Import all services
import {DFService} from './services/df.service';
import {DFResource} from './services/dfresource.class';
import { DFDataStore } from './services/dfdatastore';
import { DFModel } from './services/dfmodel.interface';

// Export all services
export * from './services/df.service';
export * from './services/dfresource.class';
export * from './services/dfdatastore';
export * from './services/DFModel.interface';

// Export convenience property
export const PROVIDERS: any[] = [
  DFService,
  DFResource,
  DFDataStore
];
