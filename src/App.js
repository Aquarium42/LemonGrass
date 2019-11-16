import React, {Component} from 'react';
import Layout from "./hos/Layout/Layout";
import {Route, Switch} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import Players from './containers/Players/Players';
import TournamentList from "./containers/TournamentList/TournamentList";
import AuthResult from "./containers/Auth/AuthResult";


class App extends Component{
  render(){
    return (
        <Layout>
            <Switch>
               <Route path="/auth" component={Auth}/>
                <Route path="/auth/welcome" component={AuthResult}/>
                <Route path="/players" component={Players}/> //TODO
                <Route path="/quiz" component={Quiz}/>
                 <Route path="/tournaments" component={TournamentList}/>
                <Route path="/" component={Auth}/> //TODO
            </Switch>
        </Layout>
    )
  }
}

export default App;
