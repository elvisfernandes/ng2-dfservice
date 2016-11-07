// Import all services
import {DFService} from './services/df.service';
import {DFResource} from './services/dfresource.class';
import {DFResourceListInterface} from './services/dfresourcelist.interface';

// Export all services
export * from './services/df.service';
export * from './services/dfresource.class';
export * from './services/dfresourcelist.interface';

// Export convenience property
export const PROVIDERS: any[] = [
  DFService,
  DFResource
];
