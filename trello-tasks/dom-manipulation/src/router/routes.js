import { RouteName } from '@lib/enums/name-route.enum.js';

export const defaultPage = {
  name: RouteName.Home,
  component: async (props) => {
    const { HomePage } = await import('@/pages/home/home-page.js');

    return new HomePage(props);
  },
};

export const notFoundPage = {
  name: RouteName.NotFound,
  component: async (props) => {
    const { NotFound } = await import('@/pages/not-found/not-found-page.js');

    return new NotFound(props);
  },
};

export const routes = [
  defaultPage,
  {
    name: RouteName.Gallery,
    component: async (props) => {
      const { GalleryPage } = await import('@/pages/gallery/gallery-page.js');

      return new GalleryPage(props);
    },
  },
];
