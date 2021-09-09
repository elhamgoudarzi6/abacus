import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, StatusBar,BackHandler} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardUser from '../layouts/DashboardUser';
import LoginOrRegister from './LoginOrRegister';

const slides = [
    {
        key: 'one',
        title:' صفحه اصلي',
        text: 'با اپ چرتکه به راحتي هزينه هاي خود را مديريت کنيد',
        image: require('../../../assets/images/home.png'),
        bg: "#fff"
    },
    {
        key: 'two',
        title:'صفحه گزارشگيري',
        text: 'مي توانيد به روش هاي مختلف گزارشگيري کنيد',
        image: require('../../../assets/images/report.png'),
        bg: "#fff"
    },
    {
        key: 'three',
        title:' داشبرد اپ چرتکه',
        text: "در اين بخش امکانات مختلفي در اختيار شماس",
        image: require('../../../assets/images/menu.png'),
        bg: "#fff"
    },
];

export default class Slider extends React.Component {
    state = {
        showRealApp: false
    }

    componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    }
    backPressed = () => {
        let { routeName } = this.props.navigation.state;
        console.log("route is :  " + routeName);

        if (this.props.navigation.isFocused()) {
            console.log("ROUTE :  " + routeName);
            BackHandler.exitApp()
            return true;
        } else {
            return false;
        }
    };
    _renderItem = ({ item }) => {
        return (
            <View
                style={[
                    styles.slide,
                    {
                        backgroundColor: item.bg,
                    },
                ]}>

                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={{}}>
                    <Text style={styles.text}>{item.text}</Text>
                </View>

            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    _keyExtractor = (item) => item.title;
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-checkmark"
                    color="#fff"
                    size={35}
                />
            </View>
        );
    };
    render() {
        if (this.state.showRealApp) {
            // return <DashboardUser />;
            return <LoginOrRegister />;
        } else {
            return <AppIntroSlider
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onDone={this._onDone}
                    showPrevButton
                    showSkipButton
                    nextLabel="بعدي "
                    prevLabel='برگشت'
                    skipLabel="برگشت"
                    doneLabel='بعدي'
                    nextStyle={{backgroundColor:'red'}}
                    nextStyle
                    showDoneButton= {true}
                    renderDoneButton={this._renderDoneButton}
                    showNextButton= {false}
                    showPrevButton= {false}
                    showSkipButton= {false}
                    activeDotStyle= {{backgroundColor:'green',marginTop:30}}
                    dotStyle={{backgroundColor:'#3ede30',fontSize:20,marginTop:30}}
                    data={slides}
                />
        }
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor:"#fff",
    },
    image: {
        width: '90%',
        height:'80%',
        borderRadius:20,
        alignSelf:'center',
        marginTop:15,
        borderColor:'green',
        borderWidth:2
    },
    text: {
        color: '#555',
        textAlign: 'center',
        fontSize: 20,

    },
    title: {
        fontSize: 22,
        color: '#555',
        textAlign: 'center',
    },
    buttonCircle: {
        width: 60,
        height:35,
        backgroundColor: 'green',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:23
    },
});