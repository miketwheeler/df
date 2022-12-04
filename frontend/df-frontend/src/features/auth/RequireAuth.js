
import { useLocation, Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';


// this Routes the user should they have the token after logging in
// checks the token and then passthru, Navigate replace makes it so back button will not bring back here
const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    console.log(token)
    const location = useLocation();

    // could add more to check the token as well as ROLE for a user
    return (
        token
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;