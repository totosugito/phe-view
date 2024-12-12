import {Suspense} from 'react'
import './i18n';
import {useTranslation} from "react-i18next";
import './assets/styles.css'
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import OpenRoute from "./components/auth/OpenRoute.jsx";
import {LayoutOpen} from "src/components/app/index.js";
import {ProductionData, OilLosses, Page404, ActualOil, ActualGas, VesselTracking, Login} from "./pages/index.js";
import {AppNavigation, AppRoutes} from "src/routers/router.js";
import {WebLoading} from "src/components/base/index.js";
import {DEMO_USER} from "src/constants/config.js";

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
                    <Route path="*" element={<Page404/>}/>

                    {(user === DEMO_USER.email) &&
                        <Route element={
                            <OpenRoute>
                                <LayoutOpen navigation={AppNavigation}/>
                            </OpenRoute>
                        }>
                            <Route path={"/"} element={<ActualOil/>}/>
                            <Route path={AppRoutes.productionData.to} element={<ProductionData/>}/>
                            <Route path={AppRoutes.oilLosses.to} element={<OilLosses/>}/>
                            <Route path={AppRoutes.actualOil.to} element={<ActualOil/>}/>
                            <Route path={AppRoutes.actualGas.to} element={<ActualGas/>}/>
                            <Route path={AppRoutes.vesselTracking.to} element={<VesselTracking/>}/>
                        </Route>
                    }

                    <Route path={"/"} element={<Login/>}/>
                    <Route path={AppRoutes.userLogin.to} element={<Login/>}/>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App
