import {
    DATE_CHANGED,ACCOUNT_CHANGED,DETAIL_CHANGED,FILE_CHANGED,AMOUNT_CHANGED,CATEGORY_CHANGED,SUB_CATEGORY_CHANGED,TYPE_CHANGED
    ,USER_INCOME_ATTEMP,USER_INCOME_FAIL,USER_INCOME_SUCCESS
} from  '../action/TypeIncomeUser';
const INITIAL_STATE={
    date:'',
    amount:'',
    category:'',
    subCategory:'',
    type:'',
    account:'',
    file:'',
    loading:false,
    error:'',
    success:false
}
export default(state=INITIAL_STATE,action) =>{
    // console.log(action);
    switch (action.type) {
        case DATE_CHANGED:
            return{...state,date:action.payload };
            break;
        case CATEGORY_CHANGED:
            return{...state,category:action.payload };
            break;
        case SUB_CATEGORY_CHANGED:
            return{...state,subCategory:action.payload };
            break;
        case ACCOUNT_CHANGED:
            return{...state,account:action.payload };
            break;
        case DETAIL_CHANGED:
            return{...state,password:action.payload };
            break;
        case AMOUNT_CHANGED:
            return{...state,amount:action.payload };
            break;
        case TYPE_CHANGED:
            return{...state,type:action.payload };
            break;
        case FILE_CHANGED:
            return{...state,file:action.payload };
            break;
        case USER_INCOME_ATTEMP:
            return{...state,loading:true};
            break;
        case USER_INCOME_SUCCESS:
            return{...state,success: true};
            break;
        case USER_INCOME_FAIL:
            return{...state,loading:false,success: false,error:action.payload};
            break;
        default:
            return state;

    }
}
