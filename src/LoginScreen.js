import React, { Component } from 'react'
import { View, Text, Alert} from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button } from 'native-base';
import { connect } from "react-redux";
import * as actionMethods from "../src/store/actions/index.actions";

class LoginScreen extends Component {
    
    state = {
       user: {
        username: '',
        password: ''
       } 
    }   
    
    validateInputs(forForm){
        //Empty or false inputs
        if(this.state.user.username === "" || !this.state.user.username){
          return false;
        }else if(this.state.user.password === "" || !this.state.user.password){
          return false;
        }
        return true;
      }

      onUserSignin = () => {
        //TODO: Validate inputs
        if(this.state.user.username === "" || this.state.user.password === ""){
          //TODO: ADD ERROR DIALOG
          Alert.alert('Fields are empty');
        }else{
          //Submit the form
          let userDets = {
            username: this.state.user.username,
            password: this.state.user.password
          };
          this.props.onUserSigninSubmit(userDets);
          {this.props.token ? this.props.navigation.navigate('Home') : null}
        }
      }
    
      onInputClicked = (event, forField, forForm)  => {
        let tempUser = this.state.user;
        tempUser[forField] = event.target.value;
        this.setState({user: tempUser});
      }

    render() {
        return (
        <Container>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input value={this.state.user.username} onChangeText={(text) => this.setState({user: {...this.state.user, username: text}})} inputChanged={this.onInputClicked}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry value={this.state.user.password} 
                            onChangeText={(text) => this.setState({user: {...this.state.user, password: text}})} inputChanged={this.onInputClicked} />
                    </Item>
                    <Button block success style={{ marginTop: 50 }} 
                    onPress={this.onUserSignin} >
                        <Text>Login</Text>
                    </Button>
                    <Button block danger style={{ marginTop: 20 }} 
                    onPress={() => this.props.navigation.navigate('Signup')} >
                        <Text style={{color:'#fff'}}>Sign Up</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
                
        )
    }
}

const mapStateToProps = (state) => {
    return {
      userInfo: state.usersRed.userInfo,
      token: state.usersRed.token
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onUserSigninSubmit: (user) => {dispatch(actionMethods.userSignin(user))}
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);