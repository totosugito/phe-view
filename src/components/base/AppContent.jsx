import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {WebLoading} from "../views";

const AppContent = ({routes, defaultRouter}) => {
  return (
    <div className={"flex flex-col"}>
      <Suspense fallback={
        <div className='text-center'>
          <WebLoading/>
        </div>
      }>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.route.path}
                  exact={route.route.exact}
                  name={route.route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to={defaultRouter.path} replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
