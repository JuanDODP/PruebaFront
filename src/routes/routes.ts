import type { ComponentType } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import { ConsumoPage, HomePage, LoginPage } from '../pages/iindex';

interface Routes {
  id: number;
  name: string;
  path: string;
  Component: ComponentType;
  isPrivate: boolean;
  icon?: SvgIconComponent;
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
        isPrivate: true,
        icon: DashboardOutlined
    },
    {
        id: 3,
        name: "Consumo",
        path: "/consumo",
        Component: ConsumoPage,
        isPrivate: true,
        icon: InsightsOutlined
    }
];

// Rutas que aparecen en el menú del header
export const navRoutes = routes.filter(({ isPrivate }) => isPrivate);
