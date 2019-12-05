import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { connect } from "react-redux";
import * as actionTypes from "../src/store/actions/index.actions";
import {AsyncStorage} from '@react-native-community/async-storage';
import { Form, Item, Label, Input, Button } from 'native-base';

export class HomeScreen extends Component {
  
    constructor(){
        super();
        this.state = {
            username: '',
         }
    }

    handleSubmit(e){
        e.preventDefault();
        }

    logout = () => {
        if(this.props.token) {
            // Dispatch User Signout action  
            this.props.logoutUser(this.props.token);
            this.props.navigation.navigate('Login');
          }
    }
    // clearAll = async () => {
    //     try {
    //       await AsyncStorage.clear()
    //     } catch(e) {
    //       // clear error
    //     }
        
    //     this.props.navigation.navigate('Login');
    //     console.log('Done.')
    //     console.log('token',this.props.token)
    //   }
  
    render() {
        return (
            <View>
                <Form>
                    <Item floatingLabel>
                        <Label>Update Username</Label>
                        <Input onChangeText={(text) => this.setState({username: text})} value={this.state.username}type="text"/>
                    </Item>
                    
                    <Button block success style={{ marginTop: 50 }} 
                    onPress={this.handleSubmit} >
                        <Text>Update</Text>
                    </Button>
                </Form>
                <Button block danger style={{ marginTop: 20 }} 
                    onPress={this.logout} >
                        <Text>Logout</Text>
                    </Button>
            </View>
                
        )
    }
}

const mapStateToProps = (state) => {
    return {
      token: state.usersRed.token
    };
  };
  
const mapDispatchStateToProps = (dispatch) => {
    return {
        logoutUser: (token) => {dispatch(actionTypes.userSignout(token))}
    };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(HomeScreen);