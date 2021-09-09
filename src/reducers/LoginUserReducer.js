import {MOBILE_CHANGED, PASSWORD_CHANGED, USER_LOGIN_ATTEMP, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,USER_GET_DATA,USER_RESET_PASSWORD_SUCCESS} from '../action/TypeLoginUser';
const INITIAL_STATE={
    mobile:'',
    password:'',
    dataLogin:'',
    loading:false,
    error:'',
    success:false
}
export default(state=INITIAL_STATE,action) =>{
    // console.log(action);
    switch (action.type) {
        case MOBILE_CHANGED:
            return{...state,mobile:action.payload };
            break;
        case PASSWORD_CHANGED:
            return{...state,password:action.payload };
            break;
        case USER_GET_DATA:
            return{...state,dataLogin:action.payload };
            break;
        case USER_LOGIN_ATTEMP:
            return{...state,loading:true};
            break;
        case USER_LOGIN_SUCCESS:
            return{...state,success: true,dataLogin: action.payload};
            break;
        case USER_RESET_PASSWORD_SUCCESS:
            return{...state,success: true,dataLogin: action.payload};
            break;
        case USER_LOGIN_FAIL:
            return{...state,loading:false,success: false,error:action.payload};
            break;
        default:
            return state;

    }
}
