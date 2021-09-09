import {
    MOBILE_CHANGED,
    PASSWORD_CHANGED,
    USER_LOGIN_ATTEMP,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,USER_GET_DATA,USER_RESET_PASSWORD_SUCCESS
} from './TypeLoginUser';
import AwesomeAlert from 'react-native-awesome-alerts';
import React from 'react';
import {NavigationActions} from 'react-navigation';
import {Alert, View} from "react-native";
export const mobileChanged = (text) => {
    return {
        type: MOBILE_CHANGED,
        payload: text
    }
}
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}
export const userGetData = (text) => {
    return {
        type: USER_GET_DATA,
        payload: text
    }
}
export const loginUser = ({mobile, password, navigation}) => {
    return (dispatch) => {

        dispatch({type: USER_LOGIN_ATTEMP})
        fetch('http://194.5.175.25:2000/api/v1/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mobile,
                password: password,
            }),
        }).then((response) => response.json()).then((responseJson) => {

            if (responseJson.success === true) {
               userGetData('sddsd')
                loginSellerSuccess(dispatch, navigation,responseJson.data);
            } else {

                loginSellerFail(dispatch,responseJson.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

}
export const resetPasswordUser = ({mobile ,navigation}) => {
    return (dispatch) => {

        // dispatch({type: USER_LOGIN_ATTEMP})
        fetch('http://194.5.175.25:2000/api/v1/resetpassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mobile,

            }),
        }).then((response) => response.json()).then((responseJson) => {

            if (responseJson.success === true) {
                resetPasswordSuccess(dispatch, navigation);
            } else {

                Alert.alert('',responseJson.data,[{text:'بله'}]);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

}
const resetPasswordSuccess = (dispatch, navigation) => {

    const NavigationAction = NavigationActions.navigate({routeName: 'Login', params: {},})
    navigation.dispatch(NavigationAction);

}
const loginSellerSuccess = (dispatch, navigation,data) => {

    dispatch({type: USER_LOGIN_SUCCESS,payload:data});
    const NavigationAction = NavigationActions.navigate({routeName: 'DashboardUser', params: {},})
    navigation.dispatch(NavigationAction);

}
const loginSellerFail = (dispatch,error) => {
    dispatch({type: USER_LOGIN_FAIL,payload:error});

}
export const message=()=>{
    return(<View><AwesomeAlert
            show={true}
            showProgress={false}
            title="اطلاعات  را به طور کامل وارد نمائید"
            message="fgdfgdfgfd"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            titleStyle={{fontSize:14,fontFamily:'IRANSansMobile(FaNum)'}}
            messageStyle={{fontSize:15,fontFamily:'IRANSansMobile(FaNum)'}}
            confirmText="بله"
            confirmButtonColor="#3d933c"
            confirmButtonStyle={{}}
            confirmButtonTextStyle={{fontSize:17,fontFamily:'IRANSansMobile(FaNum)'}}/></View>
    )
}
