import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,

    StatusBar,
    Text,
    Image,
    ScrollView, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Left, Input, Item, Label,Right } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import DialogInput from 'react-native-dialog-input-custom';
import {connect} from "react-redux";
import AwesomeAlert from "react-native-awesome-alerts";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUtensils} from '@fortawesome/free-solid-svg-icons';
// .................code................
class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertSuccess: false,
            textMessageBox: '',
            user_id: this.props.dataLogin['id'],
            mobile:this.props.dataLogin['mobile'],
            image: '',
            isVisableBoxImage: 'none',
            dialogVisiblemobile: false,
            dialogVisiblepasword: false,
            //..............Registeprofileuser...............

            name_user: '',
            age_user: '',
            gender_user: '',
            city_user: '',
            Detail_user: '',
            major_user: '',
            imagepath:'',
            //..............Registermobileuser...............
            change_mobile:'',
            //..............Registermobileuser...............
            change_password:'',
        };
        this.ShowProfileRecord()
    }
    showAlertSuccess = () => {
        this.setState({
            showAlertSuccess: true
        });
    };
    hideAlertSuccess = () => {
        this.setState({
            showAlertSuccess: false
        });
    };
    // ...........dialoge..............
    showDialogm = () => {
        this.setState({ dialogVisiblemobile: true });
    };

    handleCancelm = () => {
        this.setState({ dialogVisiblemobile: false });
    };
    sendInputm(inputText) {

        console.log("sendInput (DialogInput#1): " + inputText);
    }
    showDialogp = () => {
        this.setState({ dialogVisiblepasword: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisiblepasword: false });
    };
    sendInput(inputText) {

        console.log("sendInput (DialogInput#1): " + inputText);
    }
    //   .............UserUpdateRegistr................
    UserUpdateRegistr = () => {
        fetch('http://194.5.175.25:2000/api/v1/updateuser/'+this.state.user_id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name_user,
                age: this.state.age_user,
                gender: this.state.gender_user,
                city: this.state.city_user,
                major: this.state.major_user,
                image:this.state.imagepath
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.showAlertSuccess();
                this.setState({textMessageBox: '???????????? ???? ???????????? ?????????? ????'});
                this.ShowProfileRecord();
            }).catch((error) => {
            console.error(error);
        });

    }
    // ..................
    UserRegisterpassword = (newPassword) => {
        console.log(this.state.user_id)
        if(newPassword===''){
            this.setState({textMessageBox: '?????? ???????? ???? ???????? ????????????'})
            this.showAlertSuccess();

        } else

        if(newPassword.length<6){
            this.setState({textMessageBox: '?????????? ?????? ?????? ???????? 6 ?????????????? ????????'})
            this.showAlertSuccess();

        }
        else {
            fetch('http://194.5.175.25:2000/api/v1/changepassword/' + this.state.user_id, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: newPassword,
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success === true) {
                        this.setState({textMessageBox: '?????? ???? ???????????? ?????????? ??????'})
                        this.showAlertSuccess();
                    }
                }).catch((error) => {
                console.error(error);
            });
        }
    }
    // .........................
    UserRegistrmobile = (mobile) => {
        if(mobile===''){
            this.setState({textMessageBox: '?????????? ?????????? ???????? ???? ???????? ????????????'})
            this.showAlertSuccess();

        } else
        if(mobile.length<11 || mobile.length>11){
            this.setState({textMessageBox: '?????????? ?????????? ?????? ?????????? ???? ???? ?????????? ???????? ????????????'})
            this.showAlertSuccess();
        }
        else {
            fetch('http://194.5.175.25:2000/api/v1/updatemobile/' + this.state.user_id, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: mobile,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success === true) {
                        this.setState({textMessageBox: '?????????? ?????????? ???? ???????????? ?????????? ??????'});
                        this, this.setState({mobile: mobile});
                        this.showAlertSuccess();
                        this.ShowProfileRecord()
                    }
                    else if (responseJson.success === false){
                        this.setState({textMessageBox: '???? ?????? ?????????? ?????????? ???????? ?????? ?????? ?????? ??????'});
                        this.showAlertSuccess();

                    }
                }).catch((error) => {
                console.error(error);
            });


        }

    }
    //   ..............Show...................
    ShowProfileRecord () {
        fetch('http://194.5.175.25:2000/api/v1/showuser/'+this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({name_user: responseJson.data['name']});
                this.setState({gender_user: responseJson.data['gender']});
                this.setState({city_user: responseJson.data['city']});
                this.setState({major_user: responseJson.data['major']});
                this.setState({age_user: responseJson.data['age']});
                this.setState({Detail_user: responseJson.data['detail']});
                this.setState({imagepath: responseJson.data['image']});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // ..............imagepicker............................
    handleClick = () => {
        const options = {
            title: '???????????? ??????',
            takePhotoButtonTitle: '????????????',
            chooseFromLibraryButtonTitle: '??????????',
            cancelButtonTitle: '??????',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({ image: response.uri });
                RNFetchBlob.fetch('POST', 'http://194.5.175.25:2000/Api/v1/image', {
                    Authorization: "Bearer access-token",
                    otherHeader: "image",
                    'Content-Type': 'multipart/form-data',

                }, [
                    // element with property `filename` will be transformed into `file` in form data
                    {name: 'image', filename: response.fileName, data: response.data},
                ]).then((response) => response.json()).then((responseJson) => {
                        if(responseJson.success===true)
                            console.log(responseJson.data['path'])
                        this.setState({imagepath:responseJson.data['path']});
                    }
                ).done();
                if (this.state.image != null) {
                    this.setState({ isVisableBoxImag: 'flex' });
                } else {
                    console.log('image empty');
                }
            }
        });

    };
    render() {
        const { image } = this.state;


        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />
                <LinearGradient
                    style={styles.header}
                    start={{ x: 0.3, y: 0.0 }} end={{ x: 0.5, y: 1.0 }}
                    locations={[0.1, 0.6, 0.9]}
                    colors={['#3e843d', '#3ede30', '#47b03e']}>
                    <View style={styles.headerContent}>
                        <Text style={{ fontSize: 20, color: '#fff', marginBottom: 15, fontFamily: 'Vazir-Black' }}>
                            ?????????????? ????????????
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                        <TouchableOpacity style={styles.followButton} onPress={this.showDialogm}>
                            <Text style={styles.followButtonText}>?????????? ??????????</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.followButton} onPress={this.showDialogp}>
                            <Text style={styles.followButtonText}>?????????? ??????</Text>
                        </TouchableOpacity>

                    </View>

                </LinearGradient>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -30 }}>
                    {/* <Image style={styles.avatar} source={require('../../../assets/images/hh.png')} /> */}

                    <Image style={styles.avatar}  source={{ uri: image }} />

                    <View style={{
                        marginLeft: 120,
                    }}>
                        <TouchableOpacity onPress={this.handleClick.bind(this)}>
                            <Icon style={{ marginTop: 50, fontSize: 25, color: '#5f7c04' }} name='camera' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 40, flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Item >
                                <Left>
                                    <Button transparent>
                                        <Icon active name="mobile"  style={styles.icon} />
                                    </Button>
                                </Left>
                                <Input placeholder={this.state.mobile} style={styles.input} />
                                <Right style={{marginLeft:-60,marginRight:15}}>
                                    <Text style={{ color: '#777777', fontFamily: 'IRANSansMobile(FaNum)_Bold'}}>?????????? ??????????:</Text>
                                </Right>
                            </Item>
                            <Item fixedLabel>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="user" style={styles.icon} />
                                    </Button>
                                </Left>
                                <Input placeholder=' ?????? ?? ?????? ????????????????' value={this.state.name_user} style={styles.input}
                                       onChangeText={name=> this.setState({name_user:name})}
                                />
                                <Right style={{marginLeft:-70,marginRight:15}}>
                                    <Text style={{ color: '#777777', fontFamily: 'IRANSansMobile(FaNum)_Bold'}}>?????? ?? ?????? ???????????????? :</Text>
                                </Right>
                            </Item>
                            <Item fixedLabel>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="male" style={styles.icon} />
                                    </Button>
                                </Left>
                                <Input placeholder='???????? ???? ?????? ???? ???????? ????????????' style={styles.input}
                                       value={this.state.age_user} onChangeText={age=> this.setState({age_user:age})}/>
                                <Right style={{marginLeft:-70,marginRight:15}}>
                                    <Text style={{ color: '#777777', fontFamily: 'IRANSansMobile(FaNum)_Bold'}}>????:</Text>
                                </Right>
                            </Item>
                            <Item fixedLabel>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="transgender" style={styles.icon} />
                                    </Button>
                                </Left>
                                <Input placeholder=' ?????????? ' style={styles.input} value={this.state.gender_user}
                                       onChangeText={gender=> this.setState({gender_user:gender})}/>
                                <Right style={{marginLeft:-70,marginRight:15}}>
                                    <Text style={{ color: '#777777', fontFamily: 'IRANSansMobile(FaNum)_Bold'}}>??????????:</Text>
                                </Right>


                            </Item>
                            <Item fixedLabel>
                                <Left>

                                        <Icon Type='FontAwesome5' name="bank" style={styles.icon} />

                                </Left>
                                <Input placeholder='??????' style={styles.input} value={this.state.city_user}
                                       onChangeText={city=> this.setState({city_user:city})} />
                                <Right style={{marginLeft:-70,marginRight:15}}>
                                    <Text style={{ color: '#777777', fontFamily: 'IRANSansMobile(FaNum)_Bold'}}>??????:</Text>
                                </Right>
                            </Item>

                            <Item fixedLabel>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="file-text-o" style={styles.icon} />
                                    </Button>
                                </Left>
                                <Input placeholder='  ???????? ???????????? ' style={styles.input} value={this.state.major_user}
                                       onChangeText={major=> this.setState({major_user:major})}/>
                                <Right style={{marginLeft:-70,marginRight:15}}>
                                    <Text style={{ color: '#777777', fontFamily: 'IRANSansMobile(FaNum)_Bold'}}>???????? ????????????:</Text>
                                </Right>
                            </Item>
                        </View>

                    </ScrollView>


                </View>
                <Button full success style={{backgroundColor:'#47b03e'}}  onPress={ this.UserUpdateRegistr}>
                    <Text style={{ color: '#fff',  fontFamily: 'Vazir-Black', fontSize: 16 }}>???????????? ??????????????</Text>
                </Button>

                <View style={styles.dialoge}>
                    <DialogInput
                        dialogIsVisible={this.state.dialogVisiblemobile}
                        closeDialogInput={() => { this.handleCancelm(false) }}
                        submitInput={(inputText) => { this.UserRegistrmobile(inputText) }}

                        containerStyle={{ justifyContent: 'center', marginTop: 25,borderColor: '#47b03e', borderWidth: 2   }}
                        titleStyle={{ color: '#47b03e', textAlign: 'right',fontFamily: 'IRANSansMobile(FaNum)' }}
                        title="?????????? ?????????? ???????? ???? ???????? ????????"
                        subTitleStyle={{ color: '#fff', textAlign: 'right', marginTop: 5,fontFamily: 'IRANSansMobile(FaNum)' }}

                        placeholderInput="?????????? ?????????? ???????? "
                        placeholderTextColor="#777777"
                        textInputStyle={{ marginTop: -20 ,textAlign:'right',}}
                        keyboardType='numeric'
                        buttonsStyle={{ borderColor: 'white' }}
                        textCancelStyle={{ color: '#47b03e', fontSize: 16 ,fontFamily: 'IRANSansMobile(FaNum)_Bold'}}
                        submitTextStyle={{ color: '#47b03e', fontSize: 16,fontFamily: 'IRANSansMobile(FaNum)_Bold' }}
                        cancelButtonText="????????????"
                        submitButtonText="?????? ?????????? ????????"

                    />
                </View>
                <View style={styles.dialoge}>
                    <DialogInput
                        dialogIsVisible={this.state.dialogVisiblepasword}
                        closeDialogInput={() => { this.handleCancel(false) }}
                        submitInput={(inputText) => { this.UserRegisterpassword(inputText) }}
                        // outerContainerStyle={{ backgroundColor: 'rgba(0,0,0, 0.75)' }}
                        containerStyle={{ justifyContent: 'center', marginTop: 25,  }}
                        titleStyle={{ color: '#47b03e', textAlign: 'center', }}
                        title="?????????? ??????"
                        subTitleStyle={{ color: '#fff', textAlign: 'right', marginTop: 5 }}
                        subtitle="?????????? ??????"
                        placeholderInput="?????? ???????? "
                        placeholderTextColor="#777777"
                        textInputStyle={{ marginTop: -20 ,textAlign:'right'}}
                        secureTextEntry={true}

                        buttonsStyle={{ borderColor: 'white' }}
                        textCancelStyle={{ color: '#47b03e', fontSize: 16 }}
                        submitTextStyle={{ color: '#47b03e', fontSize: 16 }}
                        cancelButtonText="????????????"
                        submitButtonText="??????"

                    />
                </View>
                <AwesomeAlert
                    show={this.state.showAlertSuccess}
                    showProgress={false}
                    // title="??????????????  ???? ???? ?????? ???????? ???????? ????????????"
                    message={this.state.textMessageBox}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    titleStyle={{fontSize: 14, fontFamily: 'IRANSansMobile(FaNum)'}}
                    messageStyle={{fontSize: 15, fontFamily: 'IRANSansMobile(FaNum)'}}
                    confirmText="??????"
                    confirmButtonColor="#3d933c"
                    confirmButtonStyle={{}}
                    confirmButtonTextStyle={{fontSize: 17, fontFamily: 'IRANSansMobile(FaNum)'}}
                    onConfirmPressed={() => {
                        this.hideAlertSuccess();
                    }}
                />

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,
    }
}
export default connect(mapStateToProps)(profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#3d933c',
    },
    headerContent: {
        padding: 40,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 1.5,
        borderColor: "#e2e2e2",
        alignSelf: 'center',
       position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: '#00C851', fontSize: 25, marginLeft: 10,
    },
    input: {
        color: '#777777', fontFamily: 'IRANSansMobile(FaNum)', fontSize: 14,textAlign:'center'
    },
    followButton: {
        marginTop:10,
        height:28,
        width:100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        backgroundColor:"#fff" ,
        marginBottom:10,

        marginHorizontal:10

    },
    followButtonText:{
        color: "#777777",
        fontSize:14,
    },
    dialoge: {

        justifyContent: 'center',
        alignItems: 'center',

    },

});
