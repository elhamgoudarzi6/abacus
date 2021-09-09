


import React, {Component} from 'react';
import {View} from "react-native";
import {Switch, Appbar} from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Appbar.Header  style={{backgroundColor:'#47b03e',marginTop:23}}>
                    <Appbar.Content
                        titleStyle={{
                            color: '#fff',
                            fontFamily: 'Vazir-Black',
                            fontSize: 18,
                            textAlign:'center',
                        }}
                        title={this.props.title}/>
                        <Appbar.Action  style={{    justifyContent: 'flex-end', alignItems: 'flex-end',marginTop:-10}} color={'#fff'}
                                       size={40} icon={'chevron-right'} onPress={this.props.onBackPress} />
                </Appbar.Header>
            </View>

        );
    }
}
