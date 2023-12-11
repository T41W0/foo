import { AdminRoutes } from "./admin/adminroutes";
import { AuthRoutes } from "./auth/authroutes";
import { GuestRoutes } from "./guest/guestroutes";



export const AllRoutes = <>
    {GuestRoutes}
    {AdminRoutes}
    {AuthRoutes}
</>