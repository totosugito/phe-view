import {Provider} from 'react-redux'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import store from './stores'
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  }}>
    <Provider store={store}>
      <App/>
      <Toaster/>
    </Provider>
  </BrowserRouter>
)
