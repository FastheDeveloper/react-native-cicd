import {NewsArticle} from '@lib/types/apiTypes';
import {CoreRoutes, MainRoutes, ProfileRoutes} from './routes';

export type CoreRoutesParams = {
  [CoreRoutes.SIGNUP]: undefined;
  [CoreRoutes.HOME]: undefined;
  [CoreRoutes.ONBOARD]: undefined;
  [CoreRoutes.LOGIN]: undefined;
  [CoreRoutes.GOOGLE]: undefined;
  [CoreRoutes.DETAILED]: {item?: NewsArticle; selectedTitle: string};
};

export type MainRoutesParams = {
  [MainRoutes.DASHBOARD]: undefined;
  [MainRoutes.BOOKMARKS]: undefined;
  [MainRoutes.PROFILENAVIGATOR]: undefined;
};

export type ProfileRoutesParams = {
  [ProfileRoutes.PROFILE]: undefined;
};

export type AllRoutesParams = CoreRoutesParams;
