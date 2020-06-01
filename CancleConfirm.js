import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class CancleConfirm extends Component {
    state={
        next:false,
        values: this.props.values,
        User: this.props.User,  
    }

    toggleNext = () => {
        this.setState({next: !this.state.next})
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.contentBox}>
                    <Ionicons name='ios-trash' size={128} color="#2699FB" margin={24}></Ionicons>
                    <Text style={styles.textComplete}> ต้องการถ่ายใหม่หรือไม่ ? </Text>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity style={styles.Button} onPress={this.props.onPress}>
                            <Ionicons name='ios-close-circle' size={72} color="gray"></Ionicons>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button} onPress={this.props.onPress1}>
                            <Ionicons name='ios-checkmark-circle' size={72} color="red"></Ionicons>
                        </TouchableOpacity>
                    </View>  
                </View>
            </View>
        );
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
        paddingTop: 20,
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
    buttonBar:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').width*0.35,
    },
    textComplete:{
        color: '#2699FB',
        fontSize: 16,
    },
    Button:{
        margin: 24,
    }
});      