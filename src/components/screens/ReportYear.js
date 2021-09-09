
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    Image
} from 'react-native';
import {  Tab, Tabs, TabHeading, } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  SafeAreaView } from 'react-navigation';
import { PieChart } from 'react-native-charts-wrapper';
import {connect} from 'react-redux';
class ReportYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.dataLogin['id'],
            resultIncome: [],
            sumOfIncome: 0,
            AvgOfDayIncome: 0,
            AvgOfDayCost:0,
            sumOfCost: 0,
            year: '',
            legend: {
                enabled: true,
                textSize: 15,
                direction: 'RIGHT_TO_LEFT',
                horizontalAlignment: 'CENTER',
                verticalAlignment: 'BOTTOM',
                orientation: 'HORIZONTAL',
                wordWrapEnabled: true,
            },
            xx: [{label: '', value: 0}],
            data: {},
            marker: {},

            xAxis: {},
            yAxis: {},

            dataCost: {},

            highlights: [{x: 50}],
            description: {
                text: '',
                textSize: 15,
                textColor: processColor('darkgray'),

            },

        };

    }

    handleSelect(event) {
        let entry = event.nativeEvent;
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null});
        } else {
            this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
        }

        console.log(event.nativeEvent);
    }

    getDate() {


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
        fetch('http://194.5.175.25:2000/api/v1/reportYearIncome/' +this.state.user_id , {
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

                if (responseJson.success === true) {
                    let count = responseJson.data.length;
                    for (var i = 0; i < count; i++) {
                        console.log(responseJson.data[i].sum);
                        this.state.sumOfIncome += responseJson.data[i].sum;
                        x.push({label: responseJson.data[i]._id, value: responseJson.data[i].sum});
                    }
                    this.setState({ AvgOfDayIncome: this.state.sumOfIncome/365})
                    this.setState({
                        data: {
                            dataSets: [{
                                values: x,
                                label: '',
                                config: {
                                    colors: [processColor('#66d808'), processColor('#c6b807'), processColor('#ffdc2e'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                                    valueTextSize: 16,
                                    valueTextColor: processColor('green'),
                                    sliceSpace: 1,
                                    selectionShift: 0,
                                    form: 'SQUARE',
                                    // xValuePosition: "OUTSIDE_SLICE",
                                    // yValuePosition: "OUTSIDE_SLICE",
                                    valueFormatter: '#.#\'%\'',
                                    valueLineColor: processColor('green'),
                                    valueLinePart1Length: 0.80,
                                },
                            }],

                        },
                    });
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

                if (responseJson.success === true) {
                    let count = responseJson.data.length;
                    for (var i = 0; i < count; i++) {
                        console.log(responseJson.data[i].sum);
                        this.state.sumOfCost += responseJson.data[i].sum;
                        x.push({label: responseJson.data[i]._id, value: responseJson.data[i].sum});

                    }
                    this.setState({ AvgOfDayCost: this.state.sumOfCost/365})

                    this.setState({
                        dataCost: {
                            dataSets: [{
                                values: x,
                                label: '',
                                config: {
                                    colors: [processColor('#66d808'), processColor('#c6b807'), processColor('#ffdc2e'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                                    valueTextSize: 16,
                                    valueTextColor: processColor('green'),
                                    sliceSpace: 1,
                                    selectionShift: 0,
                                    form: 'SQUARE',
                                    // xValuePosition: "OUTSIDE_SLICE",
                                    // yValuePosition: "OUTSIDE_SLICE",
                                    valueFormatter: '#.#\'%\'',
                                    valueLineColor: processColor('green'),
                                    valueLinePart1Length: 0.80,
                                },
                            }],

                        },
                    });
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
        this.displayIncome();this.displayCost()
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <LinearGradient
                    style={styles.header}
                    start={{ x: 0.3, y: 0.0 }} end={{ x: 0.5, y: 1.0 }}
                    locations={[0.1, 0.6, 0.9]}
                    colors={['#3e843d', '#3ede30', '#47b03e']}>
                    <View style={styles.headerContent}>

                        <Text style={{ fontSize: 18, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>
                            گزارشات سالانه
                        </Text>
                    </View>
                </LinearGradient>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#3ede30', height: 3 }} initialPage={1}>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#fff' }}>

                        <Text style={{ color: 'green', fontFamily: 'Vazir-Black', marginRight: 7 }}>هزینه ها</Text>
                        <Image style={{
                            width: 30,
                            height:30,
                            marginLeft:10
                        }} source={require('../../../assets/images/icons/coin.png')} />
                    </TabHeading>}>
                        <View style={{ flex: 1, backgroundColor: '#DCDCDC', }}>
                            <Card style={styles.cardStyle}>


                                <PieChart
                                    style={styles.chart}
                                    logEnabled={true}
                                    chartBackgroundColor={processColor('#FFF')}

                                    chartDescription={this.state.description}
                                    data={this.state.dataCost}
                                    legend={this.state.legend}
                                    highlights={this.state.highlights}

                                    entryLabelColor={processColor('green')}
                                    entryLabelTextSize={16}
                                    drawEntryLabels={false}

                                    rotationEnabled={true}
                                    rotationAngle={45}
                                    usePercentValues={true}
                                    styledCenterText={{text: 'نمودار', color: processColor('pink'), size: 15}}
                                    centerTextRadiusPercent={100}
                                    holeRadius={40}
                                    holeColor={processColor('#fF4500')}
                                    transparentCircleRadius={50}
                                    transparentCircleColor={processColor('#f0f0f088')}
                                    maxAngle={360}
                                    onSelect={this.handleSelect.bind(this)}
                                    onChange={(event) => console.log(event.nativeEvent)}
                                />
                            </Card>
                            <View style={{ flex: 1, marginTop: 10 }}>



                                <Card style={{ marginTop: 10, paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff', height: 55, marginHorizontal: 10 }} key={0}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3, marginTop: 17, alignItems: 'flex-start', paddingLeft: 8 }}>

                                            <Text style={{ fontSize: 14,color: 'red',fontFamily: 'IRANSansMobile' }}> {this.state.sumOfIncome}</Text>

                                        </View>
                                        <View style={{ flex: 3, marginTop: 12 }}>
                                            <Text>جمع کل هزینه ها :</Text>


                                        </View>
                                    </View>

                                </Card>
                                <Card style={{ marginTop: 10, paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff', height: 55, marginHorizontal: 10 }} key={0}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 3, marginTop: 17, alignItems: 'flex-start', paddingLeft: 8 }}>

                                            <Text style={{ fontSize: 14,color: 'red',fontFamily: 'IRANSansMobile' }}> {this.state.AvgOfDayCost}<Text style={{ fontSize: 14, color: '#777777', fontFamily: 'IRANSansMobile(FaNum)' }}></Text></Text>

                                        </View>
                                        <View style={{ flex: 3, marginTop: 12 }}>

                                            <Text> میانگین هزینه ها در روز  : </Text>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        </View>

                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#fff' }}>
                        <Text style={{ color: '#3e843d',fontFamily: 'Vazir-Black', marginRight: 7 }}> درآمدها</Text>
                        <Image style={{
                            width: 30,
                            height:30,
                            marginLeft:10
                        }} source={require('../../../assets/images/icons/incom.png')} />
                    </TabHeading>}>
                        <View style={{ flex: 1, backgroundColor: '#DCDCDC', }}>
                            <Card style={styles.cardStyle}>

                                <PieChart
                                    style={styles.chart}
                                    logEnabled={true}
                                    chartBackgroundColor={processColor('#FFF')}

                                    chartDescription={this.state.description}
                                    data={this.state.data}
                                    legend={this.state.legend}
                                    highlights={this.state.highlights}

                                    entryLabelColor={processColor('red')}
                                    entryLabelTextSize={16}
                                    drawEntryLabels={false}

                                    rotationEnabled={true}
                                    rotationAngle={45}
                                    usePercentValues={true}
                                    styledCenterText={{ text: 'نمودار', color: processColor('pink'), size: 15 }}
                                    centerTextRadiusPercent={100}
                                    holeRadius={40}
                                    holeColor={processColor('#fF4500')}
                                    transparentCircleRadius={50}
                                    transparentCircleColor={processColor('#f0f0f088')}
                                    maxAngle={360}
                                    onSelect={this.handleSelect.bind(this)}
                                    onChange={(event) => console.log(event.nativeEvent)}
                                />
                            </Card>
                            <View style={{ flex: 1, marginTop: 10 }}>



                                <Card style={{ marginTop: 10, paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff', height: 55, marginHorizontal: 10 }} key={0}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3, marginTop: 17, alignItems: 'flex-start', paddingLeft: 8 }}>

                                            <Text style={{ fontSize: 14, color: 'green', fontFamily: 'IRANSansMobile(FaNum)' }}> {this.state.sumOfIncome}</Text>

                                        </View>
                                        <View style={{ flex: 3, marginTop: 12 }}>
                                            <Text> جمع کل درآمدها :</Text>


                                        </View>
                                    </View>

                                </Card>
                                <Card style={{ marginTop: 10, paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff', height: 55, marginHorizontal: 10 }} key={0}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 3, marginTop: 17, alignItems: 'flex-start', paddingLeft: 8 }}>

                                            <Text style={{ fontSize: 14, color: 'green', fontFamily: 'IRANSansMobile(FaNum)' }}> {this.state.AvgOfDayIncome}</Text>

                                        </View>
                                        <View style={{ flex: 3, marginTop: 12 }}>

                                            <Text style={{fontSize: 14,fontFamily: 'IRANSansMobile(FaNum)' }}> میانگین درآمد در روز : </Text>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        </View>
                    </Tab>
                </Tabs>

            </SafeAreaView>
        );
    }
}
const  mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,

    };
};
export default connect(mapStateToProps)(ReportYear);
const styles = StyleSheet.create({

    chart: {
        flex: 1,
        marginTop: 5,
        borderRadius: 10,

    },
    header: {
        backgroundColor: '#3d933c',
    },
    headerContent: {
        padding: 45,
        alignItems: 'center',
    },
    cardStyle: {

        marginTop: 10, paddingRight: 10, paddingLeft: 10, backgroundColor: '#fff', marginHorizontal: 10, height: 200,

    },


});

