import {Suspense} from 'react'
import './i18n';
import {useTranslation} from "react-i18next";
import './assets/styles.css'
import {Route, Routes} from "react-router-dom";
import {Home, Page404} from "./pages/index.js";
import {WebLoading} from "./components/index.js";
import {useSelector} from "react-redux";
import {RouteHome} from "./routers/index.js";

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
          <Route path={"/"} name="Home" element={<Home/>}/>
          <Route path={RouteHome.path} name="Home" element={<Home/>}/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App
