import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import NextForm from './Form.js'
import Scanqr from './ScanqrCamera'
import { FontAwesome, Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import isIPhoneX from 'react-native-is-iphonex';

export default class Home extends Component {

    state={
        next: false,
        result: false,
        
    }
    // toggle next state
    toggleNext = () => this.setState({ next: !this.state.next});
    
    // toggle next state and toggle result state
    toggleResult = () =>{
      this.toggleNext();
      this.setState({result: !this.state.result});
    }


    onLogoutPress = () => {
      console.log('try to sign out')
      firebase.auth().signOut()
      .then(()=>{ this.props.onPress(); })
      .catch(function(error) {
        // An error happened.
        console.log('sign out unsuccess')
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errorCode: ' + errorCode)
        console.log('errorMessage: ' + errorMessage)     
      });
    }

    render() {
        const {Email, Password} = this.props.User;

        if(this.state.next == false){
            return (
            <View style={styles.container}>
                <View style={styles.boxHeader}>
                    <View style={styles.boxImage}>
                      <FontAwesome name="user-circle-o" size={80} />
                      {/* {<Image source={require('./Images/images.png')} style={styles.imageProfile}/>} */}
                    </View>
                    <View style={styles.boxName}>
                      <TouchableOpacity style={styles.Logoutbutton}
                          onPress={this.onLogoutPress}
                      >
                          <Entypo name="log-out" size={30} color='#2699FB' style={{paddingLeft:10}}></Entypo>
                          <Text style={styles.LogoutText}>ออกจากระบบ</Text>
                      </TouchableOpacity>
                      <Text style={styles.nameHeader}>{Email}</Text>
                    </View>
                </View>
                <View style={styles.boxContent}>
                    <View style={styles.textBox}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10,}}>
                            วิธีการใช้งาน
                        </Text>
                        <Text>1. กรอกข้อมูลของผู้ป่วยให้ครบถ้วน</Text>
                        <Text style={styles.text}>2. ถ่ายรูปใบหน้าของผู้ป่วยทั้งหมด 3 มุมตามลำดับ {'\n   '} คือ หน้าตรง หันซ้าย และหันขวา </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, marginTop: 20,}}>
                            คำแนะนำ
                        </Text>
                        <Text>1. ล้างเครื่องสำอาง ถอดแว่น และรวบผม</Text>
                        <Text>2. ถ่ายรูปในบริเวณที่มีแสงสว่างพอเหมาะ</Text>
                        <Text>3. ถือมือถือให้นิ่งขณะถ่ายรูป</Text>
                    </View>
                    
                    <View>
                      <Button 
                          title="กรอกข้อมูลผู้ป่วย"
                          onPress={this.toggleNext.bind(this)}
                          buttonStyle = {styles.button}                      />
                      <Button 
                          title="สแกน QR Code"
                          onPress={this.toggleResult.bind(this)}
                          buttonStyle = {styles.button}
                      />
                      </View>
                </View>
                
            </View>
            );
        }
        else if(this.state.result == false){ 
          // if next state is true go to form page 
          // call when press on กรอกข้อมูล button
          return (
            <NextForm onPress={this.toggleNext.bind(this)} User={this.props.User}></NextForm>
          )
        }
        else{
          // if next state is true and result state is true go to scan qr code page
          // call when press on แสกน QR Code button
          return (
            <Scanqr onPress={this.toggleResult.bind(this)} User={this.props.User}></Scanqr>
          )
        }
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2699FB',
    alignItems: 'stretch',    
  },
  boxContent: {
    flex: 0.75,
    backgroundColor: '#fff',
    margin: 25,
    flexDirection: 'column',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  boxHeader: {
    backgroundColor: 'white',
    flex: 0.25,
    flexDirection: 'row',
    paddingTop: 15,
  },
  nameHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
  },
  boxImage: {
    backgroundColor: 'white',
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 25,
  },
  boxName:{
    backgroundColor: 'white',
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingRight: 10,
  },
  button:{
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#2699FB',
  },
  textBox:{
    backgroundColor: 'white',
    marginLeft: 15,
    marginVertical: 20,
    marginRight: 10,
    paddingTop: 15,
  },
  text:{
    flexWrap:'wrap',
    alignContent: 'space-between',

  },
  imageProfile:{
    width: 100, 
    height: 100,
    borderRadius: 50,
  },
  Logoutbutton:{
    position: 'absolute',
    top: isIPhoneX ? 30 : 20,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  LogoutText:{
    fontSize: 10,
    color: '#2699FB',
  },

});
