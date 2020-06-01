  
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import RadioForm from 'react-native-simple-radio-button';

const DismissKeyboard = ({ children}) => (
  <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()} >
    {children}
  </TouchableWithoutFeedback>
);

export class Step2 extends Component {


  constructor(props){
    super(props);
    periodValidate = true;
    pregnantValidate = true;  
    drugValidate = true;
    medValidate = true;
    mValidate = true;
    medicValidate = true;
    drugValidate = true;
    dValidate = true;
    drugsValidate = true;
  }

    state = {
      medical: '',
      drug: '',
      acneYearValidate : true,
      
    };

    medical = [{
      name: 'Medical problems',
      problem: [
      { name: 'Hepatic impairment', id: 'Hepatic impairment', }, 
      { name: 'Renal impairment', id: 'Renal impairment', }, 
      { name: 'Polycystic ovarian syndrome', id: 'Polycystic ovarian syndrome', }, 
      { name: 'Others', id: 'Others', }],
    }];

    drug = [
    {
      name: 'Antibiotics',
      allergy: [
      { name: 'Penicillin', id: 'Penicillin', }, 
      { name: 'Doxycycline', id: 'Doxycycline', }, 
      { name: 'Tetracycline', id: 'Tetracycline', }, 
      { name: 'Lymecycline', id: 'Lymecycline', },
      { name: 'Bactrim', id: 'Bactrim', },
      { name: 'Cephalexin', id: 'Cephalexin', },
      { name: 'Ciprofloxacin', id: 'Ciprofloxacin', },
      { name: 'Clindamycin', id: 'Clindamycin', },
      { name: 'Erythromycin', id: 'Erythromycin', },
      { name: 'Azithromycin', id: 'Azithromycin', },
      { name: 'Clarithromycin', id: 'Clarithromycin', }],
    },{
      name: 'Acne medication',
      allergy: [
      { name: 'Benzoyl peroxide', id: 'Benzoyl peroxide', },
      { name: 'Adapalene', id: 'Adapalene', },
      { name: 'Tretinoin', id: 'Tretinoin', },
      { name: 'Azelaic', id: 'Azelaic', },
      { name: 'Spironolactone', id: 'Spironolactone', },
      { name: 'Oral pills', id: 'Oral pills', },
      { name: 'Isotretinoin', id: 'Isotretinoin', },
      { name: 'Others', id: 'Others', },]
    }];

    continue = e => {
      if(this.validate()){
        e.preventDefault();
        this.props.nextStep();
      }
    };


    validate = () => {
      console.log('in validate now !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      const { values } = this.props;
  

      if (values.acneYear == '0' && values.acneMonth == '0'){
        this.setState({ acneYearValidate: false })
      } else {
        this.setState({ acneYearValidate: true })
      }

      if ((values.sex == 'หญิง' || values.sex == 'ไม่ระบุ') && values.period == 'ไม่มี' ){
        periodValidate = false 
      } else {
        periodValidate = true
      }
      
      if((values.sex == 'หญิง' || values.sex == 'ไม่ระบุ') && values.pregnant == 'ไม่มี' ){
        pregnantValidate = false 
      } else {
        pregnantValidate = true
      }

      if(values.medic == ''){
        if(this.state.medical == 'มี'){
          medValidate = false
          medicValidate = true
        }
        else {
          medicValidate = false
          medValidate = true
      }
      } else {
        medicValidate = true
        medValidate = true
      }


      if(values.medical == '' && values.medic.includes('Others')){
        mValidate = false
      } else {
        mValidate = true
      }

      if(values.drug == ''){ // ถ้ายังไม่ได้กรอกอะไรเลย
        if(this.state.drug == 'แพ้ยา'){
          drugsValidate = false
          drugValidate = true 
        }
        else {
          drugValidate = false
          drugsValidate = true
        }
      } else {
        drugValidate = true 
        drugsValidate = true
      }


      if(values.drugs == '' && values.drug.includes('Others')){ //ถ้าเลือกว่าแพ้ยาและอื่นๆแต่ยังไม่ระบุ
        dValidate = false
      } else {
        dValidate = true
      }
     
      
      console.log('validate: ' + 
        (this.state.acneYearValidate && periodValidate && 
         pregnantValidate && medicValidate && medValidate && mValidate &&
         drugValidate && drugsValidate && dValidate
        ))
      return this.state.acneYearValidate && periodValidate && pregnantValidate && medicValidate && medValidate && mValidate && drugValidate && drugsValidate && dValidate;
    }


    renderError = (type, text) => {
      if (!type) {
        return <Text style={styles.error}>กรุณา{text}</Text>;
      }
      return null;
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    getRadioValue = (type, value, sex) => {
      index = -1;
      if (type == 3){
        if(value == 'ไม่มี') {
          if(sex == 'ชาย'){
            index = 2;
          } else {
            index = -1;
          }
        } else if( value.includes('ไม่')){
          index = 1;
        } else if (value == ''){
          index = -1;
        } else {
          index = 0;
        }
        index = sex == 'ชาย' ? 2 : index;
      } else if ( type == 2) {
        if(value.includes('ไม่')) {
          index = 0;
        } else if(value == ''){
          index = -1;
        } else {
          index = 1;
        }
      } else {
        index = -1;
      }
      return index;
    }


    render() {       
        const { values, handleChange } = this.props;  
        console.log(values)
        return (
           <DismissKeyboard>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>ข้อมูลผู้ป่วยใหม่</Text>
                <View style={styles.elementsContainer} behavior="padding" enabled>

                    <Text style={styles.subheader}>ระยะเวลาการเป็นสิว *</Text>
                    <View style={styles.form}>
                        <NumericInput 
                                value={values.acneYear} 
                                onChange={(e) => handleChange('acneYear', e)} 
                                type='plus-minus' 
                                minValue={0}
                                maxValue={99}
                                totalHeight={30}
                                totalWidth={100}
                        />
                        <Text style={styles.text}>ปี</Text>

                        <NumericInput 
                                value={values.acneMonth} 
                                onChange={(e) => handleChange('acneMonth', e)} 
                                type='plus-minus' 
                                minValue={0}
                                maxValue={11}
                                totalHeight={30}
                                totalWidth={100}
                        />
                        <Text style={styles.text}>เดือน</Text>
                    </View>         
                    {this.renderError(this.state.acneYearValidate, 'ระบุระยะเวลาการเป็นสิว')}
                    
                    <Text style={styles.subheader}>ประวัติประจำเดือน *</Text>
                    <RadioForm
                      radio_props={[
                        {label: 'ปกติ', value: "ปกติ" },
                        {label: 'ไม่ปกติ', value: "ไม่ปกติ" },
                        {label: 'ไม่มี', value: "ไม่มี" },
                      ]}
                      
                      initial={this.getRadioValue(3, values.period, values.sex)}   
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      onPress={(e) => handleChange('period', e)}
                      style={styles.form}
                      buttonSize={15}
                      labelStyle={{fontSize: 16}}
                      disabled={values.sex == 'ชาย'}
                    />

                    {this.renderError(periodValidate, 'ระบุประวัติประจำเดือน')}


                    <Text style={styles.subheader}>การตั้งครรภ์ *</Text>
                    <RadioForm
                      radio_props={[
                        {label: 'ตั้งครรภ์', value: "ตั้งครรภ์" },
                        {label: 'ไม่ตั้งครรภ์', value: "ไม่ตั้งครรภ์" },
                        {label: 'ไม่มี', value: "ไม่มี" },
                      ]}
                      initial={this.getRadioValue(3, values.pregnant, values.sex)}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      onPress={(e) => handleChange('pregnant', e)}
                      style={styles.form}
                      buttonSize={15}
                      labelStyle={{fontSize: 16}}
                      disabled={values.sex == 'ชาย'}
                    />
                    {this.renderError(pregnantValidate, 'ระบุการตั้งครรภ์')}


                    <Text style={styles.subheader}>โรคประจำตัว *</Text>
                    <RadioForm
                      radio_props={[
                        {label: 'ไม่มี', value: "ไม่มี" },
                        {label: 'มี', value: "มี" },
                      ]}
                      initial={this.getRadioValue(2, values.medic, values.sex)}
                      formHorizontal={false}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      onPress={(value) => {
                        if (value == 'ไม่มี') {
                          handleChange('medic', value)
                        }
                        else {
                          handleChange('medic', [])
                        }
                        this.setState({ medical: value });
                      }}
                      style={styles.formCheck}
                      buttonSize={15}
                      labelStyle={{fontSize: 16}}
                    />
                    
                    
                    {this.state.medical == 'มี' || this.getRadioValue(2, values.medic, values.sex) == 1 ? 
                    <View style={styles.formpicker}>
                      <SectionedMultiSelect
                              items={this.medical}
                              uniqueKey="name"               
                              selectText="ระบุ..."
                              subKey="problem"
                              showDropDowns={true}
                              readOnlyHeadings={true}
                              onSelectedItemsChange={(e) => handleChange('medic', e)}
                              selectedItems={values.medic}
                              expandDropDowns={true}
                              searchPlaceholderText="Search"   
                              colors={{ subText: '#000000' }}
                              // selectedIconComponent={() => <Icon name="check-square" type='font-awesome' color="black" size={15} />}
                              // unselectedIconComponent={() => <Icon name="square" type='font-awesome' color="black" size={15} />}                   
                      />      
                    </View> : <View style={styles.form}></View>}
                    
                    {values.medic.includes('Others') ?
                    <View style={{marginLeft: 20, marginTop: 10}}> 
                      <TextInput 
                        style={styles.textinput} 
                        placeholder='อื่น ๆ โปรดระบุ' 
                        returnKeyType="done"
                        onChangeText={(e) => handleChange('medical', e)}
                        autoCorrect={false}
                        value={values.medical}
                      />
                    </View>
                    : <View></View>}

                    {this.renderError(medicValidate, 'ระบุโรคประจำตัว')}
                    {this.renderError(medValidate, 'ระบุโรคประจำตัว')}
                    {this.renderError(mValidate, 'ระบุโรคประจำตัว')}

                    <Text style={{paddingTop: 20}, styles.subheader}>ประวัติการแพ้ยา *</Text>
                    <RadioForm
                      radio_props={[
                        {label: 'ไม่แพ้ยา', value: "ไม่แพ้ยา" },
                        {label: 'แพ้ยา', value: "แพ้ยา" },
                      ]}
                      initial={this.getRadioValue(2, values.drug, values.sex)}
                      formHorizontal={false}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      onPress={(value) => {
                        if (value == 'ไม่แพ้ยา') {
                          handleChange('drug', value)
                        }
                        else {
                          handleChange('drug', [])
                        }
                        this.setState({drug : value})
                      }}
                      style={styles.formCheck}
                      buttonSize={15}
                      labelStyle={{fontSize: 16}}
                    />        

                    {this.state.drug == 'แพ้ยา' || this.getRadioValue(2, values.drug, values.sex) == 1? 
                    <View style={styles.formpicker}>
                      <SectionedMultiSelect
                              items={this.drug}
                              uniqueKey="name"               
                              selectText="ระบุ..."
                              subKey="allergy"
                              showDropDowns={true}
                              readOnlyHeadings={true}
                              onSelectedItemsChange={(e) => handleChange('drug', e)}
                              selectedItems={values.drug}
                              expandDropDowns={true}
                              searchPlaceholderText="Search"
                              colors={{ subText: '#000000' }}
                              // selectedIconComponent={() => 
                              //   <Icon name="check-square" iconStyle={'regular'} type='font-awesome' color="black" size={15} />}
                              // unselectedIconComponent={() => 
                              //   <Icon name="square" iconStyle={'regular'} type='font-awesome' color="black" size={15} />}
                      />
                    </View>: <View style={styles.form}></View>}   

                    {values.drug.includes('Others') ?
                    <View style={{marginLeft: 20, marginTop:10}}> 
                      <TextInput 
                        style={styles.textinput} 
                        placeholder='อื่น ๆ โปรดระบุ' 
                        returnKeyType="done"
                        onChangeText={(e) => handleChange('drugs', e)}
                        autoCorrect={false}
                        value={values.drugs}
                      />
                    </View>
                    : <View></View>}

                    {this.renderError(drugValidate, 'ระบุประวัติการแพ้ยา')}
                    {this.renderError(drugsValidate, 'ระบุประวัติการแพ้ยา')}
                    {this.renderError(dValidate, 'ระบุประวัติการแพ้ยา')}

                </View>

                <View style={styles.btntap}>
                    <Button
                          icon={
                            <Icon
                              name="arrow-left"
                              size={15}
                              color="#2874A6"
                              type="font-awesome"
                            />
                          }
                          iconLeft
                          title="ย้อนกลับ"
                          onPress={this.back}
                          buttonStyle={[styles.backBtn, {width: 150}]}
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
                              type='font-awesome'
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
export default Step2 ;

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
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 30,
      borderRadius: 15,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    form:{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    formCheck: {
      flexDirection: 'column',
      marginBottom: 10,
      justifyContent: 'flex-start',
      flex: 0.5,
    },
    subheader: {
      fontSize: 16,
      fontWeight: '100',
      marginBottom: 10,
      color: '#2874A6',
    },
    text: {
        fontSize: 16,
        fontWeight: '100',
        color: 'black',
        marginTop: 5,
    },
    textinput: {
      fontSize: 16,
      fontWeight: '100',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ecf5fd',
      paddingLeft: 5,
      borderRadius: 10,
      height: 40,
      color: 'black',
    },
    formpicker: {
      fontSize: 16,
      fontWeight: '100',
      marginLeft: 20,
      flex: 0.2,
      marginTop: -30,
      borderColor: 'black',
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