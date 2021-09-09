import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, FlatList, TouchableOpacity, Alert, ScrollView, ImageBackground, StatusBar,Dimensions
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
export default class LoginOrRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showAlert: false,
            titles: '',

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
    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };

    render() {
        const {open} = this.state;
        return (
            <LinearGradient
                style={styles.header}
                start={{x: -0.3, y: 0.0}} end={{x: 0.5, y: 1.0}}
                locations={[0.1, 0.6, 0.9]}
                colors={['#3e843d', '#3ede30', '#47b03e']}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'/>
                    <View style={styles.headerContent}>
                        <Image style={{width: 90, height: 90}}
                               source={require('../../../assets/images/icons/abacus.png')}/>
                        <Text style={{
                        fontSize: 40,
                        color: '#fff',
                        fontFamily: 'Far_Aref'}}>
                        چرتکه
                    </Text>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff',
                            fontFamily: 'Vazir-Black',
                            marginTop:20
                        }}>
                            به اپ حسابداری شخصی چرتکه خوش آمدید
                        </Text>
                    </View>
                        <View style={{marginTop: 110}}>
                            <Button buttonStyle={{
                                marginVertical: 10,
                                backgroundColor: '#fff',
                                borderRadius: 30,
                                width: '100%',
                                height: 45,
                                shadowColor: '#43c164',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,
                                elevation: 5,
                            }}
                                    onPress={() => this.props.navigation.navigate('Login')}
                                    titleStyle={{color: 'green',fontFamily: 'Vazir-Black',fontSize:18}}
                                    title="ورود"
                            />
                            <Button buttonStyle={{
                                marginVertical: 10,
                                backgroundColor: '#fff',
                                borderRadius: 30,
                                width: '100%',
                                height: 45,
                                shadowColor: '#43c164',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,
                                elevation: 5,
                            }}
                                    onPress={() => this.props.navigation.navigate('Register')}
                                    titleStyle={{color: 'green',fontFamily: 'Vazir-Black',fontSize:18}}
                                    title="ثبت نام"
                            />
                        </View>
    </LinearGradient>

    );
    }
}


const styles = StyleSheet.create({
    header: {
        flex:1,
        backgroundColor: '#3d933c',
        padding: 60,
    },
    headerContent: {
        marginTop: 70,
        alignItems: 'center',

    },

    Detail: {
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 10,
        flexDirection: 'row',
        marginRight: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
            marginVertical: 5,
            marginRight: 16,
            marginBottom: 5,

        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 12,


    },
    detailContent: {
        margin: 10,
        alignItems: 'center',
    },


    /******** card **************/
    card: {
        shadowColor: '#474747',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: '#3d933c',
        //flexBasis: '42%',
        width: 90,
        height: 90,

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 1,
    },
    cardHeader: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 16,
        flex: 1,
        alignSelf: 'center',
        color: '#696969',
    },
});

