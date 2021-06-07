import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import { LoadingComponent } from './LoadingComponent/LoadingComponent';


export const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/">
                    <LoadingComponent />
                </Route>
            </Switch>
        </div>
    );
}
