import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './homepage/HomePage';
import Display from './display';

const RouteHandler = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/display' component={Display}/>
        </Switch>
    </main>
)

export default RouteHandler;