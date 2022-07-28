// import logo from './logo.svg';
// import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/homepage/Home'
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
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
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
