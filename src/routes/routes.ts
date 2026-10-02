import type { ComponentType } from 'react';
import { HomePage, LoginPage } from '../pages/iindex';

interface Routes {
  id: number;
  name: string;
  path: string;
  Component: ComponentType;
  isPrivate: boolean;
}

export const routes: Routes[] = [
    {
        id: 1,
        name: "Login",
        path: "/login",
        Component: LoginPage,
        isPrivate: false
    },
    {
        id: 2,
        name: "Home",
        path: "/home",
        Component: HomePage,
        isPrivate: true
    }
];
