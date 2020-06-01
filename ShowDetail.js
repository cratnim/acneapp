import React, { Component }from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import OurCamera from './Camera.js'

export class ShowDetail extends Component {
    state={
        next: false,
        User: this.props.User,  
    }


    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    toggleNext = () => this.setState({ next: !this.state.next});

    handleDate = e => {
      months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
      date = e.substring(0, 2)*1
      index = e.substring(3, 5)*1
      year = 543 + (e.substring(6, e.length)*1)
      month = months[index-1]
      day = `${date} ${month} ${year}`
      return day;
    };

    getAge = (dateString) => {
        var today = new Date();
        var date = dateString.substring(0, 2)*1
        var month = dateString.substring(3, 5)*1
        var year = (dateString.substring(6, dateString.length)*1)
        var age = today.getFullYear() - year;
        var m = today.getMonth() + 1 - month;
        if (m < 0 || (m === 0 && today.getDate() < date)) 
        {
            age--;
        }
        return `${age} ปี`;
    };

    replaceOther = (arr1, arr2) => {
      var array1 = arr1.slice()
      var index = array1.indexOf("Others");
      if (index != -1) {
        array1[index] = arr2;
      }
      return array1.toString();;
    } 

    

    render() {
      const { values: { id, first, last, sex, birth, acneYear, acneMonth, acne, period, pregnant, medic, medical, drug , drugs}}  = this.props;
      const values = { id, first, last, sex, birth, acneYear, acneMonth, acne, period, pregnant, medic, medical, drug, drugs };
      
      
      if (this.state.next == false){
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.header}>ตรวจสอบความถูกต้อง</Text>
          <View style={styles.boxContent}>
            <TextField
              label='หมายเลขบัตรประชาชน'
              editable={false}
              value={id}
            />

            <TextField
              label='ชื่อ'
              editable={false}
              value={first}
            />

            <TextField
              label='นามสกุล'
              editable={false}
              value={last}
            />

            <TextField
              label='เพศ'
              editable={false}
              value={sex}
            />
            
            <TextField
              label='วันเกิด'
              editable={false}
              value={this.handleDate(birth)}
            />

            <TextField
              label='อายุ'
              editable={false}
              value={this.getAge(birth)}
            />
            
            <TextField
              label='ระยะเวลาการเป็นสิว'
              editable={false}
              value={acne}
            />

            <TextField
              label='ประวัติประจำเดือน'
              editable={false}
              value={period}
            />

            <TextField
              label='การตั้งครรภ์'
              editable={false}
              value={pregnant}
            />

            <TextField
              label='โรคประจำตัว'
              editable={false}
              value={this.replaceOther(medic, medical)}
              multiline={true}
            />

            <TextField
              label='ประวัติการแพ้ยา'
              editable={false}
              value={this.replaceOther(drug, drugs)}
              multiline={true}
            />

          </View>

          <View style={styles.btntap}>
            <Button
                icon={
                      <Icon
                        name="arrow-left"
                        size={15}
                      color="#2874A6"
                      />
                    }
                iconLeft
                title="ย้อนกลับ"
                onPress={this.props.onPress}
                buttonStyle={[styles.backBtn, {width: 150}]}
                type="outline"
             />
            <Button 
                title="ถัดไป"
                onPress={this.toggleNext}
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
      );
      }
      else {

        return (
        <OurCamera onPress={this.toggleNext.bind(this)} values={values} User={this.state.User} onPress1={this.props.onPress1}></OurCamera>
        );
      }
    }
}
export default ShowDetail;

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
  boxContent: {
    flex: 0.75,
    backgroundColor: '#fff',
    marginBottom: 25,
    marginHorizontal: 25,
    flexDirection: 'column',
    borderRadius: 15,
    justifyContent: 'space-between',
    padding: 20,
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
  },
  boxImage: {
    backgroundColor: 'white',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  boxName:{
    backgroundColor: 'white',
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  button:{
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#2699FB',
  },
  textBox:{
    //flex: 0.8,
    backgroundColor: 'white',
    margin: 25,
    paddingTop: 15,

  },
  imageProfile:{
    width: 100, 
    height: 100,
    borderRadius: 50,
    //borderWidth: 1.25,
  },
  btntap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginLeft: 24,
    marginRight: 24,

  },
  backBtn: {
    backgroundColor: '#ffffff',
    borderColor: '#2874A6',
  }

});
