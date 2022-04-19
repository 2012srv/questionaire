import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './containers/Layout/Layout';
import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//         // palette values for light mode
//         primary: amber,
//         divider: amber[200],
//         text: {
//           primary: grey[900],
//           secondary: grey[800],
//         },
//       }
//       : {
//         // palette values for dark mode
//         primary: deepOrange,
//         divider: deepOrange[700],
//         background: {
//           default: deepOrange[900],
//           paper: deepOrange[900],
//         },
//         text: {
//           primary: '#fff',
//           secondary: grey[500],
//         },
//       }),
//   },
// });

export default function App() {
  const [mode, setMode] = React.useState(localStorage.getItem('theme') || 'light');
  const [checked, setChecked] = React.useState(localStorage.getItem('theme') && localStorage.getItem('theme') !== 'light' ? false : true);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  console.log('app');

  const appTheme = React.useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    colorMode.toggleColorMode();
  };

  let routes = (
    <div className='wrapper d-flex flex-column justify-content-center align-items-center'>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/login" />} /> */}
      </Routes>
    </div>
  );

  if (true) {
    routes = (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={appTheme}>
          <Routes>
            <Route path="/dashboard" element={<Layout themeChecked={checked} changeTheme={handleChange} />}>
              {/* <Route path="login" element={<Link1 />} />
            <Route path="register" element={<Link2 />} /> */}
            </Route>
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <>
      {routes}
    </>
  );
}
