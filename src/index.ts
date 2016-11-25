import { DFDataStore } from './services/dfdatastore.class';
import { DFModel } from './services/dfmodel.interface';
import { PROVIDERS } from './services';

export { DFService, DFResource, DFModel, DFDataStore } from './services';

export default {
  providers: [PROVIDERS]
}