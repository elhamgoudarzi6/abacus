import React, { Component } from 'react';
import { View, TouchableOpacity, Image, ScrollView, StatusBar, StyleSheet, Text, Picker ,Modal,Alert} from 'react-native';
import { Provider, Portal, FAB,} from 'react-native-paper';
import Modald from 'react-native-modalbox';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Header from '../layouts/Header';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

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
import { CardItem, Tabs, Tab, ListItem, TabHeading, Left, Body, Title, Right, Form, Input, Item, Label, Button, Card} from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

class Reminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.dataLogin['id'],
            image: '',
            open: false,
            modalVisible:false,
            modalVisibleimage:false,
            modalVisibletext:false,
            modaldateimage: false,
            modaldatetext:false,
            isVisableBoxImage: 'none',
            userSelected:[],
            dataSource:[],
            isLoading: true,
            // ...................uploadimage...............
            imagepath:'',
            //..............RegisterReminderText...............
            DateText: '',
            description_text: '',
            repeate_text: '',
            title_text: '',
            //..............RegisterReminderText...............
            Dateimage: '',
            description_image: '',
            repeate_image: '',
            title_image: '',
        }
        this.ShowReminderRecord ();
    };
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        this.ShowReminderRecord ();
    }
    componentDidMount(): void {
    }

    onValueChange(value: string) {
        this.setState({
            repate_text: value
        });
    }
    onValueChangei(value: string) {
        this.setState({
            repate_image: value
        });
    }
    // ................modal...........
    clickEventListener = (item) => {
        this.setState({userSelected: item}, () =>{
            this.setModalVisible(true);
        });
    }
    clickEventimage = () => {
        this.setState(() =>{
            this.setModalVisibleimage(true);
        });
    }
// ................modal...........

    setModalVisibleimage(visible) {
        this.setState({modalVisibleimage: visible});
    }

// ................modal...........

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    clickEventtext = () => {
        this.setState(() =>{
            this.setModalVisibletext(true);
        });
    }
// ................modal...........

    setModalVisibletext(visible) {
        this.setState({modalVisibletext: visible});
    }
//............
// ........modal...........
    clickEventImage = () => {

        this.setModalImage(true);
    }
    setModalImage(visible) {
        this.setState({ modaldateimage: visible });
    }
// ........modal...........
    clickEventdatetxt = () => {

        this.setModalText(true);
    }
    setModalText(visible) {
        this.setState({ modaldatetext: visible });
    }
    // ..............imagepicker............................
    renderAsset(image) {
        return renderImage(image);
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
                            console.log(responseJson.imagePath)
                        this.setState({imagepath:responseJson.imagePath});
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
    ShowReminderRecord = () => {
        fetch('http://194.5.175.25:2000/api/v1/reminder/' + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
    // .............. RegisterReminderText ..............
    RegisterReminderText = () => {
        if (this.state.description_text=="" ||this.state.DateText=="" || this.state.title_text==""){
            Alert.alert('لطفا اطلاعات را بطور کامل وارد نمایید')
        }
        else {
            fetch('http://194.5.175.25:2000/api/v1/reminder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:this.state.user_id,
                    description: this.state.description_text,
                    date: this.state.DateText,
                    repeat: this.state.repeate_text,
                    title: this.state.title_text,
                    type: '2',
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    Alert.alert('با موفقیت ثبت شد')
                    // Alert.alert(responseJson.data);
                    this.setModalVisibletext(false);
                }).catch((error) => {
                console.error(error);
            });
        }
    }
    RegisterReminderImage = () => {
        if (this.state.description_image=="" ||this.state.Dateimage=="" || this.state.title_image=="" || this.state.imagePath==""){
            Alert.alert('لطفا اطلاعات را بطور کامل وارد نمایید')
        } else {
            fetch('http://194.5.175.25:2000/api/v1/reminder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:this.state.user_id,
                    description: this.state.description_image,
                    date:this.state.Dateimage,
                    repeat:this.state.repeate_image ,
                    title:this.state.title_image,
                    type:'1',
                    image:this.state.imagePath,
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    Alert.alert('با موفقیت ثبت شد')
                    // Alert.alert(responseJson.data);
                    this.setModalVisibleimage(false);

                }).catch((error) => {
                console.error(error);
            });
        }
    }
    //  .................delete..........................
    DeleteReminderRecord = (item) => {
        let id;
        id = item._id;
        fetch('http://194.5.175.25:2000/api/v1/reminder/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);


            }).catch((error) => {
            console.error(error);
        });

    }
    _onStateChange = ({ open }) => this.setState({ open });

    __getCompletedIcon = (item) => {
        if(item.type ==1) {
            // return require('../image/photo.png');
            return <Icon   name='camera' color='green'style={{fontSize:25}}/>
        }
        else if(item.type==2) {
            return <Icon name="text-height" color='green'style={{fontSize:25}}/>
        }
    }
    render() {
        const image = this.state;
        const { open } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />
                 <Header  title='یادداشت ها' onBackPress={() => {this.props.navigation.goBack();}} />
                <FlatGrid
                    itemDimension={200}
                    items={this.state.dataSource}
                    style={{marginTop: 3}}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                    renderItem={({item, index}) => (
                        <Card>
                            <CardItem>
                                <Left>
                                    <Text style={styles.date}>{item.date}</Text>
                                </Left>

                                <Right style={{flexDirection:'row',flex:2,alignSelf:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'}}>
                                    <Text style={styles.titel}>{item.title}</Text>
                                    <Text > { this.__getCompletedIcon(item)}</Text>

                                </Right>
                            </CardItem>
                            <CardItem style={{ justifyContent:'flex-end',alignItems:'flex-end'}}>
                                <View >
                                    <Text style={styles.description}>
                                        یاداشت: {item.description}
                                    </Text>
                                </View>
                            </CardItem>
                            <CardItem CardItem footer bordered style={{height:35}} >
                                <Left>
                                    <Button transparent onPress={() => this.clickEventListener(item)}>

                                        <Text style={{fontSize:16,color:'#3e843d',marginRight:5}}>جزئیات بیشتر</Text>
                                        <Icon active name="play-circle-o"  style={{fontSize:20,color:'#3e843d',marginRight:5}} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>

                                    </Button>
                                </Body>
                                <Right>
                                    <Button transparent onPress={() => { Alert.alert(
                                        'هشدار حذف',
                                        'آیا برای حذف اطمینان دارید؟',
                                        [
                                            {text: 'لغو'},
                                            {text: 'بله', onPress: () => { this.DeleteReminderRecord(item)}},
                                        ],
                                    ) }}>

                                        <Icon active name="trash"  style={{fontSize:20,color:'#777'}}/>

                                    </Button>
                                </Right>

                            </CardItem>
                        </Card>

                    )}/>


                <Provider>
                    <Portal>
                        <FAB.Group
                            fabstyle={{ color: '#fff', backgroundColor: '#3d933c' }}
                            open={open}
                            icon={open ? '' : 'plus'}
                            actions={[
                                // {icon: 'plus', onPress: () => console.log('Pressed add')},
                                { icon: 'text',color:'#3e843d',label: 'یادآور متنی',onPress:() => this.clickEventtext()},
                                { icon: 'camera',color:'#3e843d', label: 'یادآور تصویری',  onPress:() => this.clickEventimage()},
                                { icon: 'voice',color:'#3e843d', label: 'یادآور صوتی', onPress: () => Alert.alert('پیغام',`در نسخه های بعدی این قابلیت افزوده خواهد شد`,[{text:'بسیار خب'}])},

                            ]}
                            onStateChange={this._onStateChange}
                            onPress={() => {
                                if (open) {
                                    // do something if the speed dial is open
                                }
                            }}
                        />
                    </Portal>
                </Provider>

                {/*............ ........modaldetails................................ */}

                <Modal

                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.setModalVisible(false)}
                    visible={this.state.modalVisible}>
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

                            <Text style={{ fontSize: 20, color: '#fff', marginBottom: 5, fontFamily: 'Far_Aref' }}>جزئیات بیشتر</Text>
                            <Button transparent style={{ marginRight: -20 }}>
                                <Icon name='close' style={{ fontSize: 25, color: '#fff', marginRight: 20 }} onPress={() => { this.setModalVisible(false) }} />
                            </Button>

                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <ScrollView contentContainerStyle={styles.modalInfo}>
                                    <Image style={styles.image} source={{ uri: this.state.userSelected.image }} />
                                    <View style={{ marginTop: 10 }}>
                                        <View style={[styles.view,{backgroundColor:'#e2e2e2'}]}>
                                            <Text style={styles.title}>عنوان:<Text style={styles.title}>{this.state.userSelected.title} </Text></Text>
                                        </View>
                                        <View style={[styles.view,{backgroundColor:'#fff'}]}>
                                            <Text style={styles.title}>تاریخ : <Text style={styles.title}> {this.state.userSelected.date}</Text></Text>
                                        </View>

                                        <View style={[styles.view,{backgroundColor:'#e2e2e2'}]}>
                                            <Text style={styles.title}> توضیحات:  {this.state.userSelected.description}</Text>
                                        </View>
                                    </View>
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                </Modal>
                {/*..........Reminderimage...............*/}
                <Modal

                    animationType={'fade'}
                    transparent={true}
                    // onRequestClose={() => this.setModalVisibleimge(false)}
                    visible={this.state.modalVisibleimage}>
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

                            <Text style={{ fontSize: 18, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>ثبت یادآور تصویری</Text>
                            <Button transparent style={{ marginRight: -20 }}>
                                <Icon name='close' style={{ fontSize: 30, color: '#fff', marginRight: 20 }} onPress={() => { this.setModalVisibleimage(false) }} />
                            </Button>

                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>

                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View>
                                        <Item fixedLabel>
                                            <Left>
                                                <Button transparent >
                                                    <Icon active name="text-height" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>
                                            <Input style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light' }} onChangeText={title => this.setState({title_image:title})} />
                                            <Label style={{
                                                paddingRight
                                                    : 20
                                            }}><Text style={{
                                                color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', paddingRight: 20, height: 15,

                                            }}>عنوان:</Text></Label>

                                        </Item>


                                        <Item fixedLabel onPress={() => this.clickEventImage()}>
                                            <Left>
                                                <Button transparent >
                                                    <Icon active name="calendar" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>
                                            <View style={{alignSelf:'flex-end',alignItems:'flex-end',justifyContent:'flex-end' }}>

                                            </View>
                                            <Text style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Bold',}}>{this.state.Dateimage} </Text>
                                            <Label style={{
                                                paddingRight
                                                    : 20
                                            }}><Text style={{
                                                color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', paddingRight

                                                    : 20
                                            }}> تاریخ:</Text></Label>

                                        </Item>
                                        <Item fixedLabel>
                                            <Left>
                                                <Button transparent >
                                                    <Icon active name="edit" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>
                                            <Input multiline={true} style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', alignItems: 'center' }}
                                                   onChangeText={description => this.setState({description_image:description})}/>
                                            <Label style={{
                                                paddingRight
                                                    : 20
                                            }}><Text style={{
                                                color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', paddingRight: 20, height: 15,

                                            }}>یاداشت :</Text></Label>

                                        </Item>
                                        <ListItem Icon>
                                            <Left>
                                                <Button transparent style={{ marginLeft: -20, }}>
                                                    <Icon active name="bell" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>

                                            </Left>
                                            <Body style={{ marginLeft: -80, marginRight: 100, width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"

                                                    iosIcon={<Icon name="arrow-down" />}

                                                    textStyle={{ color: "#777777" }}
                                                    itemStyle={{
                                                        backgroundColor: "#d3d3d3",
                                                        marginLeft: 0,
                                                        paddingLeft: 1,
                                                        color:'#777777'
                                                    }}
                                                    itemTextStyle={{ color: '#777777' }}
                                                    style={{ width: undefined }}
                                                    selectedValue={this.state.repate_image}
                                                    onValueChange={this.onValueChangei.bind(this)}
                                                >
                                                    <Picker.Item label="هرگز" value="هرگز" style={{fontFamilyfontFamily:'IRANSansMobile(FaNum)_Light',color:'#777777'}} />
                                                    <Picker.Item label="روزانه" value="روزانه" />
                                                    <Picker.Item label="هفتگی" value="هفتگی" />
                                                    <Picker.Item label="ماهانه" value="ماهانه" />
                                                    <Picker.Item label="سالانه" value="سالانه" />
                                                </Picker>

                                            </Body>
                                            <Right>
                                                <Text style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', marginHorizontal: -40, marginRight: -2 }}> تکرار یاداوری</Text>

                                            </Right>
                                        </ListItem>
                                        {/* .........................imagepicker.................................. */}
                                        <View style={{marginTop: 8, marginHorizontal: 30}}>
                                            <Card>
                                                <CardItem bordered style={{backgroundColor: '#c5f3c1', borderStyle: 'dashed', borderWidth: 0.5}}>
                                                    <Left>


                                                        <Body onPress>
                                                            <Text style={{color: '#777'}} onPress={this.handleClick.bind(this)}>پیوست
                                                                فایل</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                            </Card>
                                        </View>
                                        <View>
                                            {this.state.image ? this.renderAsset(this.state.image) : null}
                                        </View>


                                        <Modal
                                            animationType={'fade'}
                                            transparent={true}
                                            onRequestClose={() => this.setModalImage(false)}
                                            visible={this.state.modaldateimage}>
                                            <View style={styles.popupOverlay}>
                                                <View style={styles.popup}>
                                                    <View style={styles.popupContent}>

                                                        <DatePicker isGregorian={false}
                                                                    mode="date"
                                                                    options={{
                                                                        defaultFont:'Vazir-Black',
                                                                        headerFont:'Vazir-Black',
                                                                    }}
                                                                    onDateChange={date => {
                                                                        this.setState({ Dateimage: date });
                                                                        this.setModalImage(false)}


                                                                    }

                                                                    placeholder="Select date"
                                                        />



                                                    </View>
                                                </View>
                                            </View>
                                            <Button full style={{ backgroundColor: '#47b03e' }} onPress={() => { this.setModalImage(false) }}
                                            >
                                                <Text
                                                    style={{ color: '#fff', fontSize: 16, fontFamily: 'IRANSansMobile(FaNum)' }}>انصراف</Text>
                                            </Button>
                                        </Modal>
                                    </View>
                                </ScrollView>

                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5, backgroundColor: '#fff', }}>
                        <TouchableOpacity onPress={() => { this.setModalVisibleimage(false) }}  style={{
                            borderRadius: 5, width: '45%', marginLeft: 10, backgroundColor: '#fff', borderColor: '#47b03e', borderWidth: 1.5,
                            height: 40, marginBottom: 2,
                        }}>

                            <Text style={{ color: '#47b03e', textAlign: 'center', fontSize: 16, marginTop: 8,fontFamily:'IRANSansMobile(FaNum)' }}>لغو</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderRadius: 5, width: '45%', marginLeft: 10, backgroundColor: '#47b03e',
                            height: 40, marginBottom: 2,

                        }} onPress={this.RegisterReminderImage}>

                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, marginTop: 8 ,fontFamily:'IRANSansMobile(FaNum)'}}>ذخیره</Text>
                        </TouchableOpacity>


                    </View>
                </Modal>
                {/*..........Remindertext...............*/}
                <Modal

                    animationType={'fade'}
                    transparent={true}
                    // onRequestClose={() => this.setModalVisibleimge(false)}
                    visible={this.state.modalVisibletext}>
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

                            <Text style={{ fontSize: 20, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>ثبت یادآور متنی</Text>
                            <Button transparent style={{ marginRight: -20 }}>
                                <Icon name='close' style={{ fontSize: 30, color: '#fff', marginRight: 20 }} onPress={() => { this.setModalVisibletext(false) }} />
                            </Button>

                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>

                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View>
                                        <Item fixedLabel>
                                            <Left>
                                                <Button transparent fixedLabel >
                                                    <Icon active name="text-height" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>
                                            <Input style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', alignItems: 'center', justifyContent: 'center' }}  onChangeText={title => this.setState({title_text:title})} />
                                            <Label style={{
                                                paddingRight
                                                    : 20
                                            }}><Text style={{
                                                color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', paddingRight: 20, height: 15,

                                            }}>عنوان:</Text></Label>

                                        </Item>

                                        <Item fixedLabel>
                                            <Left>
                                                <Button transparent>
                                                    <Icon active name="edit" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>
                                            <Input multiline={true} style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', alignItems: 'center' }}
                                                   onChangeText={description => this.setState({description_text:description})}/>
                                            <Label style={{
                                                paddingRight
                                                    : 20
                                            }}><Text style={{
                                                color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', paddingRight: 20, height: 15,

                                            }}>یاداشت :</Text></Label>

                                        </Item>

                                        <Item fixedLabel onPress={() => this.clickEventdatetxt()} >
                                            <Left>
                                                <Button transparent>
                                                    <Icon active name="calendar" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>

                                            <Text style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light' }}>{this.state.DateText} </Text>
                                            <Label style={{
                                                paddingRight
                                                    : 20
                                            }}><Text style={{
                                                color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', paddingRight

                                                    : 20
                                            }}> تاریخ:</Text></Label>


                                        </Item>

                                        <ListItem Icon>
                                            <Left>
                                                <Button transparent style={{ marginLeft: -20, }}>
                                                    <Icon active name="bell" style={{ color: '#00C851', fontSize: 20, marginLeft: 8 }} />
                                                </Button>
                                            </Left>
                                            <Body style={{ marginLeft: -80, marginRight: 100, width: '100%' }}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    textStyle={{ color: "#777777" }}
                                                    itemStyle={{
                                                        backgroundColor: "#d3d3d3",
                                                        marginLeft: 0,
                                                        paddingLeft: 1,
                                                        color:'#777777'
                                                    }}
                                                    itemTextStyle={{ color: '#777777' }}
                                                    style={{ width: undefined }}
                                                    selectedValue={this.state.repate_text}
                                                    onValueChange={this.onValueChange.bind(this)}
                                                >
                                                    <Picker.Item label="هرگز" value="هرگز" style={{fontFamilyfontFamily:'IRANSansMobile(FaNum)_Light',color:'#777777'}} />
                                                    <Picker.Item label="روزانه" value="روزانه" />
                                                    <Picker.Item label="هفتگی" value="هفتگی" />
                                                    <Picker.Item label="ماهانه" value="ماهانه" />
                                                    <Picker.Item label="سالانه" value="سالانه" />
                                                </Picker>
                                            </Body>
                                            <Right>
                                                <Text style={{ color: '#777', fontFamily: 'IRANSansMobile(FaNum)_Light', marginHorizontal: -40, marginRight: -2 }}> تکرار یاداوری</Text>

                                            </Right>
                                        </ListItem>


                                        <Modal
                                            animationType={'fade'}
                                            transparent={true}
                                            onRequestClose={() => this.setModalText(false)}
                                            visible={this.state.modaldatetext}>
                                            <View style={styles.popupOverlay}>
                                                <View style={styles.popup}>
                                                    <View style={styles.popupContent}>

                                                        <DatePicker isGregorian={false}
                                                                    mode="date"
                                                                    options={{
                                                                        defaultFont:'Vazir-Black',
                                                                        headerFont:'Vazir-Black',
                                                                    }}
                                                                    onDateChange={date => {
                                                                        this.setState({ DateText: date });
                                                                        this.setModalText(false)
                                                                    }

                                                                    }

                                                                    placeholder="Select date"
                                                        />

                                                    </View>
                                                </View>
                                            </View>
                                            <Button full style={{ backgroundColor: '#47b03e' }} onPress={() => { this.setModalText(false) }}
                                            >
                                                <Text
                                                    style={{ color: '#fff', fontSize: 16, fontFamily: 'IRANSansMobile(FaNum)' }}>انصراف</Text>
                                            </Button>
                                        </Modal>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5,backgroundColor: '#fff' }}>
                        <TouchableOpacity  onPress={() => { this.setModalVisibletext(false) }}  style={{
                            borderRadius: 5, width: '45%', marginLeft: 10, backgroundColor: '#fff', borderColor: '#47b03e', borderWidth: 1.5,
                            height: 40, marginBottom: 2,
                        }}>

                            <Text style={{ color: '#47b03e', textAlign: 'center', fontSize: 16, marginTop: 8 }}>لغو</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            borderRadius: 5, width: '45%', marginLeft: 10, backgroundColor: '#47b03e',
                            height: 40, marginBottom: 2,

                        }} onPress={this.RegisterReminderText}>

                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, marginTop: 8 }}>ذخیره</Text>
                        </TouchableOpacity>


                    </View>
                </Modal>
            </View>

        );
    }
}

const  mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,

    };
};
export default connect(mapStateToProps)(Reminder);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#04c1a5',
    },
    modal4: {
        height: 426,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    root: {
        marginTop:20,
        marginHorizontal:20
    },
    tasks:{
        flex:1,
    },
    cardContent: {
        marginRight:20,
        marginTop:2,
    },
    image:{
        width:35,
        height:35,
        // alignSelf:'flex-end',
        // justifyContent:'flex-end',
        // alignItems:'flex-end',
    },

    card:{
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical:2,
        marginHorizontal:20,
        backgroundColor:"white",
        flexBasis: '46%',
        padding: 20,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderRadius:5,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },

    description:{
        fontSize:14,
        flex:1,
        color:"#777777",
        fontFamily: 'IRANSansMobile(FaNum)',
        marginTop:-13,
        textAlign:'right'

    },
    title:{
        fontSize:16,
        flex:1,
        color:"#444",
        fontFamily: 'IRANSansMobile(FaNum)',
        margin: 10,
        padding: 5

    },
    date:{
        fontSize:14,
        flex:1,
        color:"#696969",
        marginTop:3,
        fontFamily: 'IRANSansMobile(FaNum)'
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

