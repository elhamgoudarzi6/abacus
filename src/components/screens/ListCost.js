import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Picker,
    Modal,
    Alert,
} from 'react-native';
import {Card,Button} from 'native-base';
 import Header from '../layouts/Header';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
 import {connect} from 'react-redux';
 class ListCost extends Component {
  constructor(props) {
    super(props);
    this.state = {
       user_id: this.props.dataLogin['id'],
        userSelected:[],
        dataSource:[],
        isLoading: true,
        data: null,
        modalVisible:false,
        selected: "key1",
            }
      this.ShowRecord();
    };

     componentDidMount(): void {
         this.ShowRecord();
     }
     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
         this.ShowRecord();
     }
    clickEventListener = (item) => {
      this.setState({userSelected: item}, () =>{
        this.setModalVisible(true);
      });
    }
  
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
      //   ..............Show...................
     
      ShowRecord = () => {
      fetch('http://194.5.175.25:2000/api/v1/cost/' + this.state.user_id)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            isLoading: false,
            dataSource: responseJson.data
          })
        })
        .catch((error) => {
          console.error(error);
        });
      
    }
//  .................delete..........................
DeleteRecord = (item) => {
  let id
  id = item._id;
  fetch('http://194.5.175.25:2000/api/v1/cost/' + id, {
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
      this.ShowRecord()

    }).catch((error) => {
      console.error(error);
    });
}
    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden={false}
                    backgroundColor='#3e843d'
                />
               <Header title="لیست هزینه ها" onBackPress={()=>{this.props.navigation.goBack()}}/>

                <View >                  
                </View>
                <FlatGrid
                    itemDimension={200}
                    items={this.state.dataSource}
                    style={{marginTop: 3,marginHorizontal:10}}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                   
                    renderItem={({item, index}) => (
                 <Card style={styles.card}  key={0}>
                    <View style={{flexDirection:'row-reverse',flex:1,backgroundColor:'#47b03e',marginHorizontal:-10}}>
                                                <View style={{ flex: 1,marginTop:5}}>
                                                      <Text style={styles.title2}>مبلغ:</Text>

                                                  </View>

                                                <View style={{ flex: 1,marginTop:5, alignItems: 'flex-start', }}>
                                                        <Text style={styles.title2}>{[item.amount,'  تومان']} </Text>
                                                     
                                                    </View>
                                                   

                                                </View>
                                                <View style={{flexDirection:'row-reverse',flex:1,backgroundColor:'#fff',marginHorizontal:-10}}>
                                                <View style={{ flex: 1,marginTop:5}}>
                                                      
                                                      <Text style={styles.title}>تاریخ:</Text>
                                                   
                                                  </View>

                                                <View style={{ flex: 1,marginTop:5, alignItems: 'flex-start', }}>
                                                        <Text style={styles.title}>{item.year}/{item.month}/{item.day} </Text>
                                                     
                                                    </View>
                                                   

                                                </View>
                                                <View style={{flexDirection:'row-reverse',flex:1,backgroundColor:'#e2e2e2',marginHorizontal:-10}}>
                                                <View style={{ flex: 1,marginTop:5}}>
                                                      
                                                      <Text style={styles.title}>دسته:</Text>
                                                   
                                                  </View>

                                                <View style={{ flex: 1,marginTop:5, alignItems: 'flex-start', }}>
                                                        <Text style={styles.title}>{item.category} </Text>
                                                     
                                                    </View>
                                                   

                                                </View>
                                                <View style={{flexDirection:'row-reverse',flex:1,backgroundColor:'#fff',marginHorizontal:-10}}>
                                                <View style={{ flex: 1,marginTop:5}}>
                                                      
                                                      <Text style={styles.title}>زیردسته:</Text>
                                                   
                                                  </View>

                                                <View style={{ flex: 1,marginTop:5, alignItems: 'flex-start', }}>
                                                        <Text style={styles.title}>{item.sub_category} </Text>
                                                     
                                                    </View>
                                                   

                                                </View>
                                                <View style={{flexDirection:'row-reverse',flex:1,backgroundColor:'#e2e2e2',marginHorizontal:-10}}>
                                                <View style={{ flex: 1,marginTop:5,marginRight:10}}>
                                                      
                                                <TouchableOpacity style={{ marginRight: 10, marginTop: 2 }}
                                                                  onPress={() => { Alert.alert(
                                                                      'هشدار حذف',
                                                                      'آیا برای حذف اطمینان دارید؟',
                                                                      [
                                                                          {text: 'لغو'},
                                                                          {text: 'بله', onPress: () => { this.DeleteRecord(item)}},
                                                                      ],
                                                                  ) }}>
                                             <Icon active name="trash" style={{ fontSize: 20, color: '#888', alignSelf: 'flex-end' }} />
                                               </TouchableOpacity>
                            
                                                  </View>

                                                <View style={{ flex: 1,marginTop:5, alignItems: 'flex-start', }}>
                                                       <TouchableOpacity style={{ flexDirection: 'row', marginTop: 2 ,marginLeft:5}} onPress={() => this.clickEventListener(item)}>
                                                           <Text style={{ fontSize: 14, marginRight: 5, color: '#47b03e' }}>جزئیات بیشتر</Text>
                                                        <Icon active name="play-circle-o" style={{ fontSize: 20, marginRight: 5, color: '#47b03e' }} />
                                                          </TouchableOpacity>
                                                    </View>
                                                   

                                                </View>
                                                 </Card>
          
                                                      )}/>
              <Modal

              animationType={'fade'}
              transparent={true}
              onRequestClose={() => this.setModalVisible(false)}
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

                  <Text style={{ fontSize: 20, color: '#fff', marginBottom: 5, fontFamily: 'Vazir-Black' }}>جزئیات بیشتر</Text>
                  <Button transparent style={{ marginRight: -20 }}>
                    <Icon name='close' style={{ fontSize: 25, color: '#fff', marginRight: 20 }} onPress={() => { this.setModalVisible(false) }} />
                  </Button>

                </View>
              </LinearGradient>
              <View style={styles.popupOverlay}>
                <View style={styles.popup}>
                  <View style={styles.popupContent}>
                    <ScrollView contentContainerStyle={styles.modalInfo}>
                      <View style={{ marginTop: 10 }}>
                        <View style={[styles.view,{backgroundColor:'#e2e2e2'}]}>
                          <Text style={styles.title3}>مبلغ:<Text style={styles.title3}>{this.state.userSelected.amount} </Text></Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#fff'}]}>
                          <Text style={styles.title3}>تاریخ : <Text style={styles.title3}> {this.state.userSelected.date}</Text></Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#e2e2e2'}]}>
                          <Text style={styles.title3}> از درآمد: {this.state.userSelected.of_income}</Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#fff'}]}>
                          <Text style={styles.title3}> دسته: {this.state.userSelected.category}</Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#e2e2e2'}]}>
                          <Text style={styles.title3}> زیردسته: {this.state.userSelected.sub_category}</Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#fff'}]}>
                          <Text style={styles.title3}> نوع دریافتی : {this.state.userSelected.type}</Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#e2e2e2'}]}>
                          <Text style={styles.title3}> نوع حساب : {this.state.userSelected.acount}</Text>
                        </View>
                        <View style={[styles.view,{backgroundColor:'#fff'}]}>
                          <Text style={styles.title3}> توضیحات:  {this.state.userSelected.detail}</Text>
                        </View>
                          <Image style={styles.image}    source={{ uri: this.state.userSelected.image }}/>
                      </View>
                    </ScrollView>

                  </View>
                </View>
              </View>
</Modal>
               
              
       
            </View>

        );
    }
};
const mapStateToProps = state => {
    return {
        dataLogin: state.loginUser.dataLogin,
    }
}
export default connect(mapStateToProps)(ListCost);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04c1a5',
  },
  header: {
    backgroundColor: '#3d933c',
  },
  headerContent: {
    padding: 25,
    alignItems: 'center'
  },
  image: {
    marginTop:-1,
    alignSelf: 'center',
    height: 230,
    width: '100%',
  },

  card: {
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    height:170,
    borderWidth:0.5,
    borderColor:'#47b03e'

},
viewbuttom: {
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1, marginTop: 50
},

title3: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'IRANSansMobile(FaNum)',
    margin:10,
    padding: 5
},
title2: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'IRANSansMobile(FaNum)_Bold',
    marginRight: 17,
    marginTop:-3,
    marginLeft: 5,

},
title: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'IRANSansMobile(FaNum)',
    marginRight: 17,
    marginTop:-3,
    marginLeft: 5,

},
  view: {
  
    flex:1

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
