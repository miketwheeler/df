// import logo from './logo.svg';
// import { useState, useEffect } from 'react'
import Layout from './components/Layout'
// import Home from './components/annonHomepage/Home'
import Dashboard from './components/dashboard/Dashboard';
import DashHome from './components/dashboard/dashboard-subpaths/DashHome';
import DashTasks from './components/dashboard/dashboard-subpaths/DashTasks';
import DashTeam from './components/dashboard/dashboard-subpaths/DashTeam';
import DashMessages from './components/dashboard/dashboard-subpaths/DashMessages';
import DashSchedule from './components/dashboard/dashboard-subpaths/DashSchedule';
import Teams from './components/teams/Teams'
import Projects from './components/projects/Projects'
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'


function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  // })

  return (
    <ThemeProvider theme={theme}>
      <Routes>
          <Route path="" element={<Layout />}>
              {/* loggedIn ? Dashboard(*either Dev or Investor) : Home (*Generic/Annonymous/No-Account) */}
              
              <Route path="/" element={<Dashboard />} >
                {/* <Route path="dash-home" element={<DashHome />} /> */}
                  {/* <Route path="dash-tasks" element={<DashTasks />} />
                  <Route path="dash-team" element={<DashTeam />} />
                  <Route path="dash-messages" element={<DashMessages />} />
                  <Route path="dash-schedule" element={<DashSchedule />} /> */}
              </Route>
              <Route path="/teams" element={<Teams />} />
              <Route path="/projects" element={<Projects />} />
              {/* Catch all - replace with 404 component if you want */}
              <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
