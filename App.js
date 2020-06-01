import React, { Component }from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard , TouchableWithoutFeedback} from 'react-native';
import { Button } from 'react-native-elements';
import Home from './Home.js';
import Register from './Register.js'
import firebase from 'firebase';

const DismissKeyboard = ({ children}) => (
  <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()} >
    {children}
  </TouchableWithoutFeedback>
);

export default class App extends Component {
 
  state={
    login: false,
    Email: '',
    Password: '',
    register: false,
  }

  backFromResult = () => {
    this.setState({
      login: false,
      Email: '',
      Password: '',
      register: false,});
  }

  onLoginButtonPress=() =>{
    const {Email , Password} = this.state;
    firebase.auth().signInWithEmailAndPassword(Email,Password)
      .then(()=>{ this.setState({login: true}); })
      .catch(function(error) {
        // Handle Errors 
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errorCode: ' + errorCode)
        console.log('errorMessage: ' + errorMessage)
        if(errorCode === 'auth/invalid-email'){
          if (Email == ''){
            alert('กรุณากรอกอีเมล');
          }
          else {
            alert('รูปแบบอีเมลไม่ถูกต้อง')
          }
        }
        else if (errorCode === 'auth/wrong-password') {
          if (Password == ''){
            alert('กรุณากรอกรหัสผ่าน');
          }else {
            alert('รหัสผ่านผิด');
          }
        } 
        else {
          alert(errorMessage);
        }
        console.log(error);
      });
  } 


  toggleRegister = () => this.setState({ register: !this.state.register});

  render() {
    if(this.state.login == false && this.state.register == false){
      return (
        <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.topBox}>
            <Text style={styles.welcome}>ยินดีต้อนรับ</Text>
            <Text style={styles.Text}>อีเมล</Text>
            <TextInput
              placeholder={'E-mail'}
              style={styles.TextInput}
              onChangeText={
                email => this.setState({Email: email})
              }
              clearButtonMode='while-editing'
              textContentType='emailAddress'
              returnKeyType='next'
              onSubmitEditing = {() => this.passwd.focus()}
              keyboardType="email-address"
              autoCapitalize="none"  
            />
            <Text style={styles.Text}>รหัสผ่าน</Text>
            <TextInput
              placeholder={'Password'}
              style={styles.TextInput}
              onChangeText={
                password => this.setState({Password: password })
              }
              clearButtonMode='while-editing'
              secureTextEntry={true}
              textContentType='password'
              ref={(input) => this.passwd = input}
              returnKeyType="done"
              autoCapitalize="none"  
            />
          </View>
          <View style={styles.bottomBox}>
            <Button 
              title="เข้าสู่ระบบ"
              onPress={this.onLoginButtonPress}
              buttonStyle={styles.loginButton}
            />
            <Button 
              title="ลงทะเบียน"
              onPress={this.toggleRegister.bind(this)}
              buttonStyle={styles.registerButton}
              type='outline'
            />
          </View>
        </View>
        </DismissKeyboard>
      );
    }
    else{
      if(this.state.login==true){
        User1={
          Email: this.state.Email,
          Password: this.state.Password
        }
        return (
          <Home User={User1} onPress={this.backFromResult.bind(this)} />
        );
      }
      else if(this.state.register==true){
        return(
          <Register onPress={this.toggleRegister.bind(this)}></Register>
        )
        
      }
    }
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    flex: 1,
  },
  topBox:{
    paddingTop:15,
    flex: 0.7,
    backgroundColor: '#2699FB',
    justifyContent: 'center',
    padding:30,
    alignItems:'stretch',
  },
  bottomBox:{
    flex: 0.3,
    justifyContent: 'center',
    padding:30,
  },
  registerButton:{
    marginTop:15,
    backgroundColor: '#ffffff',
  },
  loginButton:{
    backgroundColor: '#2699FB',
  },
  welcome:{
    fontWeight:'bold',
    fontSize:36,
    alignSelf:'center',
    flex:0.4,
    color:'#ffffff',
  },
  formLogin:{
    backgroundColor:'#ffffff',
  },
  TextInput:{
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  Text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  }
});
