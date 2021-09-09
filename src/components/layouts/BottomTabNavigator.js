import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Home from '../screens/Home';
import AdvancedSearch from '../screens/AdvancedSearch';
import ReportDay from '../screens/ReportDay';
import ReportYear from '../screens/ReportYear';
import ReportPerformance from '../screens/ReportPerformance';
import Report from "../screens/Report";
import ReportMonth from "../screens/ReportMonth";
import ReportCategory from "../screens/ReportCategory";
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faAddressCard,
    faBell,
    faCalculator,
    faCashRegister,
    faChartPie, faExternalLinkSquareAlt,
    faHome,
    faSearchDollar,
} from '@fortawesome/free-solid-svg-icons';
import {faFileExport} from '@fortawesome/free-solid-svg-icons/faFileExport';
const RootStack = createStackNavigator({
        Report: {
            screen: Report,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ReportMonth: {
            screen: ReportMonth,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ReportDay: {
            screen: ReportDay,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ReportYear: {
            screen: ReportYear,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ReportCategory: {
            screen: ReportCategory,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ReportPerformance: {
            screen: ReportPerformance,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        AdvancedSearch: {
            screen: AdvancedSearch,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
    },
    {
        initialRouteName:"Report",
        defaultNavigationOptions: {headerShown: false}
    }
);
 class BottomTabNavigator extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return <AppContainer screenProps={this.props.navigation} />;
    }
}
const AppMaterialTopTabNavigator = createMaterialBottomTabNavigator(
    {
        'جستجوی پیشرفته':{screen:AdvancedSearch,
            navigationOptions:{
                tabBarLabel: 'جستجوی پیشرفته',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <FontAwesomeIcon icon={faSearchDollar} size={25} style={{color: tintColor}}/>

                    </View>),
            }
        },
        'گزارشگیری':{screen:RootStack,
            navigationOptions:{
                tabBarLabel:'گزارشگیری',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        {/*<Icon style={[{color: tintColor}]} size={25} name={'alert'}/>*/}
                        <FontAwesomeIcon icon={faFileExport} size={25} style={{color: tintColor}}/>
                    </View>),
            }
        },
        'صفحه اصلی':{screen:Home,
            navigationOptions:{
                tabBarLabel:'صفحه اصلی',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <FontAwesomeIcon icon={faHome} size={20} style={{color: tintColor}}/>

                    </View>),
            }
        },

    },
    {
        initialRouteName: 'صفحه اصلی',
        activeColor: '#3d933c',
        inactiveTintColor: 'grey',
        barStyle: { backgroundColor: '#fff'},
       //labelStyle:{fontFamily:'Lalezar-Regular',fontSize:30},
        swipeEnabled: true,
        animationEnabled: true,
        shifting:false,
        tabBarLabel:{titleStyle:{fontFamily:'Lalezar-Regular',fontSize:30}},
       // titleStyle:{fontFamily:'Lalezar-Regular'}

    },
);

const AppContainer = createAppContainer(AppMaterialTopTabNavigator);
export default BottomTabNavigator;
