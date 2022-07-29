import { Outlet } from 'react-router-dom';
// import Header from './Header';
// import Appbar from './Appbar'
// import NavDrawer from './NavDrawer';
// import TestNavDrawer from './TestNavDrawer'
import NavDrawer from './TestTwoNavDrawer'

const Layout = () => {
    return (
        <>
            {/* <Appbar /> */}
            {/* <NavDrawer /> */}
            {/* <TestNavDrawer /> */}
            <NavDrawer />
            {/* <Header /> */}
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout