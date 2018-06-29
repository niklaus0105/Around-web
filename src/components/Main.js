import React from 'react';
import { Switch, Route } from 'react-router'
import { Register } from './Register';
import { Login } from "./Login";
import { Home} from "./Home"


export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Home/> : <Login handleLogin={this.props.handleLogin}/>;
    }
    render() {
        return(
            <div className="main">
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" component={Home}/>
                    <Route component={Login}/>
                </Switch>
            </div>
        );
    }
}