import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';

export default class Result extends React.Component{
    constructor(props){
        super(props)
        this.state={
            confirm: null,
            cancle: null,
        }
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <Text style={styles.headText}>ตรวจสอบความถูกต้อง</Text>
                <View style={styles.content}>
                    <Button 
                    onPress={this.props.onPress}
                    title="ดูผลลัพธ์"
                    />
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#F1F9FF',
      flexDirection: 'column',
      //flex: 1,
    },
    headText:{
        color: '#2699FB',
    },
    content:{
        
    }
})