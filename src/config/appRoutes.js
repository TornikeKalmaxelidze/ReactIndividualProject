import routes from "../constants/routes";
import GuestGuard from "../Guard/GuestGuard";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

const appRoutes = [
    { path: routes.Home, Component: Home },
    { path: routes.Products, Component: Products, Guard: GuestGuard },
    { path: routes.SignUp, Component: SignUp},
    { path: routes.SignIn, Component: SignIn },
];

export default appRoutes;