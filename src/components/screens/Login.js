import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert, StatusBar, ActivityIndicator, Dimensions,
} from 'react-native';
import DialogInput from 'react-native-dialog-input-custom';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";

import AwesomeAlert from 'react-native-awesome-alerts';
import Toast from 'react-native-root-toast';
import {
    mobileChanged,
    passwordChanged,
    loginUser,failMessageChanged

} from "../../action/LoginUser";

class TestLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            showAlert: false,
            showToast: false,
            visible: true,
            messageError:'',
            dialogVisible: false
        }
    }

     convert($string) {
        let persian=['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        // let num = String.range(0, 9);
       let x=$string.replace(persian)
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };
    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    onMobileChange(text) {
        this.props.mobileChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }

    onLoginUser() {
            const {mobile, password} = this.props;
            const {navigation}= this.props;
            if((mobile.length<1) || (password.length<1 )){
                Alert.alert(
                    "",
                   "اطلاعات رو به طور کامل وارد نمائید");
            }
            else
                if(mobile.length<11){
                    this.setState({messageError:'شماره همراه را بطور کامل وارد نمائید'})
                    this.showAlert();
                }
                else
                if(password.length<5){
                    Alert.alert(
                        "",
                        "حداقل طول رمز عبور 6 کاراکتر است");
                }
            else {
          this.props.loginUser({mobile, password, navigation});
                if(this.props.success===false && this.props.error.length>1) {
                    let x=this.props.error;
                    this.showAlert();
                    // setTimeout(() => this.setState({
                    //     visible: false
                    // }), 5000);
                }
            }
    }
renderLogin(){
        if(this.props.loading){
            return(<ActivityIndicator/>);
        }
        return ( <TouchableOpacity activeOpacity={0.8} style={[styles.buttonContainer, styles.loginButton]}
                                   onPress={this.onLoginUser.bind(this)}>
            <Text style={styles.loginText}>ورود</Text>
        </TouchableOpacity> )
}
    render() { const {showAlert} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />

                <LinearGradient
                    style={styles.header}
                    start={{x: -0.3, y: 0.0}} end={{x: 0.5, y: 1.0}}
                    locations={[0.1, 0.6, 0.9]}
                    colors={['#3e843d', '#3ede30', '#47b03e']}>
                    <View style={styles.headerContent}>
                        <Image style={{width: 90, height: 90}}
                               source={require('../../../assets/images/icons/abacus.png')}/>
                        <Text style={{
                            fontSize: 30,
                            color: '#fff',
                            fontFamily: 'Far_Aref'}}>
                            چرتکه
                        </Text>
                        <Text
                            style={{fontSize:16,fontFamily: 'Vazir-Black', color: '#fff', marginTop: 15}}>
                            ورود به اپ مالی حسابداری شخصی چرتکه
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                        <Text style={{textAlign:'center',fontFamily: 'IRANSansMobile(FaNum)',color:'#fff'}}>{this.props.error}</Text>

                        <View style={styles.inputContainer}>
                            <Icon style={styles.inputIcon} name='user' color='#43c164' size={25}/>
                            <TextInput style={styles.inputs}
                                       placeholder="شماره همراه"
                                       keyboardType='numeric'
                                       maxLength={11}
                                       value={this.props.mobile}
                                       underlineColorAndroid='transparent'
                                       onChangeText={this.onMobileChange.bind(this)}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon style={styles.inputIcon} name='lock' color='#43c164' size={25}/>
                            <TextInput style={styles.inputs}
                                       placeholder="رمز عبور"
                                       keyboardType='numeric'
                                       secureTextEntry={true}
                                       value={this.props.password}
                                       underlineColorAndroid='transparent'
                                       onChangeText={this.onPasswordChange.bind(this)} />
                        </View>

                        <TouchableOpacity activeOpacity={0.8} style={styles.btnForgotPassword}
                                          onPress={this.showDialog}>
                            <Text style={styles.btnText}
                                  onPress={() => this.props.navigation.navigate('ResetPassword')}
                            >رمز عبور خود را فراموش کرده اید؟</Text>
                        </TouchableOpacity>
                        {this.renderLogin()}
                                           <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                                          onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.btnText}> ثبت نام نکرده اید؟</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    message={this.state.error}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    titleStyle={{fontSize:14,fontFamily:'IRANSansMobile(FaNum)'}}
                    messageStyle={{fontSize:15,fontFamily:'IRANSansMobile(FaNum)'}}
                    confirmText="بله"
                    confirmButtonColor="#3d933c"
                    confirmButtonStyle={{}}
                    confirmButtonTextStyle={{fontSize:17,fontFamily:'IRANSansMobile(FaNum)'}}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />
                <DialogInput
                    dialogIsVisible={this.state.dialogVisible}
                    closeDialogInput={() => { this.handleCancel(false) }}
                    submitInput={(inputText) => { this.sendInput(inputText) }}
                    underlineColor={'#47b03e'}
                    containerStyle={{ justifyContent: 'center', marginTop: 25,  }}
                    titleStyle={{ color: '#47b03e', textAlign: 'right' }}
                    title="بازنشانی رمز"
                    subTitleStyle={{ color: '#fff', textAlign: 'right', marginTop: 5 }}
                    subtitle=""
                    placeholderInput="رمز جدید خود را وارد کنید"
                    placeholderTextColor="#777"
                    textInputStyle={{ marginTop: -20 ,textAlign:'right'}}
                    inputStyle={{color:'#47b03e'}}
                    secureTextEntry={true}
                    buttonsStyle={{ borderColor: '#fff' }}
                    textCancelStyle={{ color: '#47b03e', fontSize: 16 }}
                    submitTextStyle={{ color: '#47b03e', fontSize: 16 }}
                    cancelButtonText="خروج"
                    submitButtonText="تایید"
                />
            </View>
        );
    }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3d933c',
        width: '100%',
        height: '100%'
    },
    headerContent: {
        marginTop: 70,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs: {
        fontSize: 16,
        height: 45,
        marginRight: 25,
        borderBottomColor: '#FFFFFF',
        fontFamily: 'Vazir-Black',
        flex: 1,
    },
    inputIcon: {
        marginLeft: 20
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 10,
        marginRight: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: "#fff",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    loginText: {
        color: 'green',
        fontFamily: 'Vazir-Black',
        fontSize: 18,
    },
    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontFamily: 'Vazir-Black',
        fontSize: 16,
        marginRight: 2
    }
});
const mapStateToProps = state => {
    return {
        mobile: state.loginUser.mobile,
        password: state.loginUser.password,
        loading: state.loginUser.loading,
        success:state.loginUser.success,
        error: state.loginUser.error
    }
}
export default connect(mapStateToProps, {

    mobileChanged,
    passwordChanged,
    loginUser
})(TestLogin);
