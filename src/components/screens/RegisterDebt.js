import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Picker,
    StatusBar,
    Text,
    Image,
    ScrollView, Alert,Modal
} from 'react-native';
// import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import Select2 from 'react-native-select-two';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import Header from '../layouts/Header';
import LinearGradient from 'react-native-linear-gradient';
import {Card, List, Content, ListItem, Left, Body,Button, Right, Title, CardItem} from 'native-base';
// import Modaldate from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from "react-redux";
import AwesomeAlert from "react-native-awesome-alerts";
import { color } from 'react-native-reanimated';
//.........const............
const renderImage = (image) => {
    console.log(image);
    return [
        <>
            <Card style={{width: '70%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>

                <CardItem bordered>
                    <Left>

                    </Left>
                    <Body style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{
                            borderRadius: 10,
                            width: '200%',
                            height: 160,

                        }} source={{uri: image}}/>
                    </Body>

                    <Right>

                    </Right>
                </CardItem>
            </Card>

        </>,
    ];
};

class RegisterDebt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlertSuccess: false,
            textMessageBox:'',
            user_id: this.props.dataLogin['id'],
            DateHolder: null,
            PickerValueHolder: '',
            show: true,
            isVisableBoxImage: 'none',
            modalDateCost: false,
            modalDateCostE: false,
            modalacount: false,
            //..............RegisterDebt...............
            // DateText: '',
            DateStartTextDebt: '',
            DateEndTextDebt: '',
            amount_Debt: '',
            Lender_Account_Debt: '',
            Detail_Debt: '',
            Acount_Debt: '',

            // ............lenderaccont..........................
            lender_name_Debt: '',
            acount_num_Debt: '',
            card_num_Debt: '',
            // ............accont..........................
            acount_name_Debt: '',
            acount_num_Debt: '',
            card_num_Debt: '',
            // ........uplode......
            imagepath: '',
            image: '',
            // .......
            lender_acount: [],
            acount: [],
        };
        this.ShowLenderAcountRecord();
        this.ShowAcountRecord();
    }

    // .............................
    clickEventDateCost = () => {

        this.setModalDateCost(true);
    }
    setModalDateCost(visible) {
        this.setState({ modalDateCost: visible });
    }
    //   ....
    clickEventDateCostE = () => {

        this.setModalDateCostE(true);
    }
    setModalDateCostE(visible) {
        this.setState({ modalDateCostE: visible });
    }
    //.............
    clickEventacount = () => {

        this.setModalacount(true);
    }
    setModalacount(visible) {
        this.setState({ modalacount: visible });
    }
    //..........modal..................
    renderAsset(image) {
        return renderImage(image);
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

    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({show: false});
        } else {
            this.setState({show: true});
        }
    };
    // ......................modaldatepiker.....................



    // // ..................datepicker..................

    DatePickerMainFunctionCall = () => {
        let DateHolder = this.state.DateHolder;

        if (!DateHolder || DateHolder == null) {

            DateHolder = new Date();
            this.setState({
                DateHolder: DateHolder,
            });
        }
        //To open the dialog
        this.refs.DatePickerDialog.open({
            date: DateHolder,
        });
    };
    /**
     * Call back for dob date picked event
     *
     */
    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            DateStartTextDebt: moment(date).format('DD-MMM-YYYY'),
        });
    };
    onDatePickedFunction2 = (date) => {
        this.setState({
            dobDate: date,
            DateEndTextDebt: moment(date).format('DD-MMM-YYYY'),
        });
    };
    // ..............imagepicker............................
    handleClick = () => {
        const options = {
            title: 'انتخاب عکس',
            takePhotoButtonTitle: 'دوربین',
            chooseFromLibraryButtonTitle: 'گالری',
            cancelButtonTitle: 'لغو',
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
                this.setState({image: response.uri});
                RNFetchBlob.fetch('POST', 'http://194.5.175.25:2000/Api/v1/image', {
                    Authorization: "Bearer access-token",
                    otherHeader: "image",
                    'Content-Type': 'multipart/form-data',

                }, [
                    // element with property `filename` will be transformed into `file` in form data
                    {name: 'image', filename: response.fileName, data: response.data},
                ]).then((response) => response.json()).then((responseJson) => {
                        if (responseJson.success === true)
                            this.setState({imagepath: responseJson.data['path']});
                    }
                ).done();
                if (this.state.image != null) {

                    this.setState({isVisableBoxImag: 'flex'});
                } else {
                    console.log('image empty');
                }
            }
        });

    };

    // .............. RegisterC0st..............
    OnUserRegistrDebt = () => {
        if (this.state.DateStartTextDebt === '' || this.state.DateEndTextDebt === '' ||
            this.state.amount_Debt === '' || this.state.Lender_Account_Debt === '' ||
            this.state.Lender_Account_Debt === '' || this.state.Detail_Debt === '') {
            this.showAlertSuccess();
            this.setState({textMessageBox:'اطلاعات را به طور کامل وارد نمائید'});

            // alert('لطفا اطلاعات را کامل وارد نمائید');
        } else {
            fetch('http://194.5.175.25:2000/api/v1/debt', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:this.state.user_id,
                    date_debt: this.state.DateStartTextDebt,
                    date_giveback: this.state.DateEndTextDebt,
                    amount: this.state.amount_Debt,
                    lender: this.state.Lender_Account_Debt,
                    acount: this.state.Acount_Debt,
                    detail: this.state.Detail_Debt,
                    image: this.state.imagepath

                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({textMessageBox:'بدهی با موفقیت ثبت گردید'});
                    this.showAlertSuccess();
                    this.clearInputText();
                }).catch((error) => {
                console.error(error);
            });
        }
    }
    //   .............Registrlender................
    onUserRegistrlenderAcount = () => {
        if (this.state.lender_name_Debt === '' || this.state.acount_num_Debt === '' || this.state.card_num_Debt === '') {
            Alert.alert("اطلاعات را به طور کاامل وارد کنید");

        } else{
            fetch('http://194.5.175.25:2000/api/v1/lender', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    lender_name: this.state.lender_name_Debt,
                    acount_num: this.state.acount_num_Debt,
                    card_num: this.state.card_num_Debt,


                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({textMessageBox:'اطلاعات طرف حساب جدید با موفقیت ثبت شد'});
                    this.showAlertSuccess();
                    this.setModalacount(false);
                    this.ShowLenderAcountRecord();


                }).catch((error) => {
                console.error(error);
            });
        }
    }
    //   ..............ShowAcont...................
    ShowAcountRecord = () => {
        const acount= this.state.acount;
        for(var i=0;i< acount.length;i++){
            acount.splice(this.state.acount[i],acount.length);
        }

        fetch('http://194.5.175.25:2000/api/v1/acount/' + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                for (var i = 0; i < responseJson.data.length; i++) {
                    this.state.acount.push({
                        id: responseJson.data[i]['_id'],
                        name: responseJson.data[i]['acount_name']
                    })
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
    //   ..............ShowLenderAcont...................
    ShowLenderAcountRecord = () => {

        const lender_acount= this.state.lender_acount;
        for(var i=0;i< lender_acount.length;i++){
            lender_acount.splice(this.state.lender_acount[i],lender_acount.length);
        }
        fetch('http://194.5.175.25:2000/api/v1/lender/' + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                for (var i = 0; i < responseJson.data.length; i++) {
                    this.state.lender_acount.push({
                        id: responseJson.data[i]['_id'],
                        name: responseJson.data[i]['lender_name']
                    })
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
//Clear Input Texts
    clearInputText(){
        setTimeout(() => {
            this._textInput.setNativeProps({ text: '' });
            this._textInputDetail.setNativeProps({ text: '' });
            this.setState({DateStartTextDebt:''});
            this.setState({DateEndTextDebt:''});

        },3);
    }
    // ..................code............
    render() {
        const image = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />
                <Header title="ثبت بدهی" onBackPress={() => {
                    this.props.navigation.goBack();
                }}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                        style={{marginTop: 15, textAlign: 'center', fontSize: 15, fontFamily: 'IRANSansMobile'}}> برای
                        ثبت بدهی های خود فرم
                        زیر را پرکنید </Text>

                    {/* .....................datepicker....................................... */}


                    <View style={{flexDirection: 'row', marginTop: 20}}>

                        <TouchableOpacity activeOpacity={0.8} style={styles.SectionStyle}  onPress={() => this.clickEventDateCost()}>
                            <Icon name="calendar" size={20} color="#47b03e" style={{marginLeft: 8, marginTop: 10}}/>
                            <Text style={[styles.inputs, {
                                marginTop: -18
                            }]}> {this.state.DateStartTextDebt}</Text>
                        </TouchableOpacity>
                        <View style={{marginRight: 10, marginTop: 20, flex: 1}}>
                            <Text style={{
                                fontSize: 13,
                                flex: 1,
                                fontFamily: 'IRANSansMobile',
                                marginHorizontal: -3
                            }}> تاریخ دریافت</Text>
                            {/* <Image style={styles.imageIcon} source={require('../../../assets/images/icons/date.png')} /> */}
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <Modal
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => this.setModalDateCost(false)}
                            visible={this.state.modalDateCost}>
                            <View style={styles.popupOverlay}>
                                <View style={styles.popup}>
                                    <View style={styles.popupContent}>
                                        <ScrollView contentContainerStyle={styles.modalInfo}>


                                            <DatePicker isGregorian={false}
                                                        mode='datepicker'
                                                        options={{
                                                            defaultFont: 'Vazir-Black',
                                                            headerFont: 'Vazir-Black',
                                                        }}
                                                        onDateChange={date => {
                                                            this.setState({DateStartTextDebt: date});
                                                            this.setModalDateCost(false);
                                                        }

                                                        }

                                                        placeholder="تاریخ"
                                            />

                                        </ScrollView>
                                        <Button full style={{ backgroundColor: '#47b03e' }} onPress={() => { this.setModalDateCost(false) }}
                                        >
                                            <Text
                                                style={{ color: '#fff', fontSize: 16, fontFamily: 'IRANSansMobile(FaNum)' }}>انصراف</Text>
                                        </Button>

                                    </View>
                                </View>
                            </View>

                        </Modal>

                    </View>

                    {/* .....................datepicker....................................... */}


                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.SectionStyle} onPress={() => this.clickEventDateCostE()}>
                            <Icon name="calendar" size={20} color="#47b03e" style={{marginLeft: 8, marginTop: 10}}/>
                            <Text style={[styles.inputs, {
                                marginTop: -18
                            }]}> {this.state.DateEndTextDebt}</Text>
                        </TouchableOpacity>
                        <View style={{marginRight: 10, marginTop: 20, flex: 1}}>
                            <Text style={{
                                fontSize: 13,
                                flex: 1,
                                fontFamily: 'IRANSansMobile',
                                marginHorizontal: 3,
                                marginRight: 1
                            }}> تاریخ تسویه</Text>
                            {/* <Image style={styles.imageIcon} source={require('../../../assets/images/icons/date.png')} /> */}
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <Modal
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => this.setModalDateCostE(false)}
                            visible={this.state.modalDateCostE}>
                            <View style={styles.popupOverlay}>
                                <View style={styles.popup}>
                                    <View style={styles.popupContent}>
                                        <ScrollView contentContainerStyle={styles.modalInfo}>
                                            <DatePicker isGregorian={false}
                                                        mode='datepicker'
                                                        options={{

                                                            defaultFont: 'Vazir-Black',
                                                            headerFont: 'Vazir-Black',
                                                        }}
                                                        onDateChange={date => {
                                                            this.setState({DateEndTextDebt: date});
                                                            this.setModalDateCostE(false);
                                                        }

                                                        }

                                                        placeholder="Select date"
                                            />
                                        </ScrollView>
                                        <Button full style={{ backgroundColor: '#47b03e' }} onPress={() => { this.setModalDateCostE(false) }}
                                        >
                                            <Text
                                                style={{ color: '#fff', fontSize: 16, fontFamily: 'IRANSansMobile(FaNum)' }}>انصراف</Text>
                                        </Button>

                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                    {/* .........................price....................................... */}

                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputs}
                                placeholder="مبلغ"
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                ref={component => this._textInput = component}
                                onChangeText={amount => this.setState({amount_Debt: amount})}

                            />
                        </View>
                        <View style={{marginRight: 10, marginTop: 12, flex: 1}}>
                            <Text style={{fontSize: 14, flex: 1, fontFamily: 'IRANSansMobile',}}> مبلغ بدهی</Text>
                            {/* <Image style={styles.imageIcon} source={require('../../../assets/images/icons/639365.png')} /> */}
                        </View>
                    </View>
                    {/* .........................select2....................................... */}
                    <View style={{flexDirection: 'row'}}>

                        <View style={{flexDirection: 'row', flex: 2, marginTop: 15}}>
                            <TouchableOpacity onPress={() => this.clickEventacount()}>
                                <Icon name="plus-circle" size={25} color='#47b03e'
                                      style={{marginLeft: 9, marginTop: 3, flex: 2}}/>
                            </TouchableOpacity>
                            <Select2
                                style={{
                                    borderRadius: 5,
                                    // width: '138%',
                                    marginLeft: 1,
                                    borderColor: '#3d933c',
                                    borderWidth: 1.5,
                                }}
                                isSelectSingle={true}
                                colorTheme='#3d933c'
                                popupTitle="انتخاب  صاحب حساب"
                                cancelButtonText="انصراف"
                                selectButtonText="تایید"
                                title="انتخاب  صاحب حساب"
                                listEmptyTitle="اطلاعاتی موجود نیست"
                                searchPlaceHolderText="جستجو صاحب حساب"
                                data={this.state.lender_acount}
                                onSelect={lender => {
                                    for (var i = 0; i < this.state.lender_acount.length; i++) {
                                        if (this.state.lender_acount[i]['id'] == lender) {
                                            //   Alert.alert(this.state.acount[i]['name'])
                                            this.setState({Lender_Account_Debt: this.state.lender_acount[i]['name']});
                                        }
                                    }
                                }}
                            />
                        </View>
                        <View style={{marginTop: 15, flex: 1}}>
                            <Text style={{fontSize: 14, marginRight: 8, fontFamily: 'IRANSansMobile', flex: 2}}>طرف
                                حساب</Text>
                            {/* <Image style={[styles.imageIcon,{marginLeft:-40}]} source={require('../../../assets/images/icons/wallet.png')} /> */}
                        </View>
                    </View>

                    {/* .........................discraption.............................. */}

                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.SectionStyle, {height: 100}]}>
                            <TextInput
                                multiline={true}
                                placeholder="توضیحات"
                                numberOfLines={1}
                                ref={component => this._textInputDetail = component}
                                style={{
                                    margin: 4,
                                    marginTop: 2, fontFamily: 'IRANSansMobile(FaNum)',
                                    fontSize: 12, width: '98%', textAlign: 'center',
                                }}
                                underlineColorAndroid="transparent"
                                onChangeText={detail => this.setState({Detail_Debt: detail})}
                            />
                        </View>
                        <View style={{marginTop: 15, flex: 2}}>
                            <Text style={{fontSize: 13, flex: 1, fontFamily: 'IRANSansMobile', marginHorizontal: 15}}>شرح
                                بدهی</Text>
                            {/* <Image style={styles.imageIcon} source={require('../image/des.png')} /> */}
                        </View>
                    </View>
                    {/* .........................imagepicker.................................. */}
                    <View style={{marginTop: 8, marginHorizontal: 30}}>
                        <Card>
                            <CardItem bordered
                                      style={{backgroundColor: '#c5f3c1', borderStyle: 'dashed', borderWidth: 0.5}}>
                                <Left>


                                    <Body onPress>
                                        <Text style={{color: '#777'}} onPress={this.handleClick.bind(this)}>پیوست
                                            فایل</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>

                        <View>
                            {this.state.image ? this.renderAsset(this.state.image) : null}
                        </View>
                    </View>


                </ScrollView>
                <Button full style={{ backgroundColor: '#47b03e' }} onPress={this.OnUserRegistrDebt}>
                    <Text
                        style={{ color: '#fff', fontSize: 18, fontFamily: 'IRANSansMobile(FaNum)' }}>ثبت</Text>
                </Button>
                {/*....................نام حساب جدید ................................. */}
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.setModalacount(false)}
                    visible={this.state.modalacount}>

                    <LinearGradient
                        style={{ width: '100%' }}
                        start={{ x: 0.3, y: 0.0 }} end={{ x: 0.5, y: 1.0 }}
                        locations={[0.1, 0.6, 0.9]}
                        colors={['#3e843d', '#3ede30', '#47b03e']}>
                        <View style={{
                            paddingVertical: 7,
                            alignItems: 'center'
                            , justifyContent: 'space-around',
                            flexDirection: 'row'
                        }}>
                            <Text></Text>

                            <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>اضافه کردن
                                 طرف حساب جدید  </Text>
                            <Button transparent style={{ color: '#fff', marginRight: -20 }} onPress={() => this.setModalacount(false)}>
                                <Icon name='close' style={{ fontSize: 30, color: '#fff', marginRight: 20 }} />
                            </Button>
                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <View style={{marginTop:25}}>
                                    <Text style={{ fontSize: 13, color: '#555', marginBottom: 5, fontFamily: 'Vazir-Black',alignSelf:'center' }}> نام صاحب حساب،شماره حساب و شماره کارت راوارد نمایید</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 20}}>
                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="نام طرف حساب جدید را وارد نمایید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={lender_name => this.setState({lender_name_Debt: lender_name})}

                                        />
                                    </View>

                                </View>
                                <View style={{flexDirection: 'row', marginTop: 3}}>
                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder=" شماره حساب، طرف حساب را وارد نمایید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={acount_num => this.setState({acount_num_Debt: acount_num})}

                                        />
                                    </View>

                                </View>
                                <View style={{flexDirection: 'row', marginTop: 3}}>

                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="شماره کارت، طرف حساب را وارد نمایید "
                                            underlineColorAndroid="transparent"
                                            onChangeText={card_num => this.setState({card_num_Debt: card_num})}

                                        />
                                    </View>

                                </View>



                            </View>

                        </View>

                    </View>
                    <Button full style={{ backgroundColor: '#47b03e' ,marginHorizontal:20,borderRadius:10}} onPress={this.onUserRegistrlenderAcount}>
                        <Text
                            style={{ color: '#fff', fontSize: 18, fontFamily: 'IRANSansMobile(FaNum)' }}>ثبت</Text>
                    </Button>


                </Modal>
                {/*....................پیغام با موفیقت ثبت شد................................. */}
                <AwesomeAlert
                    show={this.state.showAlertSuccess}
                    showProgress={false}
                    // title="اطلاعات  را به طور کامل وارد نمائید"
                    message={this.state.textMessageBox}
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
export default connect(mapStateToProps)(RegisterDebt);
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',

    },
    SectionStyle: {

        borderRadius: 5, width: '67%', marginLeft: 30, borderWidth: 1.5,
        borderColor: '#3d933c', height: 45, marginTop: 15,

        fontFamily: 'IRANSansMobile(FaNum)'
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        //     marginVertical: 5,
        //     marginRight: 16,
        //     marginBottom: 12
        //
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 12,
    },


    imageIcon: {
        width: 30,
        height: 30,

        marginLeft: -15,
        marginTop: 10,

    },
    inputs: {
        textAlign: 'right',
        marginBottom: 7,
        height: 40,
        width: '95%',
        // borderWidth: 1,
        borderColor: '#DD2C00',
        borderRadius: 5,
        fontFamily: 'Vazir-Black',
        color:'#555'
    },

    popupButtons: {

        marginBottom: 10,
        flexDirection: 'row',
        flex: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        marginLeft: -30,

    },
    popup: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        borderColor: '#e2e2e2',
        justifyContent: 'center',
        borderBottomWidth: 2,


    },

    icon: {
        width: 22,
        height: 22,
        marginTop: 20,
        marginLeft: -10,
    },
    // modal: {
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderRadius: 10
    // },
    modal4: {
        height: 350,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modal3: {
        height: 250,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    card: {
        // // shadowColor: '#00000021',
        // // shadowOffset: {
        // //   width: 0,
        // //   height: 6,
        // },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        borderRadius: 5, width: '70%', marginLeft: 43,
        height: 100, marginTop: 15,
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardTitle: {
        color: '#00BFFF',
    },
    SectionStylemo: {

        borderRadius: 5, width: '85%', marginLeft: 28, borderWidth: 1.5,
        borderColor: '#3d933c', height: 45, marginTop: 15, backgroundColor: '#fff',


        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        //     marginVertical: 5,
        //     marginRight: 16,
        //     marginBottom: 12

        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 12,
    },
    /************ modals ************/
    popup: {
        backgroundColor: 'white',

    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,

    },
    popupContent: {
        //alignItems: 'center',
        height: '100%',
        width: '100%'
    },

    popupButtons: {
        backgroundColor: '#47b03e',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 80,
        width: 65,
        height: 65,
        alignSelf: 'center',

        alignItems: 'center',
        marginBottom: 10


    },
});
