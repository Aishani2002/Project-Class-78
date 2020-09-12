import React,{Componenet} from 'react';
import {View,Text,TextInput,TouchableOpacity,Modal,KeyboardAvoidingView,Alert,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import SantaAnimation from '../components/SantaClaus';
import {Avatar} from 'react-native-elements';

export default class WelcomeScreen extends Component {
    constructor (){
        super();
        this.state={
            emailId:"",
            password:"",
            isModalVisible:false,
            firstName:"",
            lastName:"",
            address:"",
            contact:"",
            confirmPassowrd:"",
        }
    }

    userSignUp=(emailId, password,confirmPassword)=>{
        if(password!==confirmPassowrd) {
            return Alert.alert("Password doesn't match\n Check you password")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password,)
        .then((response)=>{
            return(
                Alert.alert("User added sucessfully")
            )
        })

        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.message
            return(
                Alert.alert(errorMessage)
            )
        })
        db.collection("users").add({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact,
            email_id:this.state.emailId,
            address:this.state.address
        })
    }
}

    showModal=()=>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}>
<View style={styles.modalContainer}>
<ScrollView style={{width:"100%"}}>
<KeyboardAvoidingView>
<Text style={styles.modalTitle}>
Registration
</Text>
<TextInput style={styles.formTextInput}
placeholder={"First Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({firstName: text})
}}
/>

<TextInput style={styles.formTextInput}
placeholder={"Last Name"}
maxLength={8}
onChangeText={(text)=>{
this.setState({lastName: text})
}}
/>

<TextInput style={styles.formTextInput}
placeholder={"\Contact"}
maxLength={10}
keyboardType={"numeric"}
onChangeText={(text)=>{
this.setState({contact: text})
}}
/>

<TextInput style={styles.formTextInput}
placeholder={"Address"}
multiline={true}
onChangeText={(text)=>{
this.setState({address: text})
}}
/>

<TextInput style={styles.formTextInput}
placeholder={"Email Address"}
keyboardType={"email-address"}
onChangeText={(text)=>{
this.setState({emailId: text})
}}
/>

<TextInput style={styles.formTextInput}
placeholder={"Password"}
secureTextEntry={true}
onChangeText={(text)=>{
this.setState({password: text})
}}
/>

<TextInput style={styles.formTextInput}
placeholder={"Confirm Password"}
secureTextEntry={true}
onChangeText={(text)=>{
this.setState({confirmPassowrd: text})
}}
/>

<View style={styles.modalBackButton}>
    <TouchableOpacity style={styles.registerButton} 
    onPress={()=>{
        this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassowrd)
    }}>
<Text style={styles.registerButtonText}> Register</Text>
    </TouchableOpacity>
</View>

<View style={styles.modalBackButton}>
    <TouchableOpacity style={styles.cancelButton} 
    onPress={()=>{
        this.setState({"isModalVisible":false})
    }}>
<Text style={{color:"ff5722"}}> Cancel</Text>
    </TouchableOpacity>
</View>
</KeyboardAvoidingView>
</ScrollView>
</View>
            </Modal>
        )
    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then((response)=>{
            return(
                Alert.alert("Sucessfully logged in")
            )
        })

        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.message
            return(
                Alert.alert(errorMessage)
            )
        })
    }

render() {
    return (
        <View style={styles.container}>
            <View style={{justifyContent:"center",alignItems: "center"}}>
             {this.showModal()}
            </View>
            <View>
            <SantaAnimation/>
            <Text style={styles.title}> Book Santa </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TextInput style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType="email-address"
                onChangeText={(text)=>{this.setState({emailId:text})}}
                />
                <TextInput style={styles.loginBox}
                placeholder="Enter password"
                secureTextEntry={true}
                onChangeText={(text)=>{this.setState({password:text})}}
                />

                <TouchableOpacity style={styles.button,{marginBottom:20,marginTop:20}} 
                onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button,{marginBottom:20,marginTop:20}} 
                onPress={()=>{this.userSignUp(this.state.emailId,this.state.password)}}>
                    <Text style={styles.buttonText}> Sign Up </Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f8be85"
    },

    loginBox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:"#ff8a65",
        fontSize:20,
        margin:10,
        paddingLeft:10,
    },
     button:{
         width:300,
         height:50,
         justifyContent: "center",
         alignItems: "center",
         borderRadius:25,
         backgroundColor:"#ff8900",
         shadowColor:"#000000",
         shadowOffset:{width:0,height:8},
         shadowOpacity:0.30,
         shadowRadius:10.32,
         elevation:16
     },

     buttonText:{
         color:"#ffffff",
         fontWeight:"bold",
         fontSize:20,
     },

     buttonContainer:{
         flex:1,
         alignItems:"center",
     }
})