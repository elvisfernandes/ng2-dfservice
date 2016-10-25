// Import all services
import {DFService} from './services/df.service';
import {DFResource} from './services/dfresource.class';

// Export all services
export * from './services/df.service';
export * from './services/dfresource.class';

// Export convenience property
export const PROVIDERS: any[] = [
  DFService,
  DFResource
];
