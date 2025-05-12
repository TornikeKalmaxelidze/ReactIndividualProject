import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './config/appRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            {appRoutes.map((route) => {
                if (route.Guard) {
                    return (
                        <Route 
                            key={route.path} 
                            path={route.path} 
                            element={
                                <route.Guard>
                                    {<route.Component />}
                                </route.Guard>
                            }
                        />
                    );
                }
                
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        Component={route.Component}
                    />
                );  
            })}
        </Routes>
    );
};


export default AppRoutes;