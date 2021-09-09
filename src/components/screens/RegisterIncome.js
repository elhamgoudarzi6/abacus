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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNFetchBlob from 'rn-fetch-blob';
//  import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import Select2 from 'react-native-select-two';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
//import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Header from '../layouts/Header';
import LinearGradient from 'react-native-linear-gradient';
import {Card, List, Content, ListItem, Left, Body, Right, Title,Button, CardItem, Item, Input, Label, Tab} from 'native-base';
//  import Modaldate from 'react-native-modal';
import {faCoins} from '@fortawesome/free-solid-svg-icons/faCoins';
import {connect} from "react-redux";
import AwesomeAlert from "react-native-awesome-alerts";

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

class RegisterIncome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year:'',
            day:'',
            month:'',
            dateText:'',
            showAlertSuccess: false,
            textMessageBox: '',
            user_id: this.props.dataLogin['id'],
            TimeText: '',
            DateHolder: null,
            PickerValueHolder: '',
            image: '',
            isModalVisible: false,
            show: true,
            isVisableBoxImage: 'none',
            selectedItems: [],
            modalIncom: false,
            modalRcategory: false,
            modaltype: false,
            modalacount: false,
//..............Registerincome...............
            DateText: '',
            amount_income: '',
            Type_income: '',
            Account_income: '',
            Detail_income: '',
            Category_income: '',
            Sub_Category_income: '',
            // ............accont..........................
            acount_name_incom: '',
            acount_num_incom: '',
            card_num_incom: '',
            // .......type.......
            type_name_incom: '',
            // .....categoryandsubcategory..................
            category_name_incom: '',
            sub_category_incom: '',
// ...................uploadimage...............
            imagepath: '',
            //  ..........showRecords.............
            acount: [],
            type: [],
            categoryIncome: [],
        };
        this.ShowTypeRecord();
        this.ShowAcountRecord();
        this.getCategoryIncome();
    }


    renderAsset(image) {
        return renderImage(image);
    }

    ShowHideComponent = () => {
        if (this.state.show == true) {
            this.setState({show: false});
        } else {
            this.setState({show: true});
        }
    };
    // ......................modaldatepiker.....................
    toggleModal = () => {
        console.log(this.state.isModalVisible);
        this.setState({isModalVisible: !this.state.isModalVisible});
    };
    // ..................datepicker..................

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
            DateText: moment(date).format('DD-MMM-YYYY'),
        });

    };

// ........modal...........
    clickEventIncom = () => {

        this.setModalIncom(true);
    }
    setModalIncom(visible) {
        this.setState({ modalIncom: visible });
    }
//.............
    clickEventcategory = () => {

        this.setModalcategory(true);
    }
    setModalcategory(visible) {
        this.setState({ modalRcategory: visible });
    }
    clickEventtype = () => {

        this.setModaltype(true);
    }
    setModaltype(visible) {
        this.setState({ modaltype: visible });
    }
//.............
    clickEventacount = () => {

        this.setModalacount(true);
    }
    setModalacount(visible) {
        this.setState({ modalacount: visible });
    }
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
                            console.log(responseJson.data['path'])
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
    // .............. Registerincom..............
    UserRegistrincome = () => {

        if (this.state.year === '' || this.state.amount_income === '' || this.state.Type_income === '' ||
            this.state.Account_income === '' || this.state.Sub_Category_income === '' || this.state.Detail_income === '') {
            this.showAlertSuccess();
            this.setState({textMessageBox: 'اطلاعات را به طور کامل وارد نمائید'});
        } else {
            fetch('http://194.5.175.25:2000/api/v1/income', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    year: this.state.year,
                    month: this.state.month,
                    date:this.state.dateText,
                    day: this.state.day,
                    amount: this.state.amount_income,
                    type: this.state.Type_income,
                    acount: this.state.Account_income,
                    category:this.state.category_name_incom,
                    sub_category: this.state.Sub_Category_income,
                    detail: this.state.Detail_income,
                    image: this.state.imagepath
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.showAlertSuccess();
                    this.setState({textMessageBox: 'درآمد با موفقیت ثبت شد'});
                    this.clearInputText();
                    //this.props.navigation.navigate('DashboardUser');
                }).catch((error) => {
                console.error(error);
            });
        }
    }

    // ................getCategoryincome.........
    getCategoryIncome() {
        const categoryIncome= this.state.categoryIncome;
        for(var i=0;i< categoryIncome.length;i++){
            categoryIncome.splice(this.state.categoryIncome[i],categoryIncome.length);
        }
        let url = "http://194.5.175.25:2000/api/v1/categoryincome/" + this.state.user_id;
        fetch(url, {
            method: 'GET',
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.success === true) {
                for (var i = 0; i < responseJson.data.length; i++) {
                    if (responseJson.data[i]['SubCategoryIncome'].length > 0) {
                        let resultSubcategory = responseJson.data[i]['SubCategoryIncome'];
                        let childrenCategory = [];
                        for (var j = 0; j < responseJson.data[i]['SubCategoryIncome'].length; j++) {
                            childrenCategory.push({
                                name: resultSubcategory[j]['sub_category'],
                                id: resultSubcategory[j]['_id']
                            })
                        }
                        this.state.categoryIncome.push({
                            name: responseJson.data[i]['category_name'],
                            id: responseJson.data[i]['_id'],
                            children: childrenCategory
                        })
                    } else {
                        this.state.categoryIncome.push({
                            name: responseJson.data[i]['category_name'],
                            id: responseJson.data[i]['_id']
                        })
                    }
                }

            } else {
                console.log(responseJson.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    findParent = (itemId) => {
        const { categoryIncome } = this.state
        let match = false
        categoryIncome.forEach((item) => {
            item.children &&
            item.children.filter(({ id }) => {
                if (id === itemId) {
                    match = item.name
                }
            })
        })
        this.setState({category_name_incom:match})
        // alert(match)
    }
    onSelectedItemsChange = (selectedItems) => {
        this.setState({selectedItems});
        // alert(selectedItems)

    };

    onSelectedItemObjectsChange = (selectedItems) => {
        this.setState({Sub_Category_income: selectedItems[0]['name']})
        this.findParent(selectedItems[0]['id'])
        // alert(selectedItems[0]['id'])
        // console.log(selectedItems);

    }
    //   .............RegistrcategoryandSub_category................
    UserRegistrcategory = () => {
        if (this.state.category_name_incom === '' || this.state.sub_category_incom === '') {
            Alert.alert('اطلاعات را به طور کامل وارد نمائید')
        } else {
            fetch('http://194.5.175.25:2000/api/v1/categoryandsub_income', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:this.state.user_id,
                    category_name: this.state.category_name_incom,
                    sub_category: this.state.sub_category_incom,
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.showAlertSuccess();
                    this.setModalcategory(false);
                    this.setState({textMessageBox: 'دسته و زیر دسته با موفقیت ثبت شد'});
                    this.getCategoryIncome();

                }).catch((error) => {
                console.error(error);
            });
        }
    }
    //   .............RegistrType................
    UserRegistrType = () => {
        if (this.state.type_name_incom === '') {
            Alert.alert('اطلاعات را کامل وارد نمائید')
        } else {
            fetch('http://194.5.175.25:2000/api/v1/type', {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:this.state.user_id,
                    type_name: this.state.type_name_incom,
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.showAlertSuccess();
                    this.setModaltype(false);
                    this.setState({textMessageBox: 'دریافتی با موفقیت ثبت شد'});
                    this.ShowTypeRecord();
                }).catch((error) => {
                console.error(error);
            });
        }

    }
//   .............RegistrAccont................
    UserRegistrAccont = () => {
        if (this.state.acount_name_incom === '' || this.state.acount_num_incom === '' || this.state.card_num_incom === '') {
            Alert.alert('اطلاعات را کامل وارد نمائید')
        } else {
            fetch('http://194.5.175.25:2000/api/v1/acount', {


                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    acount_name: this.state.acount_name_incom,
                    acount_num: this.state.acount_num_incom,
                    card_num: this.state.card_num_incom,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setModalacount();
                    this.showAlertSuccess();
                    this.ShowAcountRecord();
                    this.setState({textMessageBox: 'حساب با موفقیت ثبت شد'});
                }).catch((error) => {
                console.error(error);
            });
        }
    }
    //   .............. ShowTypeRecord...................

    ShowTypeRecord = () => {
        const type= this.state.type;
        for(var i=0;i< type.length;i++){
            type.splice(this.state.type[i],type.length);
        }
        fetch('http://194.5.175.25:2000/api/v1/Type/' + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data);
                for (var i = 0; i < responseJson.data.length; i++) {
                    this.state.type.push({
                        id: responseJson.data[i]['_id'],
                        name: responseJson.data[i]['type_name']
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
    clearInputText(){
        setTimeout(() => {
            this._textInputDetail.setNativeProps({ text: '' });
            this._textInputAmount.setNativeProps({ text: '' });
            this.setState({DateText:''});

        },2);
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
               <Header title="ثبت درآمد" onBackPress={() => {
                    this.props.navigation.goBack();
                }}/>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                        style={{marginTop: 15, textAlign: 'center', fontSize: 15, fontFamily: 'IRANSansMobile'}}> برای
                        ثبت درآمد های روزانه خود فرم
                        زیر را پرکنید </Text>

                    {/* .....................datepicker....................................... */}


                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.SectionStyle}  onPress={() => this.clickEventIncom()}>
                            <Icon name="calendar" size={20} color="#47b03e" style={{marginLeft: 8, marginTop: 10}}/>
                            <Text style={[styles.inputs, {
                                marginTop: -18
                            }]}> {this.state.dateText}</Text>
                        </TouchableOpacity>
                        <View style={{marginRight: 20, marginTop: 12, flex: 2}}>
                            <Text style={{fontSize: 14, flex: 2, fontFamily: 'IRANSansMobile'}}> تاریخ </Text>
                            {/* <Image style={styles.imageIcon} source={require('../../../assets/images/icons/date.png')} /> */}
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <Modal
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => this.setModalIncom(false)}
                            visible={this.state.modalIncom}>
                            <View style={styles.popupOverlay}>
                                <View style={styles.popup}>
                                    <View style={styles.popupContent}>
                                        <ScrollView contentContainerStyle={styles.modalInfo}>
                                            <DatePicker isGregorian={false}
                                                        mode="date"
                                                        options={{
                                                            defaultFont:'Vazir-Black',
                                                            headerFont:'Vazir-Black',
                                                        }}
                                                        onDateChange={date => {
                                                            this.setState({dateText: date});
                                                            this.setState({year:date[0]+date[1]+date[2]+date[3]});
                                                            this.setState({month:date[5]+date[6]});
                                                            this.setState({day:date[8]+date[9]});
                                                            this.setModalIncom(false);
                                                        }

                                                        }

                                                        placeholder="Select date"
                                            />
                                        </ScrollView>
                                        <Button full style={{ backgroundColor: '#47b03e' }} onPress={() => { this.setModalIncom(false) }}
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
                            {/*<Icon name="coins" size={20} color="#47b03e" style={{marginLeft: 8, marginTop: 10}}/>*/}
                            <FontAwesomeIcon color={'#47b03e'} size={20} icon={faCoins}
                                             style={{marginLeft: 8, marginTop: 10}}/>

                            <TextInput
                                style={[styles.inputs, {marginTop: -25}]}
                                placeholder="مبلغ"
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                ref={component => this._textInputAmount = component}

                                onChangeText={amount => this.setState({amount_income: amount})}

                            />
                        </View>
                        <View style={{marginRight: 20, marginTop: 12, flex: 2}}>
                            <Text style={{fontSize: 14, flex: 2, fontFamily: 'IRANSansMobile'}}> مبلغ </Text>
                        </View>
                    </View>
                    {/*...........................category.....................*/}

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flexDirection: 'row', flex: 2.2, marginTop: 10}}>
                            <TouchableOpacity onPress={() => this.clickEventcategory()}>
                                <Icon name="plus-circle" size={25} color='#47b03e'
                                      style={{marginLeft: 7, marginTop: 7}}/>
                            </TouchableOpacity>
                            <View style={{
                                justifyContent: 'center',
                                borderRadius: 5,
                                height: 48,
                                width: '100%',
                                marginLeft: 16,
                                borderColor: '#3d933c',
                                borderWidth: 1.5,
                            }}>

                                <SectionedMultiSelect
                                    itemFontFamily={{fontWeight: 'bold',}}
                                    subItemFontFamily={{fontWeight: 'bold', color: '#555'}}
                                    items={this.state.categoryIncome}
                                    confirmText={{
                                        fontSize: 50,
                                        fontFamily: 'IRANSansMobile(FaNum)',
                                        backgroundColor: 'green',
                                    }}
                                    colors={{primary: '#47b03e'}}
                                    single={true}
                                    showChips={true}
                                    uniqueKey='id'
                                    subKey='children'
                                    selectText='دسته مورد نظر خود را انتخاب نمائيد'
                                    showDropDowns={true}
                                    readOnlyHeadings={true}
                                    confirmText="بستن"
                                    text="#2e2e2e"
                                    numberOfLines="3"
                                    success="green"
                                    searchPlaceholderText="جستجو"
                                    onSelectedItemsChange={this.onSelectedItemsChange}
                                    selectedItems={this.state.selectedItems}
                                    onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 15, fontSize: 16, flex: 1}}>
                            <Text style={{
                                fontSize: 14,
                                marginRight: 15,
                                fontFamily: 'IRANSansMobile',
                                flex: 2
                            }}> درآمد </Text>
                            {/* <Image style={[styles.imageIcon,{marginLeft:-40}]} source={require('../../../assets/images/icons/2503483.png')} /> */}
                        </View>

                    </View>
                    {/*.........................select2دریافت..............................  */}

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flexDirection: 'row', flex: 2.2, marginTop: 10}}>
                            <TouchableOpacity onPress={() => this.clickEventtype()}>
                                <Icon name="plus-circle" size={25} color='#47b03e'
                                      style={{marginLeft: 7, marginTop: 3}}/>
                            </TouchableOpacity>
                            <Select2

                                style={{
                                    borderRadius: 5,
                                    // width: '138%',
                                    marginLeft: 16,
                                    borderColor: '#3d933c',
                                    borderWidth: 1.5,
                                }}
                                isSelectSingle={true}
                                colorTheme='#3d933c'
                                popupTitle="انتخاب نوع دریافتی"
                                cancelButtonText="انصراف"
                                newButtonText="جدید"
                                selectButtonText="تایید"
                                title="نوع دریافتی"
                                searchPlaceHolderText="جستجو نوع دریافتی"
                                data={this.state.type}
                                onSelect={type => {
                                    for (var i = 0; i < this.state.type.length; i++) {
                                        if (this.state.type[i]['id'] == type) {
                                            //    Alert.alert(this.state.type[i]['name'])
                                            this.setState({Type_income: this.state.type[i]['name']});
                                        }
                                    }
                                }}
                            />
                        </View>
                        <View style={{marginTop: 15, fontSize: 16, flex: 1}}>
                            <Text style={{
                                fontSize: 14,
                                marginRight: 15,
                                fontFamily: 'IRANSansMobile',
                                flex: 2
                            }}> دریافت </Text>
                            {/* <Image style={[styles.imageIcon,{marginLeft:-40}]} source={require('../../../assets/images/icons/2503483.png')} /> */}
                        </View>

                    </View>
                    {/* .........................select2....................................... */}
                    <View style={{flexDirection: 'row'}}>

                        <View style={{flexDirection: 'row', flex: 2.2, marginTop: 15}}>
                            <TouchableOpacity onPress={() => this.clickEventacount()}>
                                <Icon name="plus-circle" size={25} color='#47b03e'
                                      style={{marginLeft: 9, marginTop: 3, flex: 2}}/>
                            </TouchableOpacity>
                            <Select2
                                style={{
                                    borderRadius: 5,
                                    // width: '138%',
                                    marginLeft: 16,
                                    borderColor: '#3d933c',
                                    borderWidth: 1.5,
                                }}
                                isSelectSingle={true}
                                colorTheme='#3d933c'
                                popupTitle="انتخاب حساب"
                                cancelButtonText="انصراف"
                                selectButtonText="تایید"
                                title="انتخاب حساب"
                                searchPlaceHolderText="جستجو حساب"
                                data={this.state.acount}
                                onSelect={account => {
                                    for (var i = 0; i < this.state.acount.length; i++) {
                                        if (this.state.acount[i]['id'] == account) {
                                            //   Alert.alert(this.state.acount[i]['name'])
                                            this.setState({Account_income: this.state.acount[i]['name']});
                                        }
                                    }
                                }}
                            />
                        </View>
                        <View style={{marginTop: 15, flex: 1}}>
                            <Text style={{
                                fontSize: 14,
                                marginRight: 15,
                                fontFamily: 'IRANSansMobile',
                                flex: 2
                            }}> حساب</Text>
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
                                    marginTop: 2,
                                    fontSize: 12, width: '98%', textAlign: 'center',
                                }}
                                underlineColorAndroid="transparent"
                                onChangeText={detail => this.setState({Detail_income: detail})}


                            />
                        </View>
                        <View style={{marginTop: 15, flex: 1}}>
                            <Text style={{
                                fontSize: 14, marginRight: 20, fontFamily: 'IRANSansMobile(FaNum)', flex: 2
                            }}>شرح</Text>
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
                <Button full style={{ backgroundColor: '#47b03e' }} onPress={this.UserRegistrincome}>
                    <Text
                        style={{ color: '#fff', fontSize: 18, fontFamily: 'IRANSansMobile(FaNum)' }}>ثبت</Text>
                </Button>

                {/*........................modal5......................*/}
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.setModalcategory(false)}
                    visible={this.state.modalRcategory}>

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

                            <Text style={{ fontSize: 16, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>اضافه
                                کردن دسته و زیر دسته </Text>
                            <Button transparent style={{ color: '#fff', marginRight: -20 }} onPress={() => this.setModalcategory(false)}>
                                <Icon name='close' style={{ fontSize: 30, color: '#fff', marginRight: 20 }} />
                            </Button>
                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <View style={{marginTop:25}}>
                                    <Text style={{ fontSize: 14, color: '#555', marginBottom: 5, fontFamily: 'Vazir-Black',alignSelf:'center' }}> دسته و زیر  دسته جدید را وارد نمایید</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 10}}>

                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="نام دسته جدید را وارد نمایید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={category_name => this.setState({category_name_incom: category_name})}

                                        />
                                    </View>

                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="نام زیر دسته جدید را وارد نمایید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={sub_category => this.setState({sub_category_incom: sub_category})}

                                        />
                                    </View>

                                </View>


                            </View>

                        </View>

                    </View>
                    <Button full style={{ backgroundColor: '#47b03e' ,marginHorizontal:20,borderRadius:10}} onPress={this.UserRegistrcategory}>
                        <Text
                            style={{ color: '#fff', fontSize: 18, fontFamily: 'IRANSansMobile(FaNum)' }}>ثبت</Text>
                    </Button>

                </Modal>

                {/*....................حساب جدید................................. */}
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
                                حساب جدید </Text>
                            <Button transparent style={{ color: '#fff', marginRight: -20 }} onPress={() => this.setModalacount(false)}>
                                <Icon name='close' style={{ fontSize: 30, color: '#fff', marginRight: 20 }} />
                            </Button>
                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <View style={{marginTop:25}}>
                                    <Text style={{ fontSize: 14, color: '#555', marginBottom: 5, fontFamily: 'Vazir-Black',alignSelf:'center' }}> نام حساب،شماره حساب و شماره کارت خود را وارد نمایید</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="نام حساب جدید را وارد نمایید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={acount_name => this.setState({acount_name_incom: acount_name})}

                                        />
                                    </View>

                                </View>
                                <View style={{flexDirection: 'row', marginTop: 3}}>
                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder=" شماره حساب خود را وارد کنید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={acount_num => this.setState({acount_num_incom: acount_num})}

                                        />
                                    </View>

                                </View>
                                <View style={{flexDirection: 'row', marginTop: 3}}>

                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="شماره کارت خود را وارد کنید "
                                            underlineColorAndroid="transparent"
                                            onChangeText={card_num => this.setState({card_num_incom: card_num})}

                                        />
                                    </View>

                                </View>



                            </View>

                        </View>

                    </View>
                    <Button full style={{ backgroundColor: '#47b03e' ,marginHorizontal:20,borderRadius:10}} onPress={this.UserRegistrAccont}>
                        <Text
                            style={{ color: '#fff', fontSize: 18, fontFamily: 'IRANSansMobile(FaNum)' }}>ثبت</Text>
                    </Button>

                </Modal>
                {/*............ ........modal3.دزیافت................................ */}

                <Modal
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.setModaltype(false)}
                    visible={this.state.modaltype}>

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
                                روش دریافت جدید </Text>
                            <Button transparent style={{ color: '#fff', marginRight: -20 }} onPress={() => this.setModaltype(false)}>
                                <Icon name='close' style={{ fontSize: 30, color: '#fff', marginRight: 20 }} />
                            </Button>
                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <View style={{marginTop:25}}>
                                    <Text style={{ fontSize: 14, color: '#555', marginBottom: 5, fontFamily: 'Vazir-Black',alignSelf:'center' }}> نوع روش دریافت جدید را وارد نمایید</Text>
                                </View>

                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <View style={styles.SectionStylemo}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="نام روش دریافت جدید را وارد نمایید"
                                            underlineColorAndroid="transparent"
                                            onChangeText={type_name => this.setState({type_name_incom: type_name})}

                                        />
                                    </View>

                                </View>


                            </View>

                        </View>

                    </View>
                    <Button full style={{ backgroundColor: '#47b03e' ,marginHorizontal:20,borderRadius:10}} onPress={this.UserRegistrType}>
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
                    titleStyle={{fontSize: 14, fontFamily: 'IRANSansMobile(FaNum)'}}
                    messageStyle={{fontSize: 15, fontFamily: 'IRANSansMobile(FaNum)'}}
                    confirmText="بله"
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
export default connect(mapStateToProps)(RegisterIncome);
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',

    },
    SectionStyle: {

        borderRadius: 5, width: '70%', marginLeft: 43, borderWidth: 1.5,
        borderColor: '#3d933c', height: 45, marginTop: 15,


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
        height: 320,
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
});
