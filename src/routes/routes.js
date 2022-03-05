import LayoutBasic from "../layouts/LayoutBasic";
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import User from "../pages/User";

const routes = [
  {
    path: "/",
    component: Home,
    layout: LayoutBasic,
    exact: true,
  },
  {
    path: "/:username",
    component: User,
    layout: LayoutBasic,
    exact: true,
  },
  {
    layout: LayoutBasic,
    component: Error404,
  },
];

export default routes;
