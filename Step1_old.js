  
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import firebase from 'firebase';


personIdString = ''
inputColor = 'blue'

const DismissKeyboard = ({ children}) => (
  <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()} >
    {children}
  </TouchableWithoutFeedback>
);


export class Step1 extends Component {

    componentDidMount() {

      /* Cause your component to request data from Firebase when
        component first mounted */
      this.getMyId()
  }

  getMyId() { /* Remove arrow function */

    const db = firebase.firestore();
    // db.settings({ timestampsInSnapshots: true});
    db.collection('data').get().then((snapshot) => {

      snapshot.docs.forEach(doc => {
          let items = doc.data();
          personIdString = personIdString+'#'+items.personId
          // this.setState({ personId : items.personId }) 
          /* Make data suitable for rendering */
          items = JSON.stringify(items);

          /* Update the components state with query result */
          
      });

    });
}

checkID()
{
  const { values } = this.props;
  if(values.id.length != 17)
  {
    inputColor = 'blue'
  }
  if(values.id.length == 17)
  {
    // ทำ id ให้เป็นปกติให้ได้ ไม่เอา -

    id = values.id.replace(/[\W\D\s\._\-]+/g, '');

    if(personIdString.includes(id)) //เช็คว่าต้องได้ true
    {
      inputColor = 'red'
      console.log('TRUE')
    }
    else
    {
      inputColor = 'green'
      console.log("FALSE")
    }
    // if(personIdString.includes(id))

  }
  console.log(inputColor)
}

    constructor(props){
      super(props);
      // idValidate = true,
      nameValidate = true,
      lnameValidate = true,
      sexValidate = true,
      birthValidate = true;
    }

    state = {
      idValidate : true,
      isPickerVisible : false,
      personId : ''
    };

    handleDate = e => {
        months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
        date = e.substring(0, 2)*1
        index = e.substring(3, 5)*1
        year = 543 + (e.substring(6, e.length)*1)
        month = months[index-1]
        day = `${date} ${month} ${year}`
        return day;
    };

    continue = e => {
      if(this.validate()){
        e.preventDefault();
        this.props.nextStep();
      }
    };

    back = e => {
      e.preventDefault();
      this.props.prevStep();
    };

     validate = () => {
      const { values } = this.props;

      if(values.id == ''){
        this.setState({idValidate :false})
      } else {
        this.setState({idValidate :true})
      }

      if(values.first == ''){
        nameValidate = false 
      } else {
        nameValidate = true
      }
    
      if(values.last == ''){
        lnameValidate = false 
      } else {
        lnameValidate = true
      }
      
      if(values.sex == ''){
        sexValidate =  false 
      } else{
        sexValidate = true
      }
     
      if(values.birth == moment().format('DD-MM-YYYY')){
        birthValidate = false 
      } else {
        birthValidate = true
      }
      
      return this.state.idValidate && nameValidate && lnameValidate && sexValidate && birthValidate;
    }

    renderError = (type, text) => {
      if (!type) {
         return <Text style={styles.error}>กรุณา{text}</Text>;
      }
      return null;
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <DismissKeyboard>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>ข้อมูลผู้ป่วยใหม่</Text>
                <View style={styles.elementsContainer} behavior="padding" enabled>

                    <Text style={styles.subheader}>หมายเลขบัตรประชาชน *</Text>
                    <TextInput 
                              style={styles.textinput} 
                              placeholder='X-XXXX-XXXXX-XX-X' 
                              returnKeyType="next"
                              keyboardType="number-pad"
                              onSubmitEditing = {() => this.nameInput.focus()}
                              maxLength={17}
                              onChangeText={(e) => handleChange('id', e)}
                              defaultValue={values.id}
                              autoCorrect={false}
                    />
                    {this.renderError(this.state.idValidate, 'กรอกหมายเลขบัตรประชาชน')}           
                    <Button            
                      buttonStyle={{backgroundColor:inputColor}}
                      title="กดหมี"
                      onPress={this.checkID()} 
                      
                    />       
                     

                    <Text style={styles.subheader}>ชื่อ *</Text>
                    <TextInput 
                              style={styles.textinput} 
                              placeholder='ชื่อ' 
                              returnKeyType="next" 
                              ref={(input) => this.nameInput = input}
                              onSubmitEditing = {() => this.lNameInput.focus()}
                              onChangeText={(e) => handleChange('first', e)}
                              defaultValue={values.first}
                              autoCorrect={false}
                    />
                    {this.renderError(nameValidate, 'กรอกชื่อ')}

                    <Text style={styles.subheader}>นามสกุล *</Text>
                    <TextInput 
                              style={styles.textinput} 
                              placeholder='นามสกุล' 
                              returnKeyType="next"
                              ref={(input) => this.lNameInput = input} 
                              onChangeText={(e) => handleChange('last', e)}
                              defaultValue={values.last}
                              autoCorrect={false}
                    />
                    {this.renderError(lnameValidate, 'กรอกนามสกุล')}

                    <Text style={styles.subheader}>เพศ *</Text>
                    <Dropdown
                      data={[
                        { value: 'ชาย' }, 
                        { value: 'หญิง' }, 
                        { value: 'ไม่ระบุ' }
                      ]}
                      value={values.sex}
                      onChangeText={(e) => handleChange('sex', e)}
                      containerStyle={styles.formpicker}
                  />
                  {this.renderError(sexValidate , 'ระบุเพศ')}


                  <Text style={styles.subheader}>วัน เดือน ปีเกิด *</Text>
                  <Button 
                    title={this.handleDate(values.birth)}
                    buttonStyle={[styles.backBtn, {width: 200}, {height: 40}]}
                    type="outline"
                    onPress={() => this.setState({ isPickerVisible: true })}
                  >
                  </Button>
                  <DateTimePicker
                    isVisible={this.state.isPickerVisible}
                    onConfirm={(e) => {handleChange('birth', e); this.setState({ isPickerVisible : false})}}
                    onCancel={() => {this.setState({ isPickerVisible : false})}}
                    mode={'date'}
                    maximumDate={new Date()}
                    datePickerModeAndroid={'spinner'}
                  />
                  {this.renderError(birthValidate, 'ระบุวัน เดือน ปีเกิด')}
                            
                </View>

                <View style={styles.btntap}>
                    <Button                           
                      title="ยกเลิก"
                      onPress={this.back}
                      buttonStyle={[styles.backBtn, {width:150}]}
                      type="outline"
                    />
                    <Button 
                      title="ถัดไป"
                      onPress={this.continue}
                      color="#2874A6"
                      buttonStyle={{width: 150}}
                      icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                      }
                      iconRight
                    />
                </View>
            </ScrollView>
            </DismissKeyboard>
        );
      }

}
export default  Step1;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2699FB',
    },
    header: {
      marginTop: 48,
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '100',
      marginBottom: 24,
      color: '#fff',
    },
    elementsContainer: {
      flex: 1, 
      backgroundColor: '#fff',
      flexDirection: 'column',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      borderRadius: 15,
      paddingBottom: 20,
    },
    subheader: {
      fontSize: 16,
      fontWeight: '100',
      marginBottom: 10,
      color: '#2874A6',
      marginTop: 10,
    },
    textinput: {
      fontSize: 16,
      fontWeight: '100',
      // marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ecf5fd',
      paddingLeft: 5,
      borderRadius: 10,
      height: 40,
      color: 'black',
      
      
    },
    
    formpicker: {
      marginTop: -30,
      marginBottom: 10,
      width: 150,
    },
    btntap: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginLeft: 24,
      marginRight: 24,
    },
    backBtn: {
      backgroundColor: '#ffffff',
      borderColor: '#2874A6',
    },
    error: {
      fontSize: 14,
      color: 'red',
      marginBottom: 10,
    }
  });