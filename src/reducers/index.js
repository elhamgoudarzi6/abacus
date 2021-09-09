import {combineReducers} from 'redux';
import LoginUserReducer from './LoginUserReducer';
import RegisterUserReducer from './RegisterUserReducer';
import IncomeUserReducer from './IncomeUserReducer';
export default combineReducers({
    loginUser:LoginUserReducer,
    registerUser:RegisterUserReducer,
    incomeUser:IncomeUserReducer

})
