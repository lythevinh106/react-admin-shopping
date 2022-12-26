import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./component/Layout/DefaultLayout/DefaultLayout";
import { publicRoutes } from "./routes/routes";

// react-bootstrap components


function App() {
  return (

    <Routes>



      {publicRoutes.map((route, index) => {

        let Layout = route.layout || DefaultLayout;
        if (route.layout === null) {
          Layout = Fragment;

        }


        let LayoutMode = Fragment;

        if (route.layoutMode) {
          LayoutMode = route.layoutMode;

        }



        return (




          <Route key={index} path={route.path}
            element={<LayoutMode><Layout><route.element></route.element></Layout></LayoutMode>} />



        )

      })}


      {/* <Route path="users/*" element={<Users />} /> */}
    </Routes>
  );
}

export default App;