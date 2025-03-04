import { defaultPage, notFoundPage, routes } from './routes.js';

export class Router {
  static pageContainer;
  static currentRoute;
  static routes = routes;

  static onPathChange = (route, props) => {
    if (route) {
      return route.component(props).then((component) => {
        this.pageContainer.append(component.node);

        return component;
      });
    }
  };

  static pathToRegex = (path) =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '([^/]+)') + '$');

  static getParams = (path, values) => {
    const keys = Array.from(path.matchAll(/:(\w+)/g)).map((result) => result[1]);

    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
  };

  static onPathChangeHandler = () => {
    const path = window.location.pathname;

    const route = this.routes.find((r) => this.pathToRegex(r.name).test(path));
    const props = Object.fromEntries(new URLSearchParams(location.search).entries());

    if (route) {
      const values = location.pathname.match(this.pathToRegex(route.name))?.slice(-1);
      if (values) {
        Object.assign(props, this.getParams(route.name, values));
      }
    }

    if (this.currentRoute) {
      this.currentRoute.then((component) => component.destroy());
    }

    this.currentRoute = this.onPathChange(route ?? (path ? notFoundPage : defaultPage), props);
  };

  static init(pageContainer) {
    this.pageContainer = pageContainer;
    window.addEventListener('popstate', this.onPathChangeHandler);
    this.onPathChangeHandler();
  }

  static destroy() {
    window.removeEventListener('popstate', this.onPathChangeHandler);
  }
}
