# route.concat
Concat multiple @angular/router RouterConfigs so you can keep component route definitions inside component folders

## Example

1. Create some example component with a route
  ```
  // ./app/user/user.routes.ts
  import {ConcatRoute} from "../route/index";
  import {RouterConfig} from '@angular/router';
  import {UserHomeComponent} from './index';
  
  const config:RouterConfig = [
    {path: 'user-home', component: UserHomeComponent}
  ];
  
  // user routes will be resolved first
  export const routes:ConcatRoute = {
    order: 1,
    routerConfig: config
  };
  ```
2. Include routes from multiple components by typing their names
  ```
  // ./app/app.routes.js
  import {provideRouter} from '@angular/router';
  import {concatRoutes} from './route/index';
  import {routes as userRoutes} from './user/user.routes';
  import {routes as pageRoutes} from './page/page.routes';
  
  //the magic takes place here (create single RouteConfig from 2 other ones)
  export const appRouterProviders = [
    provideRouter(concatRoutes([userRoutes, pageRoutes]))
  ];
  ```
3. Bootstrap your app with your router providers (just like you would do after reading @angular/router tutorial)
  ```
  // ./main.js
  import {appRouterProviders} from './app/app.routes';
  
  bootstrap(AppComponent, [
    appRouterProviders
  ])
    .catch(err => console.error(err));
  ```
