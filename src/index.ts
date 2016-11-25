import { DFDataStore } from './services/dfdatastore';
import { DFModel } from './services/dfmodel.interface';
import { PROVIDERS } from './services';

export { DFService, DFResource, DFModel, DFDataStore } from './services';

export default {
  providers: [PROVIDERS]
}