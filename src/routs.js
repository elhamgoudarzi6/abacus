import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//global screens
import Slider from './components/screens/Slider';
import Splash from './components/screens/Splash';
import SendMessage from './components/screens/SendMessage';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import  DashboardUser from './components/layouts/DashboardUser';
import Register from './components/screens/Register';
import LoginOrRegister from './components/screens/LoginOrRegister';
import RegisterIncome from "./components/screens/RegisterIncome";
import RegisterDebt from "./components/screens/RegisterDebt";
import RegisterCost from "./components/screens/RegisterCost";
import Budgeting from "./components/screens/Budgeting";
import Reminder from "./components/screens/Reminder";
import ListIncome from "./components/screens/ListIncome";
import ListCost from "./components/screens/ListCost";
import ListDebt from "./components/screens/ListDebt";
import ResetPassword from "./components/screens/ResetPassword";
import Profile from "./components/screens/Profile";
import AdvancedSearch from "./components/screens/AdvancedSearch";
import ReportCategory from "./components/screens/ReportCategory";

import {connect} from 'react-redux';
const RootStack = createStackNavigator({
        Splash: {screen: Splash,navigationOptions: ({navigation}) => ({
            headerShown: false
            })},
        Home: {
            screen: Home,
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
        AdvancedSearch: {
            screen: AdvancedSearch,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Slider: {
            screen: Slider,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Login: {
            screen: Login,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Register: {
            screen: Register,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        LoginOrRegister: {
            screen: LoginOrRegister,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        DashboardUser: {
            screen: DashboardUser,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        RegisterIncome: {
            screen: RegisterIncome,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        RegisterDebt: {
            screen: RegisterDebt,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        RegisterCost: {
            screen: RegisterCost,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Budgeting: {
            screen: Budgeting,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Reminder: {
            screen: Reminder,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        SendMessage: {
            screen: SendMessage,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ResetPassword: {
            screen: ResetPassword,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ListDebt: {
            screen: ListDebt,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ListCost: {
            screen: ListCost,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        ListIncome: {
            screen: ListIncome,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({navigation}) => ({
                headerShown: false
            })
        },
    },
    {
        initialRouteName: 'Splash',
    },
    {
        defaultNavigationOptions: {headerShown: false}
    }
);

const mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,
    };
};
export default connect(mapStateToProps)(createAppContainer(RootStack));
// export default createAppContainer(RootStack);
