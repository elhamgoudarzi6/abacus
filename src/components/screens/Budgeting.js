import React, {Component, useState} from 'react';
import {CardItem, Input, Item, Label, View} from 'native-base';
import {StatusBar, StyleSheet, Alert, Image, TouchableOpacity} from 'react-native';
import {Text, ScrollView,Modal} from 'react-native';
import {Card, List, Content, ListItem, Left, Body, Right, Title, Button} from 'native-base';
import {FlatGrid} from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
 import Header from '../layouts/Header';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Divider} from 'react-native-paper';
 import {connect} from 'react-redux';
import Select2 from 'react-native-select-two';
class BudgetingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisibleicon:false,
           user_id: this.props.dataLogin['id'],
            userSelected: [],
            dataSource: [],
            isLoading: true,
            //*******
            selectedItems: [],
            amount_cost: '',
            category_cost: '',
            sub_category_cost: '',
            category_name:'',
            categoryCost: [],
            icon_cost: '',
            data: [
                {id: 1, icon: 'coffee'},
                {id: 2, icon: 'shopping-basket'},
                {id: 3, icon: 'car'},
                {id: 4, icon: 'home'},
                {id: 5, icon: 'wifi'},
                {id: 6, icon: 'user'},
                {id: 7, icon: 'phone'},
                {id: 8, icon: 'bicycle'},
                {id: 9, icon: 'mortar-board'},
                {id: 10, icon: 'apple'},
                {id: 11, icon: 'cutlery'},
                {id: 12, icon: 'plane'},
            ],
        };
        this.ShowBudgetRecord();
        this.getCategoryCost();
    };

    componentDidMount(): void {
        this.ShowBudgetRecord();
    }
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        this.ShowBudgetRecord();
    }
    clearInputText(){
        setTimeout(() => {
            // this._categorybudget.setNativeProps({ text: '' });
            // this._textInputAmount.setNativeProps({ text: '' });
            this.setState({sub_category_cost:''});
            // this.setState({amount_Cost:''});
        },2);
    }
    clickEventListener = () => {
        this.setModalVisible(true);
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    clickEventListenericon = () => {
        this.setModalVisibleicon(true);
    }
    setModalVisibleicon(visible) {
        this.setState({modalVisibleicon: visible});
    }

    //  .................delete..........................
    DeleteRecord = (item) => {
        let id;
        id = item._id;
        fetch('http://194.5.175.25:2000/api/v1/budget/' + id, {
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
                console.log(responseJson.data);
            }).catch((error) => {
            console.error(error);
        });
    }

    ShowBudgetRecord = () => {
        fetch('http://194.5.175.25:2000/api/v1/budget/' + this.state.user_id)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });

    };
    // .............. Registerbudget..............
    UserRegistrbudeget = () => {
//         console.log("amount_cost=" +this.state.amount_cost);
// console.log("category_name=" +this.state.category_name);
// console.log("icon_cost="+ this.state.icon_cost);

        if(this.state.amount_cost=="" ||this.state.category_name==""|| this.state.icon_cost==""){
            Alert.alert('','لطفا اطلاعات را کامل وارد نمایید',
                [
                    {text: 'تایید'}]
            );
        }
        else {
            fetch('http://194.5.175.25:2000/api/v1//budget', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id:this.state.user_id,
                    amount: this.state.amount_cost,
                    category: this.state.category_name,
                    //sub_category: this.state.sub_category_cost,
                    icon: this.state.icon_cost,
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    Alert.alert(
                        '',
                        'بودجه با موفقیت ثبت شد',
                        [
                            {text: 'تایید'}]);
                    // Alert.alert(responseJson.data);
                    this.setModalVisible(false);
                    this.clearInputText();
                }).catch((error) => {
                console.error(error);
            });
        }
    };



    // findParent = (itemId) => {
    //     const { categoryCost } = this.state
    //     let match = false
    //     categoryCost.forEach((item) => {
    //         item.children &&
    //         item.children.filter(({ id }) => {
    //             if (id === itemId) {
    //                 match = item.name
    //             }
    //         })
    //     })
    //     this.setState({category_name_cost:match})
    //     // alert(match)
    // }
    // onSelectedItemsChange = (selectedItems) => {
    //     this.setState({selectedItems});
    //     // alert(selectedItems)
    //
    // };
    //
    // onSelectedItemObjectsChange = (selectedItems) => {
    //     this.setState({sub_category_cost: selectedItems[0]['name']})
    //     this.findParent(selectedItems[0]['id'])
    //     // alert(selectedItems[0]['id'])
    //     // console.log(selectedItems);
    //
    // }

    //................getCategoryCost.........
    getCategoryCost() {

        let url = 'http://194.5.175.25:2000/api/v1/categorycost/' +this.state.user_id;
        fetch(url, {
            method: 'GET',
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.success === true) {
                for (var i = 0; i < responseJson.data.length; i++) {
                    if (responseJson.data[i]['SubCategoryCost'].length > 0) {
                        let resultSubcategory = responseJson.data[i]['SubCategoryCost'];
                        let childrenCategory = [];
                        for (var j = 0; j < responseJson.data[i]['SubCategoryCost'].length; j++) {
                            childrenCategory.push({
                                name: resultSubcategory[j]['sub_category'],
                                id: resultSubcategory[j]['_id'],
                            });
                        }
                        this.state.categoryCost.push({
                            name: responseJson.data[i]['category_name'],
                            id: responseJson.data[i]['_id'],
                            children: childrenCategory,
                        });
                    } else {
                        this.state.categoryCost.push({
                            name: responseJson.data[i]['category_name'],
                            id: responseJson.data[i]['_id'],
                        });
                    }
                }

            } else {
                console.log(responseJson.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // onSelectedItemsChange = (selectedItems) => {
    //     this.setState({selectedItems});
    // };

    // onSelectedItemObjectsChange = (selectedItems) => {
    //    // this.setState({sub_category_cost: selectedItems[0]['name']});
    //     this.setState({category_cost: selectedItems[0]['name']});
    //     console.log(selectedItems);
    // };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'/>
                 <Header title={'بودجه بندی'} onBackPress={() => {
                    this.props.navigation.goBack();
                }}/>
                <View style={{flex: 1}}>
                    <FlatGrid
                        itemDimension={300}
                        items={this.state.dataSource}
                        style={{marginTop: 3, marginHorizontal: -10}}
                        renderItem={({item, index}) => (
                            <ListItem icon>
                                <Left>
                                    <Button style={{backgroundColor: '#00C851'}}>
                                        <Icon active style={{fontSize: 16, color: '#fff'}} name={item.icon}/>
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={{
                                        textAlign: 'left',
                                        fontFamily: 'IRANSansMobile(FaNum)',
                                    }}>{item.category}</Text>
                                </Body>
                                <Right>
                                    <Text style={{
                                        fontFamily: 'IRANSansMobile(FaNum)',
                                        color: '#333',
                                    }}>{[item.amount, ' تومان']}

                                    </Text>
                                    <TouchableOpacity style={{ marginLeft: 40, marginTop: 2 }}
                                                      onPress={() => { Alert.alert(
                                                          'هشدار حذف',
                                                          'آیا برای حذف اطمینان دارید؟',
                                                          [
                                                              {text: 'لغو'},
                                                              {text: 'بله', onPress: () => { this.DeleteRecord(item)}},
                                                          ],
                                                      ) }}
                                    >
                                        <Icon active name="trash" style={{ fontSize: 20, color: '#888', alignSelf: 'flex-end' }} />
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>

                        )}/>

                </View>

                <Button iconLeft full style={{backgroundColor: '#47b03e'}}
                        onPress={() => { this.clickEventListener() }}>

                    <Text style={{color: '#fff', fontSize: 19, fontFamily: 'IRANSansMobile(FaNum)'}}>
                        تعریف بودجه </Text>
                    <Icon name='plus-circle'
                          style={{marginLeft: 30, fontSize: 27, color: '#fff', backgroundColor: '#47b03e'}}/>
                </Button>

                <Modal
                    animationType={'center'}
                    transparent={true}
                    position={'center'}
                    coverScreen={true}
                    //onRequestClose={() => this.setModalVisible(false)}
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
                            <Text style={{ fontSize: 18, color: '#fff', marginBottom: 5,  fontFamily: 'Vazir-Black' }}>تعریف بودجه جدید</Text>
                            <Button transparent style={{  color: '#fff', marginRight: -20 }} >
                                <Icon name='close' style={{ fontSize: 25, color: '#fff', marginRight: 20 }} onPress={() => { this.setModalVisible(false) }} />
                            </Button>
                        </View>
                    </LinearGradient>
                    <View style={styles.popupOverlay}>
                        <View style={styles.popup}>
                            <View style={styles.popupContent}>
                                <ScrollView contentContainerStyle={styles.modalInfo}>
                                    <View style={styles.container}>
                                        <CardItem cardBody style={{marginTop: 10}}>
                                            {/* <Image source={require('../../../assets/images/icons/818203.png')}
                                                       style={{height: 200, flex: 1}}/> */}

                                        </CardItem>
                                        <View style={{
                                            borderStyle: 'solid',
                                            borderWidth: 1.5,
                                            borderColor: '#00C851',
                                            borderRadius: 10,
                                            marginHorizontal: 10,
                                            marginTop: 20,
                                        }}>
                                            <Card>
                                                {/*<SectionedMultiSelect*/}
                                                {/*    itemFontFamily={{fontWeight: 'bold'}}*/}
                                                {/*    subItemFontFamily={{fontWeight: 'bold', color: '#555'}}*/}
                                                {/*    items={this.state.categoryCost}*/}
                                                {/*    confirmText={{*/}
                                                {/*        fontSize: 50,*/}
                                                {/*        fontFamily: 'IRANSansMobile(FaNum)',*/}
                                                {/*        backgroundColor: 'green',*/}
                                                {/*    }}*/}
                                                {/*    colors={{primary: '#47b03e'}}*/}
                                                {/*    single={true}*/}
                                                {/*    showChips={true}*/}
                                                {/*    uniqueKey='id'*/}
                                                {/*    subKey='children'*/}
                                                {/*    selectText='دسته مورد نظر خود را انتخاب نمائيد'*/}
                                                {/*    showDropDowns={true}*/}
                                                {/*    readOnlyHeadings={true}*/}
                                                {/*    confirmText="بستن"*/}
                                                {/*    text="#2e2e2e"*/}
                                                {/*    numberOfLines="3"*/}
                                                {/*    success="green"*/}
                                                {/*    searchPlaceholderText="جستجو"*/}
                                                {/*    onSelectedItemsChange={this.onSelectedItemsChange}*/}
                                                {/*    selectedItems={this.state.selectedItems}*/}
                                                {/*    onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}*/}
                                                {/*/>*/}


                                                <View >
                                                    <Select2
                                                        style={{
                                                            justifyContent: 'center',
                                                            borderRadius: 5,
                                                            height: 48,
                                                            width: '100%',
                                                            marginRight: 8,

                                                        }}
                                                        isSelectSingle={true}
                                                        colorTheme='#3d933c'
                                                        popupTitle="دسته مورد نظر را انتخاب کنید"
                                                        cancelButtonText="انصراف"
                                                        selectButtonText="تایید"
                                                        title="دسته مورد نظر را انتخاب کنید"
                                                        searchPlaceHolderText="جستجو حساب"
                                                        data={this.state.categoryCost}
                                                        onSelect={categoryCost => {
                                                            for (var i = 0; i < this.state.categoryCost.length; i++) {

                                                                if (this.state.categoryCost[i]['id'] == categoryCost) {
                                                                    //   Alert.alert(this.state.acount[i]['name'])
                                                                    this.setState({ category_name: this.state.categoryCost[i]['name'] });

                                                                }
                                                            }
                                                        }}
                                                    />
                                                </View>



                                                <Divider/>
                                                <CardItem>
                                                    <Body>
                                                        <Item fixedLabel>
                                                            <Left>

                                                                <View style={{flex: 1, marginTop: 10, marginLeft: 10}}>
                                                                    <Text style={{
                                                                        color: '#777',
                                                                        fontFamily: 'IRANSansMobile(FaNum)',
                                                                    }}>تومان</Text>
                                                                </View>
                                                            </Left>
                                                            <Input style={{color: '#777', fontFamily: 'IRANSansMobile(FaNum)'}}
                                                                   onChangeText={amount => this.setState({amount_cost: amount})}

                                                            />
                                                            <Label><Text style={{
                                                                color: '#777',
                                                                fontFamily: 'IRANSansMobile(FaNum)',
                                                                paddingRight: 20,
                                                            }}>هزینه :</Text></Label>

                                                        </Item>
                                                    </Body>
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <Item fixedLabel style={{height: 50}}
                                                              onPress={() => this.clickEventListenericon()}>
                                                            <View style={{
                                                                flex: 1,
                                                                marginTop: 10,
                                                                flexDirection: 'row',
                                                                alignItems: 'flex-end',
                                                                justifyContent: 'flex-end',
                                                            }}>
                                                                <Text style={{
                                                                    color: '#777',
                                                                    fontFamily: 'IRANSansMobile(FaNum)',
                                                                }}></Text>
                                                                <Label><Text style={{
                                                                    color: '#555',
                                                                    fontFamily: 'IRANSansMobile(FaNum)',
                                                                    fontSize: 14,
                                                                    textAlign: 'right',
                                                                }}>ایکن را انتخاب کنید :{this.state.icon_cost}</Text></Label>
                                                            </View>
                                                        </Item>
                                                    </Body>
                                                </CardItem>
                                                <CardItem footer style={{justifyContent: 'flex-end'}}>
                                                    <Text style={{fontFamily: 'IRANSansMobile(FaNum)'}}>بودجه بندی به صورت ماهانه می
                                                        باشد</Text>
                                                </CardItem>
                                                <Button iconRight full style={{backgroundColor: '#47b03e'}}
                                                        onPress={this.UserRegistrbudeget}>
                                                    <Text style={{
                                                        color: '#fff',
                                                        fontSize: 19,
                                                        fontFamily: 'IRANSansMobile(FaNum)',
                                                    }}> ثبت
                                                        بودجه</Text>
                                                    <Icon name='plus-circle' style={{
                                                        marginLeft: 30,
                                                        fontSize: 27,
                                                        color: '#fff',
                                                        backgroundColor: '#47b03e',
                                                    }}/>
                                                </Button>
                                            </Card>

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <Modal
                        animationType={'center'}
                        transparent={true}
                        position={'center'}
                        coverScreen={true}
                        //onRequestClose={() => this.setModalVisible(false)}
                        visible={this.state.modalVisibleicon}>
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
                                <Text style={{ fontSize: 18, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>انتخاب آیکن</Text>
                                <Button transparent style={{  color: '#fff', marginRight: -20 }} >
                                    <Icon name='close' style={{ fontSize: 25, color: '#fff', marginRight: 20 }} onPress={() => { this.setModalVisibleicon(false) }} />
                                </Button>
                            </View>
                        </LinearGradient>
                        <View style={styles.popupOverlay}>
                            <View style={styles.popup}>
                                <View style={styles.popupContent}>
                                    <ScrollView contentContainerStyle={styles.modalInfo}>
                                        <FlatGrid
                                            itemDimension={70}
                                            items={this.state.data}
                                            style={styles.gridView}
                                            renderItem={({item, index}) => (
                                                <View style={styles.view}>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({icon_cost: item.icon}, this.setModalVisibleicon(false))}>
                                                        <FontAwesomeIcon style={{fontSize: 20}} name={item.icon}/>
                                                    </TouchableOpacity>
                                                </View>
                                            )}/>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Modal>


                {/*<Modal*/}
                {/*    swipeToClose={false}*/}
                {/*    style={[styles.modal]}*/}
                {/*    position={'center'}*/}
                {/*    ref={'modal7'}*/}
                {/*    coverScreen={true}>*/}
                {/*    <LinearGradient*/}
                {/*        style={{width: '100%'}}*/}
                {/*        start={{x: 0.3, y: 0.0}} end={{x: 0.5, y: 1.0}}*/}
                {/*        locations={[0.1, 0.6, 0.9]}*/}
                {/*        colors={['#3e843d', '#3ede30', '#47b03e']}>*/}
                {/*        <View style={{*/}
                {/*            paddingVertical: 7,*/}
                {/*            alignItems: 'center'*/}
                {/*            , justifyContent: 'space-around',*/}
                {/*            flexDirection: 'row',*/}
                {/*        }}>*/}
                {/*            <Text></Text>*/}

                {/*            <Text style={{fontSize: 20, color: '#fff', marginBottom: 5, fontFamily: 'Far_Aref'}}>تعریف*/}
                {/*                بودجه </Text>*/}
                {/*            <Button transparent style={{color: '#fff', marginRight: -20}}*/}
                {/*                    onPress={() => this.refs.modal7.close()}>*/}
                {/*                <Icon name='close' style={{fontSize: 20, color: '#fff', marginRight: 20}} onPress={() => { this.setModalVisible(false) }}/>*/}
                {/*            </Button>*/}
                {/*        </View>*/}
                {/*    </LinearGradient>*/}
                {/*    <ScrollView>*/}
                {/*        <View style={styles.container}>*/}
                {/*            <CardItem cardBody style={{marginTop: 10}}>*/}
                {/*                <Image source={require('../../../assets/images/icons/818203.png')}*/}
                {/*                       style={{height: 200, flex: 1}}/>*/}

                {/*            </CardItem>*/}
                {/*            <View style={{*/}
                {/*                borderStyle: 'solid',*/}
                {/*                borderWidth: 1.5,*/}
                {/*                borderColor: '#00C851',*/}
                {/*                borderRadius: 10,*/}
                {/*                marginHorizontal: 10,*/}
                {/*                marginTop: 20,*/}
                {/*            }}>*/}
                {/*                <Card>*/}
                {/*                    <SectionedMultiSelect*/}
                {/*                        itemFontFamily={{fontWeight: 'bold'}}*/}
                {/*                        subItemFontFamily={{fontWeight: 'bold', color: '#555'}}*/}
                {/*                        items={this.state.categoryCost}*/}
                {/*                        confirmText={{*/}
                {/*                            fontSize: 50,*/}
                {/*                            fontFamily: 'IRANSansMobile(FaNum)',*/}
                {/*                            backgroundColor: 'green',*/}
                {/*                        }}*/}
                {/*                        colors={{primary: '#47b03e'}}*/}
                {/*                        single={true}*/}
                {/*                        showChips={true}*/}
                {/*                        uniqueKey='id'*/}
                {/*                        subKey='children'*/}
                {/*                        selectText='دسته مورد نظر خود را انتخاب نمائيد'*/}
                {/*                        showDropDowns={true}*/}
                {/*                        readOnlyHeadings={true}*/}
                {/*                        confirmText="بستن"*/}
                {/*                        text="#2e2e2e"*/}
                {/*                        numberOfLines="3"*/}
                {/*                        success="green"*/}
                {/*                        searchPlaceholderText="جستجو"*/}
                {/*                        onSelectedItemsChange={this.onSelectedItemsChange}*/}
                {/*                        selectedItems={this.state.selectedItems}*/}
                {/*                        onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}*/}
                {/*                    />*/}
                {/*                    <Divider/>*/}
                {/*                    <CardItem>*/}
                {/*                        <Body>*/}
                {/*                            <Item fixedLabel>*/}
                {/*                                <Left>*/}

                {/*                                    <View style={{flex: 1, marginTop: 10, marginLeft: 10}}>*/}
                {/*                                        <Text style={{*/}
                {/*                                            color: '#777',*/}
                {/*                                            fontFamily: 'IRANSansMobile(FaNum)',*/}
                {/*                                        }}>تومان</Text>*/}

                {/*                                    </View>*/}
                {/*                                </Left>*/}
                {/*                                <Input style={{color: '#777', fontFamily: 'IRANSansMobile(FaNum)'}}*/}
                {/*                                       onChangeText={amount => this.setState({amount_cost: amount})}*/}

                {/*                                />*/}
                {/*                                <Label><Text style={{*/}
                {/*                                    color: '#777',*/}
                {/*                                    fontFamily: 'IRANSansMobile(FaNum)',*/}
                {/*                                    paddingRight: 20,*/}
                {/*                                }}>هزینه :</Text></Label>*/}
                {/*                            </Item>*/}
                {/*                        </Body>*/}
                {/*                    </CardItem>*/}
                {/*                    <CardItem>*/}
                {/*                        <Body>*/}
                {/*                            <Item fixedLabel style={{height: 50}}*/}
                {/*                                  onPress={() => this.refs.modal6.open()}>*/}
                {/*                                <View style={{*/}
                {/*                                    flex: 1,*/}
                {/*                                    marginTop: 10,*/}
                {/*                                    flexDirection: 'row',*/}
                {/*                                    alignItems: 'flex-end',*/}
                {/*                                    justifyContent: 'flex-end',*/}
                {/*                                }}>*/}
                {/*                                    <Text style={{*/}
                {/*                                        color: '#777',*/}
                {/*                                        fontFamily: 'IRANSansMobile(FaNum)',*/}
                {/*                                    }}></Text>*/}
                {/*                                    <Label><Text style={{*/}
                {/*                                        color: '#555',*/}
                {/*                                        fontFamily: 'IRANSansMobile(FaNum)',*/}
                {/*                                        fontSize: 14,*/}
                {/*                                        textAlign: 'right',*/}
                {/*                                    }}>ایکن را انتخاب کنید :{this.state.icon_cost}</Text></Label>*/}
                {/*                                </View>*/}
                {/*                            </Item>*/}
                {/*                        </Body>*/}
                {/*                    </CardItem>*/}
                {/*                    <CardItem footer style={{justifyContent: 'flex-end'}}>*/}
                {/*                        <Text style={{fontFamily: 'IRANSansMobile(FaNum)'}}>بودجه بندی به صورت ماهانه می*/}
                {/*                            باشد</Text>*/}
                {/*                    </CardItem>*/}
                {/*                    <Button iconRight full style={{backgroundColor: '#47b03e'}}*/}
                {/*                            onPress={this.UserRegistrbudeget}>*/}
                {/*                        <Text style={{*/}
                {/*                            color: '#fff',*/}
                {/*                            fontSize: 19,*/}
                {/*                            fontFamily: 'IRANSansMobile(FaNum)',*/}
                {/*                        }}> ثبت*/}
                {/*                            بودجه</Text>*/}
                {/*                        <Icon name='plus-circle' style={{*/}
                {/*                            marginLeft: 30,*/}
                {/*                            fontSize: 27,*/}
                {/*                            color: '#fff',*/}
                {/*                            backgroundColor: '#47b03e',*/}
                {/*                        }}/>*/}
                {/*                    </Button>*/}
                {/*                </Card>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </ScrollView>*/}
                {/*    <Modal*/}
                {/*        swipeToClose={false}*/}
                {/*        style={[styles.modal]}*/}
                {/*        position={'center'}*/}
                {/*        ref={'modal6'}*/}
                {/*        coverScreen={true}>*/}
                {/*        <LinearGradient*/}
                {/*            style={{width: '100%'}}*/}
                {/*            start={{x: 0.3, y: 0.0}} end={{x: 0.5, y: 1.0}}*/}
                {/*            locations={[0.1, 0.6, 0.9]}*/}
                {/*            colors={['#3e843d', '#3ede30', '#47b03e']}>*/}
                {/*            <View style={{*/}
                {/*                paddingVertical: 7,*/}
                {/*                alignItems: 'center'*/}
                {/*                , justifyContent: 'space-around',*/}
                {/*                flexDirection: 'row',*/}
                {/*            }}>*/}
                {/*                <Text></Text>*/}

                {/*                <Text style={{fontSize: 20, color: '#fff', marginBottom: 5, fontFamily: 'Far_Aref'}}>لیست*/}
                {/*                    آیکن ها </Text>*/}
                {/*                <Button transparent style={{color: '#fff', marginRight: -20}}*/}
                {/*                        onPress={() => this.refs.modal6.close()}>*/}
                {/*                    <Icon name='close' style={{fontSize: 30, color: '#fff', marginRight: 20}}/>*/}
                {/*                </Button>*/}
                {/*            </View>*/}
                {/*        </LinearGradient>*/}
                {/*        <ScrollView>*/}
                {/*            <FlatGrid*/}
                {/*                itemDimension={70}*/}
                {/*                items={this.state.data}*/}
                {/*                style={styles.gridView}*/}
                {/*                renderItem={({item, index}) => (*/}
                {/*                    <View style={styles.view}>*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={() => this.setState({icon_cost: item.icon}, this.refs.modal6.close())}>*/}
                {/*                            <FontAwesomeIcon style={{fontSize: 20}} name={item.icon}/>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    </View>*/}
                {/*                )}/>*/}
                {/*        </ScrollView>*/}
                {/*    </Modal>*/}

                {/*</Modal>*/}

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,

    };
};
export default connect(mapStateToProps)(BudgetingScreen);
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#3d933c',
    },
    headerContent: {
        padding: 50,
        alignItems: 'center',
    },
    gridView: {
        marginTop: 60,
        flex: 1,
    },
    view: {

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 15,
        padding: 10,
        height: 110,
        alignItems: 'center',
        flex: 1,
        borderColor: '#3d933c',
        borderWidth: 1.5,
        shadowColor: '#808080',
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
    icon: {
        width: 50,
        height: 50,
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
