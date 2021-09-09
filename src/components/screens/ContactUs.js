import React, {Component} from 'react';
import {Image, ImageBackground, ScrollView, Text, View} from "react-native";
import {List} from 'react-native-paper';
import {Icon} from "native-base";
import Header from "../layouts/Header";
import { Divider } from 'react-native-elements';
class ContactUs extends Component {
    render() {
        return (
            <View style={{flex: 1,borderBottomColor:'#777777',borderBottomWidth:2,borderStyle:'solid'}}>
                <Header title="تماس با ما" onBackPress={()=>{this.props.navigation.goBack()}}/>
                <Image
                    source={require('../../../assets/images/icons/818203.png')}
                    style={{width: '100%', height: '30%'}}
                    resizeMode="stretch"/>
                <ScrollView>
                    <View style={{flex: 1, fontFamily: 'IRANSansMobile(FaNum)', backgroundColor: '#fff'}}>
                        <Text style={{fontSize:16,fontFamily: 'IRANSansMobile(FaNum)', color: '#555',marginVertical:5, marginHorizontal: 15,textAlign:'justify'}}>
                            اپلیکیشن "چرتکه" با امکانات متنوع در اختیار شما کاربران گرامی قرار گرفته است. در مسیر آماده سازی این اپلیکیشن سعی زیادی شده که از نظرات متنوع شما عزیزان، در کنار همراهی و مشاوره مستمر متخصصان.
                            استفاده از خدمات این اپلیکیشن بدان معنی است که شرایط استفاده از آن را پذیرفته اید. باتوجه به
                            اینکه تمامی خدمات ارائه شده در اپ "چرتکه" تابع قوانین است. مطالعه آن
                            پیش از استفاده ازخدمات الزامیست.
                        </Text>
                    </View>
                    <View style={{flex: 1, fontFamily: 'IRANSansMobile(FaNum)', backgroundColor: '#fff',}}>
                        <Text style={{
                            fontFamily: 'IRANSansMobile(FaNum)',
                            fontSize: 16,
                            color: '#000',
                            paddingVertical: 15,
                            paddingHorizontal: 20,
                            textAlign: 'center',
                            backgroundColor: '#e0e0e0'
                        }}>
                            راه های ارتباطی
                        </Text>
                        <List.Item
                            title="021-1234567"
                            description="(ساعت پاسخگویی پشتیبانی تلفنی از ساعت 9 الی 16)"
                            descriptionStyle={{color:'#47b03e',fontSize:13,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',}}

                            titleStyle={{fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',}}
                            right={props => <List.Icon {...props} icon="phone" style={{color:'#47b03e'}}/>}
                        />
                        <Divider/>
                        <List.Item
                            title="ارتباط با ما در تلگرام"
                            description="(ساعت پاسخگویی پشتیبانی تلگرامی از ساعت 9 الی 23)"
                            descriptionStyle={{color:'#47b03e' ,fontSize:13,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20,}}

                            titleStyle={{fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20}}
                            right={props => <Icon type="FontAwesome"  name="send-o"  style={{color:'#47b03e',fontSize: 25,marginRight:10,marginTop:10}}/>}
                        />
                        <Divider/>
                        <List.Item
                            title="abacusapp"
                            titleStyle={{color:'#555',fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20}}
                            right={props => <Icon type="FontAwesome"  name="instagram"  style={{color:'#47b03e',fontSize: 25,marginRight:10,marginTop:5}}/>}
                        />
                        <Divider/>
                        <List.Item
                            title="abacusapp"

                            titleStyle={{fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20}}
                            right={props => <Icon type="FontAwesome"  name="send-o"  style={{color:'#47b03e',fontSize: 25,marginRight:10}}/>}
                        />
                        <Divider/>
                        <List.Item
                            title="ایمیل: info@abacusapp.ir"
                            titleStyle={{color:'#777', fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20}}
                            right={props => <Icon type="FontAwesome"  name="envelope"  style={{color:'#47b03e',fontSize: 25,marginRight:10,marginTop:5}}/>}
                        />
                        <Divider/>
                        <List.Item
                            title="وب سایت:http://abacusapp.ir"
                            titleStyle={{color:'#777',fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20}}
                            right={props => <Icon type="FontAwesome"  name="chrome"  style={{color:'#47b03e',fontSize: 25,marginRight:10,marginTop:5}}/>}
                        />
                        <Divider/>
                        <List.Item
                            title=" وب سایت شرکت آرکا:   http://arkainvent.com"
                            titleStyle={{color:'#777',fontSize:15,textAlign:'right', fontFamily: 'IRANSansMobile(FaNum)',marginRight:20}}
                            right={props => <Icon type="FontAwesome"  name="globe"  style={{color:'#47b03e',fontSize: 25,marginRight:10,marginTop:5}}/>}
                        />
                        <View style={{backgroundColor:'ff4500',flex:1}}>
                            <Text style={{
                                fontFamily: 'Lalezar-Regular',
                                fontSize: 12,
                                color: '#555',
                                paddingVertical: 15,
                                paddingHorizontal: 20,
                                textAlign: 'center',
                                backgroundColor: '#f5f5f5'
                            }}>
                                طراحی و پیاده سازی شرکت دانش بنیان
                                محاسبات نرم فناوری اطلاعات و ارتباطات آرکا

                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default ContactUs;
