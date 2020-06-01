import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { uploadImage, uploadData } from './scr/Server';
import firebase from 'firebase'
import '@firebase/firestore';





export default class UploadConfirm extends Component {

  state={
    next: false,
    loading: true,
    values: this.props.values,
    User: this.props.User,
    pictureCol: this.props.pictureCol,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  }

  toggleUpConfirm = () =>{
    this.setState({upConfirm: !this.state.upConfirm})
  }

  toggleCanclepConfirm = () =>{
    this.setState({cancleConfirm: !this.state.cancleConfirm})
  }

  toggleNext = () => {
    this.setState({next: !this.state.next})
  }

  sendImage = async (timestamp) => {
    var i;
    for (i = 0 ; i < this.state.pictureCol.length ; i++){
      uri = this.state.pictureCol[i];
      // imageName = uri.split('/')
      // uploadImage(uri, i + '_' + imageName[imageName.length - 1]);
      uploadImage(uri, i + '_' + timestamp + '.jpg');
    } 
  }

  sendData = async (timestamp) => {    
    uploadData(this.state.User, this.state.values, this.state.pictureCol, timestamp);  

  }

  render() {
    console.log('-------------------------- UploadConfirm ------------------------')
    console.log('values: ')
    console.log(this.state.values);
    console.log('pictureCol: \n' + this.state.pictureCol);

    if(this.state.loading){
      timestamp = (Date.now()).toString();
      this.sendImage(timestamp);
      this.sendData(timestamp);
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" margin={20} />
          <Text style={styles.loading}> กำลังอัปโหลด... </Text>
        </View>
      )
    }else{
      return(
        <View style={styles.container}>
          <View style={styles.contentBox}>
            <Ionicons name='ios-checkmark' size={128} color="#2699FB" margin={12}></Ionicons>
            <Text style={styles.textComplete}> อัปโหลดข้อมูลเรียบร้อย </Text>
            <TouchableOpacity style={styles.okButton} onPress={this.props.onPress}>
              <Text style={styles.okText}> เสร็จสิ้น </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBox:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: Dimensions.get('window').height*0.25,
        left: Dimensions.get('window').width*0.1,
        height: Dimensions.get('window').height*0.5,
        width: Dimensions.get('window').width*0.8,
        borderRadius: 5,
    },
    textComplete:{
        color: '#2699FB',
        fontSize: 16,
    },
    okButton:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 24,
        backgroundColor: '#2699FB',
        borderRadius: 5,
        width: 144,
        height: 42,
    },
    okText:{
        color: 'white',
        fontWeight:'bold',
        fontSize: 20,
    },
    loading:{
        color: 'white',
        fontSize: 20,
    }
});      