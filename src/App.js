import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Questionnaire from './containers/Questionnaire/Questionnaire';
import { deepPurple, grey, indigo, orange, pink } from '@mui/material/colors';
import Dashboard from './containers/Dashboard/Dashboard';

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

  // console.log('app');

  const appTheme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: indigo,
      secondary: orange,
      background: {
        // default: grey[100],
      }
    },
    typography: {
      fontSize: 12.5,
      h6: {
        fontSize: 12,
        fontWeight: 500
      },
      h5: {
        fontSize: 14,
        fontWeight: 500
      },
      h4: {
        fontSize: 16,
        fontWeight: 500
      },
      h3: {
        fontSize: 18,
        fontWeight: 500
      },
      h2: {
        fontSize: 20,
        fontWeight: 500
      },
      h1: {
        fontSize: 24,
        fontWeight: 500
      }
    },
    shape: {
      borderRadius: 5
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'text' },
            style: {
              fontSize: 18
            },
          },
        ],
        styleOverrides: {
          root: {
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // height: 40
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            boxShadow: 'none'
          }
        }
      },
      MuiCard: {
        defaultProps: {
          elevation: 1
        }
      }
    }
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
            <Route path="dashboard" element={<Layout themeChecked={checked} changeTheme={handleChange} />}>
              <Route path="questionnaire" element={<Questionnaire />} />
              <Route path="apps" element={<Dashboard />} />
              <Route path="" element={<Navigate replace to="questionnaire" />} />
            </Route>
            <Route path="*" element={<Navigate replace to="dashboard" />} />
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
