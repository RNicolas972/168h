import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import { LoadingComponent } from './LoadingComponent/LoadingComponent';
import { MovingComponent } from "./MovingComponent/MovingComponent";

export const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/">
                    <LoadingComponent />
                </Route>
            </Switch>
            <Switch>
                <Route path="/moving">
                    <MovingComponent />
                </Route>
            </Switch>
        </div>
    );
}
