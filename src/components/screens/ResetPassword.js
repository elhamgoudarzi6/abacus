import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert, StatusBar, ActivityIndicator
} from 'react-native';
import DialogInput from 'react-native-dialog-input-custom';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import {connect} from "react-redux";
import {loginUser, mobileChanged, passwordChanged,resetPasswordUser} from "../../action/LoginUser";
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
        }
    }
    onMobileChange(text) {
        this.props.mobileChanged(text)
    }
    onResetPassword(){
        const {mobile} = this.props;
        const {navigation}= this.props;
        if(mobile.length<1){
            Alert.alert(
                "",
                "اطلاعات رو به طور کامل وارد نمائید");
        }else{
            this.props.resetPasswordUser({mobile,navigation});
        }


    }
    renderResetBottom(){
        if(this.props.loading){
            return(<ActivityIndicator/>);
        }
        return (<TouchableOpacity onPress={()=>this.onResetPassword()} activeOpacity={0.9} style={[styles.buttonContainer, styles.loginButton]}>
            <Text style={styles.loginText}>بازیابی رمز</Text>
        </TouchableOpacity>)
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
                               source={require('../../../assets/images/icons/857385.png')}/>
                        <Text
                            style={{fontSize: 20, fontFamily: 'IRANSansMobile(FaNum)', color: '#fff', marginBottom: 5}}>
                             بازیابی رمز ورود اپلیکیشن چرتکه
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
                        <Text style={{textAlign:'center',fontFamily: 'IRANSansMobile(FaNum)',color:'#fff'}}>{this.props.error}</Text>

                        <View style={styles.inputContainer}>
                            <Icon style={styles.inputIcon} name='mobile' color='#43c164' size={30}/>
                            <TextInput style={styles.inputs}
                                       placeholder="شماره همراه"
                                       keyboardType='numeric'
                                       maxLength={11}
                                       value={this.props.mobile}
                                       underlineColorAndroid='transparent'
                                       onChangeText={this.onMobileChange.bind(this)}/>
                        </View>
                        {this.renderResetBottom()}
                    </View>
                </LinearGradient>
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

        // borderBottomLeftRadius:900
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
        fontFamily: 'IRANSansMobile(FaNum)',
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
        color: '#555',
        fontFamily: 'IRANSansMobile(FaNum)',
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
        fontFamily: 'IRANSansMobile(FaNum)',
        fontSize: 17,
        marginRight: 20

    }
});
const mapStateToProps = state => {
    return {
        mobile: state.loginUser.mobile,
        password: state.loginUser.password,
    }
}

export default connect(mapStateToProps, {
    mobileChanged,
    passwordChanged,
    resetPasswordUser
})(ResetPassword);
