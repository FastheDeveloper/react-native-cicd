export enum CoreRoutes {
  SIGNUP = 'SIGNUP',
  ONBOARD = 'ONBOARD',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  GOOGLE = 'GOOGLE',
}

export enum MainRoutes {
  DASHBOARD = 'DASHBOARD',
  BOOKMARKS = 'BOOKMARKS',
  PROFILENAVIGATOR = 'PROFILENAVIGATOR',
}

export enum ProfileRoutes {
  PROFILE = 'PROFILE',
}

export type AllRoutes = CoreRoutes | MainRoutes | ProfileRoutes;
