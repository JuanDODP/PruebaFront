import { HomePage, LoginPage } from '../pages/iindex';

interface Routes {
  id: number;
  name: string;
  path: string;
  //@ts-ignore
  Component: () => JSX.Element ;
}

export const routes: Routes[] = [
    {
        id: 1,
        name: "Home",
        path: "/",
        Component: HomePage
    },
    {
        id: 2,
        name: "Login",
        path: "/login",
        Component: LoginPage
    }
];