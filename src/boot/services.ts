import { boot } from 'quasar/wrappers';
import { createProductsService } from 'src/lib/services/products/products-svc';


export default boot(({ app }) => {
  // Add products service
  app.use(createProductsService());
});
