// import { useState, useEffect, useMemo, useLocation } from 'react'
import Layout from './components/Layout'
import NavDrawer from './components/NavDrawer';
import DashHome from './components/dashboard/dashboard-subpaths/dash-home/DashHome';
import DashTasks from './components/dashboard/dashboard-subpaths/dash-tasks/DashTasks';
// import DashTeam from './components/dashboard/dashboard-subpaths/dash-team/DashTeam';
import DashMessages from './components/dashboard/dashboard-subpaths/dash-messages/DashMessages';
import DashSchedule from './components/dashboard/dashboard-subpaths/dash-schedule/DashSchedule';
import MemberHall from './components/member-hall/MemberHall'
import ProjectHub from './components/project-hub/ProjectHub'
// import TestDash from './components/dashboard/TestDash'
import Dashboard from './components/dashboard/Dashboard'
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import { UserProvider } from './userContext';
import { Provider } from 'react-redux';
// **
import { persistor, store } from './store/store'
import LoginLogoutSignup from './components/LoginLogoutSignup';
import RequireAuth from './features/auth/RequireAuth';
// import { PersistGate } from 'redux-persist/integration/react'


function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  // })

  // CHANGE THIS LATER FOR CURRENT LOGGED IN USERTYPE - ADD OTHER USER DATA(UN, SESSIONID, LOCALSTORAGE... OTHERS)
  // currently context for the primary NAV (and test DataPayload before final server/api integration)
  const userType = "dev-user";
  // const userType = "invalidated-user"

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <UserProvider value={userType}>
            <Routes>
                <Route element={<Layout />}>
                    {/* loggedIn ? Dashboard(*either Dev/Investor/Anon) : Home (*Generic/No-Account) */}
                    <Route element={<NavDrawer />}>
                        {/* TODO: change prop state val && is home dir ok for reqs */}
                        <Route path="login" element={<LoginLogoutSignup props={'login'} />} />
                        <Route path="signup" element={<LoginLogoutSignup props={'signup'} />} />
                        <Route element={<RequireAuth />}>
                          {/* <Route path='account' element={<Account />} /> */}
                        </Route>
                        <Route element={<RequireAuth />}>
                          <Route path="dashboard" element={<Dashboard />}>
                              <Route index element={<DashHome to="dashboard" replace/>} />
                              <Route path="dash-tasks" element={<DashTasks />} />
                              <Route path="dash-messages" element={<DashMessages />} />
                              <Route path="dash-schedule" element={<DashSchedule />} />
                          </Route>
                        </Route>
                        <Route index path="member-hall" element={<MemberHall />} />
                        <Route path="project-hub" element={<ProjectHub />}>
                        </Route>
                        {/* Catch all - replace with 404 component if you want */}
                        <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
          </UserProvider>
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
