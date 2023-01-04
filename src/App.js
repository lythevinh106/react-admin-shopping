import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./component/Layout/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes/routes";

import { LinearProgress } from '@mui/material';
import { useSelector } from "react-redux";
import ProductProvider from "./context/ProductProvider";


function App() {


  const activeProgress = useSelector((state) => state.progress.active)
  const [isProgress, setIsProgress] = useState(activeProgress);


  useEffect(() => {
    setIsProgress(activeProgress);
  }, [activeProgress])


  // console.log(isProgress);

  return (

    <>

      {isProgress ? (
        <LinearProgress sx={{
          zIndex: 99999
        }} color="success" />

      ) : <></>}






      <Routes>



        {publicRoutes.map((route, index) => {

          let Layout = route.layout || DefaultLayout;
          let Provider = route.provider || Fragment

          if (route.layout === null) {
            Layout = Fragment;

          }


          let LayoutMode = Fragment;

          if (route.layoutMode) {
            LayoutMode = route.layoutMode;

          }



          return (




            <Route key={index} path={route.path}
              element={<LayoutMode>
                <Layout>
                  <Provider>
                    <route.element></route.element>
                  </Provider>
                </Layout>

              </LayoutMode>} />



          )

        })}


        {/* <Route path="users/*" element={<Users />} /> */}
      </Routes>
    </>
  );
}

export default App;