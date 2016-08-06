import {RouterConfig} from '@angular/router';

/**
 * Concat Route Interface
 * routeConfig:RouterConfig from @angular/router
 * weight:number - the desired route weight (1000 is more important than 1)
 */
export interface ConcatRoute {
  routerConfig:RouterConfig;
  order?:number;
}

/**
 * Concat routes
 * Take ConcatRoutes as arguments
 * @param routes
 * @param sortMode - "weight" or "order"
 * @returns {RouterConfig[]}
 */
export function concatRoutes<ConcatRoute>(routes:ConcatRoute[], sortMode:string = 'weight'):RouterConfig[] {

  // create new routerConfig[]
  var routerConfig:RouterConfig[] = [];

  // sort routes
  routes = routes.sort((a, b) => sortMode === 'order' ? a['order'] || 0 - b['order'] || 0 : b['order'] || 0 - a['order'] || 0);

  // fill routerConfig[]
  for (let route in routes) {
    routerConfig = <RouterConfig[]>routerConfig.concat(routes[route]['routerConfig']);
  }

  // return routerConfig[]
  return routerConfig;
}

