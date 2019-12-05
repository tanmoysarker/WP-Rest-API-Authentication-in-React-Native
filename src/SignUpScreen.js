import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button } from 'native-base';
import axios from 'axios';

export class SignUpScreen extends Component {
   
  constructor(){
    super();
    this.state = {
      user : {
        username: '',
        email: '',
        password: ''
      },
      first_name: '',
      last_name: ''
    };

  }


      insertData(){
        axios.post("http://192.168.0.105/wordpress/wp-json/wp/v2/users/register", this.state.user,{headers: {"Content-Type": "application/json"}})
        .then(res => {
          const data = res.data;
          console.log(data);
        }).catch(error => {
          console.log(error.response)
      });
      }

      handleSubmit(e){
        e.preventDefault();
        this.insertData();
      }

      
  // getWPnonce(){
  //   axios.get('http://192.168.0.105/wordpress/api/get_nonce/?controller=user&method=register')
  //   .then(res => {
  //     // this.insertData(res.data.nonce);
  //     console.log(res.data);
  //   }).catch(error => {
  //     console.log(error.response)
  // });

  // }
    render() {
        return (
            <Container>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>First Name</Label>
                        <Input onChangeText={(text) => this.setState({first_name: text})} value={this.state.first_name}type="text"/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Last Name</Label>
                        <Input onChangeText={(text) => this.setState({last_name: text})} value={this.state.last_name}type="text"/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input onChangeText={(text) => this.setState({user: {...this.state.user, username: text}})} value={this.state.user.username}  />
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input onChangeText={(text) => this.setState({user: {...this.state.user, email: text}})} value={this.state.user.email}  />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input value={this.state.user.password} onChangeText={(text) => this.setState({user: {...this.state.user, password: text}})} />
                    </Item>
                    <Button block success style={{ marginTop: 50 }} 
                    onPress={this.handleSubmit} >
                        <Text>Register</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
                
        )
    }
}


export default SignUpScreen;