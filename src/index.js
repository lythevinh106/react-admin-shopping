import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './component/GlobalStyles/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { customTheme } from './component/CreateTheme';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { store } from './app/store'
import { Provider } from 'react-redux'
import ProductProvider from './context/ProductProvider';
import CategoryProvider from './context/CategoryProvider';





const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
  <GlobalStyles>
    <BrowserRouter>
      <Provider store={store}>



        <SnackbarProvider maxSnack={3}>
          <CategoryProvider>
            <ProductProvider>



              <ThemeProvider theme={customTheme}>
                <CssBaseline />


                <App />


              </ThemeProvider>

            </ProductProvider >
          </CategoryProvider>
        </SnackbarProvider>



      </Provider>
    </BrowserRouter>
  </GlobalStyles >
  // </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
