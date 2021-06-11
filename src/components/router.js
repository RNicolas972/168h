import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import { LoadingComponent } from './LoadingComponent/LoadingComponent';
import { MovingComponent } from "./MovingComponent/MovingComponent";
import { AnimationComponent } from "./AnimationComponent/AnimationComponent";

export const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <LoadingComponent />
                </Route>
                <Route path="/moving">
                    <MovingComponent />
                </Route>
                <Route path="/animation">
                    <AnimationComponent />
                </Route>
            </Switch>
        </div>
    );
}
