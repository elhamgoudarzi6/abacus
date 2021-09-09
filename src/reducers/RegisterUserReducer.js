import {MOBILE_CHANGED, PASSWORD_CHANGED, USER_REGISTER_ATTEMP, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS} from '../action/TypeRegisterUser';
const INITIAL_STATE={
    mobile:'',
    password:'',
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
        case USER_REGISTER_ATTEMP:
            return{...state,loading:true};
            break;
        case USER_REGISTER_SUCCESS:
            return{...state,success: true};
            break;
        case USER_REGISTER_FAIL:
            return{...state,loading:false,success: false,error:action.payload};
            break;
        default:
            return state;

    }
}
