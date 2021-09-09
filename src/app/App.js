import React, {Component} from 'react';
import {I18nManager} from 'react-native';
I18nManager.allowRTL(false);
import RootStack from '../routs';
import {connect, Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import ReduxThunk from "redux-thunk";
class App extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
                <RootStack navi={this.props}/>
            </Provider>
        )
    }

}
export default App;