import {Image, View, Button, StyleSheet, ScrollView, Text, ImageBackground, StatusBar} from "react-native";
import {createDrawerNavigator, DrawerItems,DrawerActions} from 'react-navigation-drawer';
import {createAppContainer,} from 'react-navigation';
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faAward,
    faBalanceScale,
    faBars,
    faBell, faCalculator, faCalendarPlus, faCartPlus, faChartPie, faCoins,
    faComment,
    faCreditCard, faDollyFlatbed,
    faEdit, faExternalLinkAlt, faFileContract,
    faFunnelDollar,
    faHome, faIcons, faImage,
    faLayerGroup,
    faListAlt, faListOl, faMobile, faMobileAlt,
    faMoneyBill,
    faPhone,
    faPlusCircle,
    faRubleSign, faSave,
    faSign,
    faSignOutAlt,
    faSkiing,
    faTasks,
    faUser, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import ListIncome from '../screens/ListIncome';
import ListCost from '../screens/ListCost';
import ListDebt from '../screens/ListDebt';
import ContactUs from '../screens/ContactUs';

import BottomTabNavigator from '../layouts/BottomTabNavigator';
import {Body, Footer, Header, Icon, Left, Right} from "native-base";
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import LinearGradient from "react-native-linear-gradient";
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import Profile from '../screens/Profile';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons/faUserCircle';
import {faMoneyBillWaveAlt} from '@fortawesome/free-solid-svg-icons/faMoneyBillWaveAlt';
import {faPhoneSquare} from '@fortawesome/free-solid-svg-icons/faPhoneSquare';

const CustomDrawerComponent = props => (
    <View style={{flex: 1}}>
        <Header style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor='#3e843d'
            />
            <LinearGradient
                start={{x: 0.25, y: 0.0}} end={{x: 0.5, y: 1.0}}
                locations={[0.1,0.6,0.9]}
                colors={['#3e843d','#3ede30','#47b03e']}
                style={{
                    padding:10,
                    width: '108%',
                }}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-end', marginTop: 20,marginRight:40}}>
                        <Image
                            source={require('../../../assets/images/icons/abacus.png')}
                            style={{
                                width: 75,
                                height: 75,
                                marginBottom: 20,
                                marginTop: -10,
                                marginRight: 50,}}
                        />
                        <Text style={{color:'#fff',marginTop:-30,fontSize:30,marginRight:65,textAlign:'center',justifyContent: 'center',alignItems:'center',fontFamily:'Far_Aref'}}>چرتکه</Text>
                    </View>
                </View>
            </LinearGradient>
        </Header>

        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>

        <Footer style={styles.containerfooter}>
            <View style={{flexDirection: 'row-reverse', flex: 1,backgroundColor:'#eeeeee',paddingHorizontal:10}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end',marginHorizontal:20}}>
                    <FontAwesomeIcon color={'#3d933c'} icon={faSignOutAlt} style={styles.containericon}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{color: '#777', fontFamily: 'Vazir-Black',}}>خروج</Text>
                </View>
            </View>
        </Footer>
    </View>
);
const styles = StyleSheet.create({
    container: {
        height: 180,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerimage: {
        borderRadius: 75,
        width: 120,
        height: 120,
        marginTop: 15,
    },
    containericon: {
        color: '#777',
        fontSize: 30,
    },
    containerview1: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: -10,
        flexDirection: 'row',
    },
    containerview: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
    },
    containerfooter: {
        backgroundColor: '#eeeeee',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    containertext: {
        fontSize: 20,
        justifyContent: 'center',
        color: '#ffff',
    },
    icon: {
        width: 24,
        height: 24,

    },
});

const CustomerMyDrawerNavigator = createDrawerNavigator({
        'صفحه اصلی': {
            screen: BottomTabNavigator,
            navigationOptions: {
                headerShown: false,
                drawerLabel: (
                    <View style={{flex: 1, flexDirection: 'row',backgroundColor:'#fff',height:55,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flex: 9}}>
                            <Text style={{fontFamily: 'Vazir-Black', color: '#666',textAlign:'right',marginRight:30}}>صفحه اصلی</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <FontAwesomeIcon icon={faHome} size={20} style={{color: '#3d933c'}}/>
                        </View>
                    </View>
                ),
            },
            contentOptions: {
                activeTintColor: '#fff',
            }
        },
        'لیست': {
            screen: Profile,
            navigationOptions: {
                headerShown: false,
                drawerLabel: (
                    <View style={{flex: 1, flexDirection: 'row',backgroundColor:'#f5f5f5',height:55,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flex: 9}}>
                            <Text style={{fontFamily: 'Vazir-Black', color: '#555',textAlign:'right',marginRight:30}}>پروفایل من</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <FontAwesomeIcon icon={faUserCircle} size={20} style={{color: '#3d933c'}}/>
                        </View>
                    </View>
                ),
            },
            contentOptions: {
                activeTintColor: '#fff',
            }
        },
        'گزارشگیری': {
            screen: ListIncome,
            navigationOptions: {
                headerShown: false,
                drawerLabel: (
                    <View style={{flex: 1, flexDirection: 'row',backgroundColor:'#fff',height:55,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flex: 9}}>
                            <Text style={{fontFamily: 'Vazir-Black', color: '#666',textAlign:'right',marginRight:30}}>لیست درآمد</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <FontAwesomeIcon icon={faCoins} size={20} style={{color: '#3d933c'}}/>
                        </View>
                    </View>
                ),
            },
            contentOptions: {
                activeTintColor: '#fff',
            }
        },
        'بودجه بندی': {
            screen: ListCost,
            navigationOptions: {
                headerShown: false,
                drawerLabel: (
                    <View style={{flex: 1, flexDirection: 'row',backgroundColor:'#f5f5f5',height:55,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flex: 9}}>
                            <Text style={{fontFamily: 'Vazir-Black', color: '#666',textAlign:'right',marginRight:30}}>لیست هزینه</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <FontAwesomeIcon icon={faCalculator} size={20} style={{color: '#3d933c'}}/>
                        </View>
                    </View>
                ),
            },
            contentOptions: {
                activeTintColor: '#fff',
            }
        },
        'یادآوری': {
            screen: ListDebt,
            navigationOptions: {
                headerShown: false,
                drawerLabel: (
                    <View style={{flex: 1, flexDirection: 'row',height:55,justifyContent:'center',alignItems:'center'}}>
                        <View style={{flex: 9}}>
                            <Text style={{fontFamily: 'IRANSansMobile_Bold', color: '#666',textAlign:'right',marginRight:30}}> لیست بدهی</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <FontAwesomeIcon icon={faList} size={20} style={{color: '#3d933c'}}/>
                        </View>
                    </View>
                ),
            },
            contentOptions: {
                activeTintColor: '#fff',
            }
        },
        'درباره ما': {
            screen: ContactUs,
            navigationOptions: {
                headerShown: false,
                drawerLabel: (
                    <View style={{flex: 1, flexDirection: 'row',height:55,backgroundColor:'#f5f5f5',justifyContent:'center',alignItems:'center'}}>
                        <View style={{flex: 9}}>
                            <Text style={{fontFamily: 'Vazir-Black', color: '#666',textAlign:'right',marginRight:30}}>تماس با ما</Text>
                        </View>
                        <View style={{flex: 2}}>
                            <FontAwesomeIcon icon={faPhoneSquare} size={20} style={{color: '#3d933c'}}/>
                        </View>
                    </View>
                ),
            },
            contentOptions: {
                activeTintColor: '#fff',
            }
        },
    },

    {
        drawerPosition: 'right',
        drawerWidth: 260,
        initialRouteName:'صفحه اصلی',
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#fff',
            itemsContainerStyle: {
                backgroundColor:'#fff',
                border: 10,
            },
            labelStyle: {
                fontSize: 15,
                fontFamily: 'IRANSansMobile',
            },
            itemStyle: {
                height: 55,
                justifyContent: 'center',
            },
        },
    });

export default createAppContainer(CustomerMyDrawerNavigator);