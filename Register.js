import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Button } from 'react-native-elements';
import { db } from './Config.js';
import firebase from 'firebase';
import isIPhoneX from 'react-native-is-iphonex';


let addItem = item => {
    db.ref('/User').push({
        email: item.email,
        password: item.password,
        fname: item.fname,
        lname: item.lname,
    });
};

const DismissKeyboard = ({ children}) => (
    <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()} >
      {children}
    </TouchableWithoutFeedback>
  );
  
export default class Register extends React.Component{
   
    state={
        finish: false,
        email: '',
        password: '',
    }
    
    onRegisterButtonPress=() =>{
        const {email , password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(()=>{ this.props.onPress(); })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use'){
                alert('อีเมลนี้ถูกใช้ไปแล้ว');
            } else if(errorCode === 'auth/invalid-email'){
                if (email == ''){
                  alert('กรุณากรอกอีเมล');
                }
                else {
                  alert('รูปแบบอีเมลไม่ถูกต้อง')
                }
            }  else if(errorCode === 'auth/weak-password'){
                alert('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัว')
            }
            console.log('errorCode: ' + errorCode)
            console.log('errorMessage: ' + errorMessage)
            console.log(error);
          });
    } 

    render(){
        console.log(this.state)
        if(this.state.finish==false){
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>สมัครสมาชิก</Text>
                    <DismissKeyboard>
                    <View style={styles.form}>
                        <Text style={styles.Text}>อีเมล</Text>
                        <TextInput 
                            style={styles.itemInput}
                            placeholder={'E-mail'} 
                            textContentType={'emailAddress'}
                            onChangeText={
                                email => this.setState({email: email})
                            }
                            returnKeyType='next'
                            onSubmitEditing = {() => this.passwd.focus()}
                            keyboardType="email-address"  
                            autoCapitalize="none"  
                        />
                        <Text style={styles.Text}>รหัสผ่าน</Text>
                        <TextInput 
                            style={styles.itemInput}
                            placeholder={'Password'} 
                            textContentType={'password'}
                            secureTextEntry={true}
                            onChangeText={
                                password => this.setState({password: password})
                            } 
                            ref={(input) => this.passwd = input}
                            returnKeyType="done"
                            autoCapitalize="none"  
                        />

                        <View style={styles.bottomBox}>
                            <Button 
                                title="สมัครสมาชิก"
                                onPress={this.onRegisterButtonPress}
                                buttonStyle={styles.button}
                            />
                            <Button 
                                title="ยกเลิก"
                                onPress={this.props.onPress}
                                buttonStyle={styles.button}
                                type='outline'
                            />
                        </View>     
                    </View>
                    </DismissKeyboard>
                </View>
              );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#2699FB',
    },
    title: {
        marginBottom: 20,
        fontSize: 32,
        fontWeight:'bold',
        textAlign: 'center',
        color: 'white',
        marginTop: 15,
        paddingTop: 30,
        paddingBottom:20,
    },
    form: {
        flex: 0.8,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        shadowRadius: 1,
        shadowColor: '#D6EAF8',
        shadowOpacity: 100.0,
        shadowOffset:{  width: 3,  height: 3,  },
        padding: 20,
    },
    itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#AED6F1',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center',
        color: '#2699FB'
    },
    button: {
        marginBottom: 15,
        alignSelf: 'stretch',
    },
    bottomBox:{
        justifyContent: 'center',
        marginTop: isIPhoneX ? 130 : 30, 
      },
    Text:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2699FB',
        marginBottom:10,
    }
})