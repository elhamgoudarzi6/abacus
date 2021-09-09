import React, {Component, useState} from 'react';
import {StatusBar, StyleSheet, Image, ImageBackground, View} from 'react-native';
import {Text, ScrollView} from 'react-native';
import {
    CardItem,
    Tabs,
    Tab,
    ListItem,
    TabHeading,
    Button,
    Left,
    Body,
    Title,
    Right,
    Icon,
} from 'native-base';
import {FlatGrid} from 'react-native-super-grid';
import Header from '../layouts/Header';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhoneSquare} from '@fortawesome/free-solid-svg-icons/faPhoneSquare';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faCoins, faShoppingBasket, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faInbox} from '@fortawesome/free-solid-svg-icons/faInbox';
class ReportCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.dataLogin['id'],
            resultIncome: [],
            sumOfIncome: 0,
            sumOfCost: 0,
            dataSource: [],
            dataSourcincome: [],
            isLoading: true,
            year: '',
        };
    }

    displayIncome = () => {
        var week = new Array('يكشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه');
        var months = new Array('فروردين', 'ارديبهشت', 'خرداد', 'تير', 'مرداد', 'شهريور', 'مهر', 'آبان', 'آذر', 'دي', 'بهمن', 'اسفند');
        var today = new Date();
        var d = today.getDay();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getYear();
        year = (window.navigator.geolocation > 0) ? year : 1900 + year;
        if (year === 0) {
            year = 2000;
        }
        if (year < 100) {
            year += 1900;
        }
        var y = 1;
        for (var i = 0; i < 3000; i += 4) {
            if (year === i) {
                y = 2;
            }
        }
        for (var i = 1; i < 3000; i += 4) {
            if (year === i) {
                y = 3;
            }
        }
        if (y === 1) {
            year -= ((month < 3) || ((month === 3) && (day < 21))) ? 622 : 621;
            switch (month) {
                case 1:
                    (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                    break;
                case 2:
                    (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                    break;
                case 3:
                    (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
                    break;
                case 4:
                    (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                    break;
                case 5:
                case 6:
                    (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                    break;
                case 7:
                case 8:
                case 9:
                    (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                    break;
                case 10:
                    (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                    break;
                case 11:
                case 12:
                    (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                    break;
                default:
                    break;
            }
        }
        if (y === 2) {
            year -= ((month < 3) || ((month == 3) && (day < 20))) ? 622 : 621;
            switch (month) {
                case 1:
                    (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                    break;
                case 2:
                    (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                    break;
                case 3:
                    (day < 20) ? (month = 12, day += 10) : (month = 1, day -= 19);
                    break;
                case 4:
                    (day < 20) ? (month = 1, day += 12) : (month = 2, day -= 19);
                    break;
                case 5:
                    (day < 21) ? (month = 2, day += 11) : (month = 3, day -= 20);
                    break;
                case 6:
                    (day < 21) ? (month = 3, day += 11) : (month = 4, day -= 20);
                    break;
                case 7:
                    (day < 22) ? (month = 4, day += 10) : (month = 5, day -= 21);
                    break;
                case 8:
                    (day < 22) ? (month = 5, day += 10) : (month = 6, day -= 21);
                    break;
                case 9:
                    (day < 22) ? (month = 6, day += 10) : (month = 7, day -= 21);
                    break;
                case 10:
                    (day < 22) ? (month = 7, day += 9) : (month = 8, day -= 21);
                    break;
                case 11:
                    (day < 21) ? (month = 8, day += 10) : (month = 9, day -= 20);
                    break;
                case 12:
                    (day < 21) ? (month = 9, day += 10) : (month = 10, day -= 20);
                    break;
                default:
                    break;
            }
        }
        if (y === 3) {
            year -= ((month < 3) || ((month === 3) && (day < 21))) ? 622 : 621;
            switch (month) {
                case 1:
                    (day < 20) ? (month = 10, day += 11) : (month = 11, day -= 19);
                    break;
                case 2:
                    (day < 19) ? (month = 11, day += 12) : (month = 12, day -= 18);
                    break;
                case 3:
                    (day < 21) ? (month = 12, day += 10) : (month = 1, day -= 20);
                    break;
                case 4:
                    (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                    break;
                case 5:
                case 6:
                    (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                    break;
                case 7:
                case 8:
                case 9:
                    (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                    break;
                case 10:
                    (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                    break;
                case 11:
                case 12:
                    (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                    break;
                default:
                    break;
            }
        }
        this.setState({day: day});
        this.setState({year: year});
        this.setState({month: months[month - 1]});
        console.log(month - 1);
        let countMonth = month - 1;
        var monthNumber;
        if (countMonth < 10) {
            monthNumber = '0' + countMonth;
        }

        let x = [];
        fetch('http://194.5.175.25:2000/api/v1/reportYearIncome/' + this.state.user_id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: year.toString(),

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSourcincome: responseJson.data,
                });


                if (responseJson.success === true) {
                    let count = responseJson.data.length;
                    for (var i = 0; i < count; i++) {
                        console.log(responseJson.data[i].sum);
                        this.state.sumOfIncome += responseJson.data[i].sum;
                        x.push({label: responseJson.data[i]._id, value: responseJson.data[i].sum});
                    }

                }
            })
            .catch((error) => {
                console.error(error);
            });

        this.setState({
            xx: x,
        });
    };
    displayCost = () => {
        var week = new Array('يكشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه');
        var months = new Array('فروردين', 'ارديبهشت', 'خرداد', 'تير', 'مرداد', 'شهريور', 'مهر', 'آبان', 'آذر', 'دي', 'بهمن', 'اسفند');
        var today = new Date();
        var d = today.getDay();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getYear();
        year = (window.navigator.geolocation > 0) ? year : 1900 + year;
        if (year === 0) {
            year = 2000;
        }
        if (year < 100) {
            year += 1900;
        }
        var y = 1;
        for (var i = 0; i < 3000; i += 4) {
            if (year === i) {
                y = 2;
            }
        }
        for (var i = 1; i < 3000; i += 4) {
            if (year === i) {
                y = 3;
            }
        }
        if (y === 1) {
            year -= ((month < 3) || ((month === 3) && (day < 21))) ? 622 : 621;
            switch (month) {
                case 1:
                    (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                    break;
                case 2:
                    (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                    break;
                case 3:
                    (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
                    break;
                case 4:
                    (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                    break;
                case 5:
                case 6:
                    (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                    break;
                case 7:
                case 8:
                case 9:
                    (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                    break;
                case 10:
                    (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                    break;
                case 11:
                case 12:
                    (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                    break;
                default:
                    break;
            }
        }
        if (y === 2) {
            year -= ((month < 3) || ((month == 3) && (day < 20))) ? 622 : 621;
            switch (month) {
                case 1:
                    (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                    break;
                case 2:
                    (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                    break;
                case 3:
                    (day < 20) ? (month = 12, day += 10) : (month = 1, day -= 19);
                    break;
                case 4:
                    (day < 20) ? (month = 1, day += 12) : (month = 2, day -= 19);
                    break;
                case 5:
                    (day < 21) ? (month = 2, day += 11) : (month = 3, day -= 20);
                    break;
                case 6:
                    (day < 21) ? (month = 3, day += 11) : (month = 4, day -= 20);
                    break;
                case 7:
                    (day < 22) ? (month = 4, day += 10) : (month = 5, day -= 21);
                    break;
                case 8:
                    (day < 22) ? (month = 5, day += 10) : (month = 6, day -= 21);
                    break;
                case 9:
                    (day < 22) ? (month = 6, day += 10) : (month = 7, day -= 21);
                    break;
                case 10:
                    (day < 22) ? (month = 7, day += 9) : (month = 8, day -= 21);
                    break;
                case 11:
                    (day < 21) ? (month = 8, day += 10) : (month = 9, day -= 20);
                    break;
                case 12:
                    (day < 21) ? (month = 9, day += 10) : (month = 10, day -= 20);
                    break;
                default:
                    break;
            }
        }
        if (y === 3) {
            year -= ((month < 3) || ((month === 3) && (day < 21))) ? 622 : 621;
            switch (month) {
                case 1:
                    (day < 20) ? (month = 10, day += 11) : (month = 11, day -= 19);
                    break;
                case 2:
                    (day < 19) ? (month = 11, day += 12) : (month = 12, day -= 18);
                    break;
                case 3:
                    (day < 21) ? (month = 12, day += 10) : (month = 1, day -= 20);
                    break;
                case 4:
                    (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                    break;
                case 5:
                case 6:
                    (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                    break;
                case 7:
                case 8:
                case 9:
                    (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                    break;
                case 10:
                    (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                    break;
                case 11:
                case 12:
                    (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                    break;
                default:
                    break;
            }
        }
        this.setState({day: day});
        this.setState({year: year});
        this.setState({month: months[month - 1]});
        console.log(month - 1);
        let countMonth = month - 1;
        var monthNumber;
        if (countMonth < 10) {
            monthNumber = '0' + countMonth;
        }

        let x = [];
        fetch('http://194.5.175.25:2000/api/v1/reportYearCost/' + this.state.user_id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: year.toString(),
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                });

                if (responseJson.success === true) {
                    let count = responseJson.data.length;
                    for (var i = 0; i < count; i++) {
                        console.log(responseJson.data[i].sum);
                        this.state.sumOfCost += responseJson.data[i].sum;
                        x.push({label: responseJson.data[i]._id, value: responseJson.data[i].sum});

                    }
                    this.setState({AvgOfDayCost: this.state.sumOfCost / 365});


                }
            })
            .catch((error) => {
                console.error(error);
            });

        this.setState({
            xx: x,
        });
    };
    componentDidMount(): void {
        this.displayIncome();
        this.displayCost();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />
                <Header title={' گزارش براساس دسته ها'}/>

                <Tabs tabBarUnderlineStyle={{backgroundColor: '#3ede30', height: 3}} initialPage={1}>
                    <Tab heading={<TabHeading style={{backgroundColor: '#fff'}}>

                        <Text style={{
                            color: 'green',
                            fontFamily: 'Vazir-Black',
                            marginRight: 7,
                        }}>هزینه ها</Text>
                        <Image style={{width: 30, height: 30}}
                               source={require('../../../assets/images/icons/coin.png')}/>
                    </TabHeading>}>
                        <FlatGrid
                            itemDimension={200}
                            items={this.state.dataSource}
                            style={{marginTop: 3, marginHorizontal: 10}}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                            renderItem={({item, index}) => (
                                <ListItem icon>
                                    <Left>
                                        <Button style={{backgroundColor: '#00C851'}}>
                                            <FontAwesomeIcon icon={faShoppingBasket} size={20} style={{color: '#fff'}}/>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{
                                            textAlign: 'left',
                                            fontFamily: 'IRANSansMobile(FaNum)',
                                        }}>{item._id}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={{fontFamily: 'IRANSansMobile(FaNum)', color: '#00C851'}}>{[item.sum,'  تومان']}
                                            </Text>
                                    </Right>
                                </ListItem>
                            )}/>
                    </Tab>

                    <Tab heading={<TabHeading style={{backgroundColor: '#fff'}}>
                        <Text style={{
                            color: 'green',
                            fontFamily: 'Vazir-Black',
                            marginRight: 7,
                        }}> درآمدها</Text>
                        <Image style={{width: 30, height: 30}}
                               source={require('../../../assets/images/icons/incom.png')}/>

                    </TabHeading>}>
                        <FlatGrid
                            itemDimension={200}
                            items={this.state.dataSourcincome}
                            style={{marginTop: 3, marginHorizontal: 10}}
                            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                            renderItem={({item, index}) => (
                                <ListItem icon>
                                    <Left>
                                        <Button style={{backgroundColor: '#00C851'}}>
                                            <FontAwesomeIcon icon={faCoins} size={20} style={{color: '#fff'}}/>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text style={{
                                            textAlign: 'left',
                                            fontFamily: 'IRANSansMobile(FaNum)',
                                        }}>{item._id}</Text>
                                    </Body>
                                    <Right>
                                        <Text style={{fontFamily: 'IRANSansMobile(FaNum)', color: '#47b03e'}}>{[item.sum,'  تومان']}</Text>
                                    </Right>
                                </ListItem>
                            )}/>
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,
    };
};
export default connect(mapStateToProps)(ReportCategory);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent:'center'
    },
    header: {
        backgroundColor: '#3d933c',
    },

    headerContent: {
        padding: 50,
        alignItems: 'center',
    },
});

