import {Suspense} from 'react'
import 'src/i18n';
import {useTranslation} from "react-i18next";
import 'src/assets/styles.scss'
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {LayoutOpen} from "src/components/app/index.js";
import {
    ProductionData,
    OilLosses,
    Page404,
    ActualOil,
    ActualGas,
    VesselTracking,
    Login,
    PotentialOil,
    PotentialGas
} from "src/pages/index.js";
import {WebLoading} from "shared/components/base";
import {DEMO_USER} from "src/constants/config.js";
import {AppNavigation} from "src/routers/userNav.js";
import {AppRoutes} from "src/routers/router.js";
import ProtectedRoute from "./shared/components/auth/ProtectedRoute.jsx";

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
                            <ProtectedRoute>
                                <LayoutOpen navigation={AppNavigation}/>
                            </ProtectedRoute>
                        }>
                            <Route path={AppRoutes.root.href} element={<ActualOil/>}/>
                            <Route path={AppRoutes.productionData.href} element={<ProductionData/>}/>
                            <Route path={AppRoutes.oilLosses.href} element={<OilLosses/>}/>
                            <Route path={AppRoutes.actualOil.href} element={<ActualOil/>}/>
                            <Route path={AppRoutes.actualGas.href} element={<ActualGas/>}/>
                            <Route path={AppRoutes.vesselTracking.href} element={<VesselTracking/>}/>
                            <Route path={AppRoutes.potentialOil.href} element={<PotentialOil/>}/>
                            <Route path={AppRoutes.potentialGas.href} element={<PotentialGas/>}/>
                        </Route>
                    }

                    <Route path={AppRoutes.root.href} element={<Login/>}/>
                    <Route path={AppRoutes.userLogin.to} element={<Login/>}/>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App
