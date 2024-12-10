import {Suspense} from 'react'
import './i18n';
import {useTranslation} from "react-i18next";
import './assets/styles.css'
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import OpenRoute from "./components/auth/OpenRoute.jsx";
import {LayoutOpen} from "src/components/app/index.js";
import {ProductionData, OilLosses, Page404, ActualOil} from "./pages/index.js";
import {AppNavigation, AppRoutes} from "src/routers/router.js";
import {WebLoading} from "src/components/base/index.js";

function App() {
  const {t} = useTranslation();
  const {user} = useSelector((state) => state.auth);

  return (
    <div data-theme={user?.theme || 'light'} className="w-screen h-screen flex flex-col">
      <Suspense fallback={
        <div className={"flex h-screen items-center justify-center"}>
          <WebLoading/>
        </div>
      }>

        <Routes>
          <Route path="*" name="Page 404" element={<Page404/>}/>
          <Route element={
            <OpenRoute>
              <LayoutOpen navigation={AppNavigation}/>
            </OpenRoute>
          }>
            {/*<Route path={"/"} element={<ProductionPlatform/>}/>*/}
            <Route path={"/"} element={<OilLosses/>}/>
            <Route path={AppRoutes.productionData.to} element={<ProductionData/>}/>
            <Route path={AppRoutes.oilLosses.to} element={<OilLosses/>}/>
            <Route path={AppRoutes.actualOil.to} element={<ActualOil/>}/>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App
