import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, FlatList, TouchableOpacity, Alert, StatusBar,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {connect} from "react-redux";
import {mobileChanged, passwordChanged, userGetData} from "../../action/LoginUser.js";
class Home extends Component {
    constructor(props) {
        super(props);
      console.log(this.props.dataLogin)
        this.state = {
            open: false,
            showAlert: false,
            titles: '',
            data: [
                {
                    id: 1,
                    title: 'ثبت بدهی',
                    image: require('../../../assets/images/icons/debt.png'),


                }
                ,
                {
                    id: 2,
                    title: 'ثبت مخارج',
                    image: require('../../../assets/images/icons/cost.jpg'),
                }
                ,
                {
                    id: 3,
                    title: 'ثبت درآمد',
                    image: require('../../../assets/images/icons/2503483.png'),
                }
                ,
                {
                    id: 4,
                    title: 'بودجه بندی',
                    image: require('../../../assets/images/icons/money.png'),

                }
                ,
                {
                    id: 5,
                    title: 'یادآوری',
                    image: require('../../../assets/images/icons/1792931.png'),
                }
                ,
                {
                    id: 6,
                    title: 'موجودی',
                    image: require('../../../assets/images/icons/639365.png'),

                }
                ,
                {
                    id: 7,
                    title: 'تراکنش ها',
                    image: require('../../../assets/images/icons/taransaction.png'),

                }
                ,
                {
                    id: 8,
                    title: 'پرداخت آنلاین',
                    image: require('../../../assets/images/icons/pardakhtonline.png'),
                }
                ,
                {
                    id: 9,
                    title: 'دخل و خرج',
                    image: require('../../../assets/images/icons/2760970.png'),

                },
                {
                    id: 10,
                    title: 'پرداخت قبض',
                    image: require('../../../assets/images/icons/1896987.png'),
                },
                {
                    id: 11,
                    title: 'خدمات دولتی',
                    image: require('../../../assets/images/icons/1017318.png'),
                },
                {
                    id: 12,
                    title: 'وام بانکی',
                    image: require('../../../assets/images/icons/loan.png'),

                },
            ],

        };
    }

    toggleDrawer = () => {
        this.props.navigation.openDrawer();
    };
    _onStateChange = ({open}) => this.setState({open});

    clickEventListener(item) {
        Alert.alert(item.title);
    }

    showAlert = (item) => {
        this.setState({
            showAlert: true,
            titles: item.title,

        });
    };
    showMessage = (item) => {
        this.setState({
            showAlert: true,
            titles: item,

        });
    };
    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };
    cardNavigate=(item)=>{
        switch (item.id)
        {
            case 1: this.props.screenProps.navigate('RegisterDebt');
                break;
            case 2: this.props.screenProps.navigate('RegisterCost');
                break;
            case 3: this.props.screenProps.navigate('RegisterIncome');
                break;
            case 4: this.props.screenProps.navigate('Budgeting');
                break;
            case 5: this.props.screenProps.navigate('Reminder');
                break;
            default:this.showMessage(`در نسخه های بعدی این قابلیت افزوده خواهد شد`)
        }
    }

    render() {
        const {open} = this.state;
        const {showAlert} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />
                <LinearGradient start={{x: 0.40, y: 0.0}} end={{x: 0.5, y: 1.0}}
                                locations={[0, 0.5, 0.6]}
                                colors={['#3e843d', '#3ede30', '#47b03e']} style={{
                    height: 220, alignItems: 'center', justifyContent: 'center',
                }}>
                    <FontAwesomeIcon icon={faBars} size={25} style={{color: '#fff', marginLeft: '88%',marginTop:5}}
                                     onPress={() => this.props.screenProps.openDrawer()}/>
                    <Image
                        source={require('../../../assets/images/icons/abacus.png')}
                        style={{width: 65, height: 65}}
                    />
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 40,
                        fontFamily: 'Far_Aref',
                        marginTop: -10,
                        marginBottom: 8,
                    }}>چرتکه</Text>
                    {/*</View>*/}
                </LinearGradient>
                {/*<View style={styles.Detail}>*/}
                {/*    <View style={styles.detailContent}>*/}
                {/*        <Image style={styles.icon1} source={require('../../../assets/images/icons/bill2.png')}/>*/}
                {/*        <Text style={styles.textHeader}>مبلغ بدهی</Text>*/}
                {/*        <Text style={[styles.textHeader,{marginTop:-5}]}><Text style={{fontFamily:'IRANSansMobile(FaNum)'}}>500000</Text> تومان</Text>*/}

                {/*    </View>*/}

                {/*    <View*/}
                {/*        style={[styles.detailContent,{borderLeftWidth: 1,*/}
                {/*            borderColor: '#e2e2e2'}]}>*/}
                {/*        <Image style={styles.icon1} source={require('../../../assets/images/icons/2760970.png')}/>*/}
                {/*        <Text style={styles.textHeader}>مخارج</Text>*/}
                {/*        <Text style={[styles.textHeader,{marginTop:-5}]}><Text style={{fontFamily:'IRANSansMobile(FaNum)'}}>500000</Text> تومان</Text>*/}

                {/*    </View>*/}
                {/*    <View  style={[styles.detailContent,{borderLeftWidth: 1,*/}
                {/*        borderColor: '#e2e2e2'}]}>*/}
                {/*        <Image style={styles.icon1} source={require('../../../assets/images/icons/wallet.png')}/>*/}
                {/*        <Text style={styles.textHeader}>مانده</Text>*/}
                {/*        <Text style={[styles.textHeader,{marginTop:-5}]}><Text style={{fontFamily:'IRANSansMobile(FaNum)'}}>500000</Text> تومان</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
                    <FlatGrid
                        itemDimension={100}
                        items={this.state.data}
                      style={{}}
                              contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.9}
                                              onPress={() => this.cardNavigate(item)}>
                    <View>
                        <Card style={{width:'100%',height: 120,
                        shadowColor: '#3d933c',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                            marginRight: 16,
                            marginBottom: 12
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 12,
                        borderColor:'#3d933c',borderRadius:15,
                        borderWidth:1.5,
                      }}
                         >
                          {/*onPress={() => this.props.navigation.navigate('Report')}>*/}
                        <Card.Cover style={{width:80,height: 75,alignSelf:'center',backgroundColor:'#fff',marginTop:5}} source={item.image} />
                        <Card.Title title={item.title}
                            titleStyle={styles.title}
                        />

                    </Card>
                </View>
                            </TouchableOpacity>
                            )} />

                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title={this.state.titles}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    titleStyle={{fontSize: 16, fontFamily: 'IRANSansMobile(FaNum)', textAlign: 'center'}}
                    messageStyle={{fontSize: 15, fontFamily: 'IRANSansMobile(FaNum)'}}
                    confirmText="تایید"
                    confirmButtonColor="#3d933c"
                    confirmButtonStyle={{width: 100}}
                    confirmButtonTextStyle={{
                        fontSize: 17,
                        fontFamily: 'IRANSansMobile(FaNum)',
                        textAlign: 'center',
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin
    }
}
export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    icon: {
        flex: 1,
        borderColor: '#3d933c',
        borderWidth: 1.5,
        margin: 7,
        height: '100%',
        borderRadius: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Detail: {
        width: 310,
        alignSelf: 'center',
        marginTop: 170,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#808080',
        shadowOffset: {
            width: 0,
            height: 2,
            marginVertical: 5,
            marginRight: 16,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 12,
    },
    detailContent: {
        marginTop:5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:12,
        height:80
    },
    icon1: {
        width: 35,
        height: 35,
    },
    buttonstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: 195,
        height: 40,
        borderRadius: 5,
        shadowColor: '#00000021',
        backgroundColor: '#3d933c',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    textHeader:{
        fontSize: 13,
        fontFamily: 'Lalezar-Regular',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
   title: {
       // fontSize: RFValue(11, 580),
       fontSize:13,
      //  textAlign: "center",
       alignSelf:'center',
        marginHorizontal: 15,
       color: '#333',
       fontFamily: 'Vazir-Black',
       flex:2
   },
});
