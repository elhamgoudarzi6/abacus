import {
   DATE_CHANGED,ACCOUNT_CHANGED,DETAIL_CHANGED,FILE_CHANGED,AMOUNT_CHANGED,CATEGORY_CHANGED,SUB_CATEGORY_CHANGED,TYPE_CHANGED
    ,USER_INCOME_ATTEMP,USER_INCOME_FAIL,USER_INCOME_SUCCESS
} from './TypeIncomeUser';

import React from 'react';
import {NavigationActions} from 'react-navigation';

export const dateChanged = (text) => {
    return {
        type: DATE_CHANGED,
        payload: text
    }
}

export const categoryChanged = (text) => {
    return {
        type: CATEGORY_CHANGED,
        payload: text
    }
}
export const subCategoryChanged = (text) => {
    return {
        type: SUB_CATEGORY_CHANGED,
        payload: text
    }
}
export const accountChanged = (text) => {
    return {
        type: ACCOUNT_CHANGED,
        payload: text
    }
}
export const detailChanged = (text) => {
    return {
        type: DETAIL_CHANGED,
        payload: text
    }
}
export const amountChanged = (text) => {
    return {
        type: AMOUNT_CHANGED,
        payload: text
    }
}
export const typeChanged = (text) => {
    return {
        type: TYPE_CHANGED,
        payload: text
    }
}
export const fileChanged = (text) => {
    return {
        type: FILE_CHANGED,
        payload: text
    }
}
export const registerIncome = ({userId,date, amount,category,subCategory,account,type,detail,navigation}) => {
    return (dispatch) => {

        dispatch({type: USER_INCOME_ATTEMP})
        fetch('http://194.5.175.25:2000/api/v1/Categoryandsub_income', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _user_id: userId,
                date: date,
                category: category,
                sub_category: subCategory,
                amount: amount,
                account: account,
                detail: detail,
                type: type,
            }),
        }).then((response) => response.json()).then((responseJson) => {

            if (responseJson.success === true) {

                registerIncomeSuccess(dispatch, navigation,responseJson.data);
            } else {

                registerIncomeFail(dispatch,responseJson.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

}
export const registerIncomeCategory = ({userId, category, subCategory}) => {
    return (dispatch) => {
        dispatch({type: USER_INCOME_ATTEMP})
        fetch('http://194.5.175.25:2000/api/v1/Categoryandsub_income', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _user_id: userId,
                category: category,
                sub_category: subCategory,

            }),
        }).then((response) => response.json()).then((responseJson) => {

            if (responseJson.success === true) {

                registerIncomeSuccess(dispatch,responseJson.data);
            } else {

                registerIncomeFail(dispatch,responseJson.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

}
const registerIncomeSuccess = (dispatch, navigation,data) => {

    dispatch({type: USER_INCOME_SUCCESS,payload:data});
    const NavigationAction = NavigationActions.navigate({routeName: 'DashboardUser', params: {},})
    navigation.dispatch(NavigationAction);

}
const registerIncomeFail = (dispatch,error) => {
    dispatch({type: USER_INCOME_FAIL,payload:error});
}

