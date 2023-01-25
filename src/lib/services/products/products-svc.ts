import { inject, InjectionKey, Plugin } from "vue";
import { Product } from "./models";
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'

const injectionKey : InjectionKey<ProductsService> = Symbol('products:svc');

const ITEMS : Product[] = [
  { id: 'product-001', name: '', summary: '', img: '' }
]

class ProductsService {
  query$() {
    const ajax$ = of(ITEMS).pipe(
      // Fake the request as if it would take some time
      delay(3000)
    )
    return ajax$;
  }
}

export function createProductsService() {
  const plugin : Plugin = {
    install: (app)=> {
      const svc = new ProductsService();
      app.provide( injectionKey, svc)
    }
  }
  return plugin;
}

export function useProducts() {
  const svc = inject(injectionKey);
  if (!svc) throw new Error('Product service not provided.');
  return svc!;
}
