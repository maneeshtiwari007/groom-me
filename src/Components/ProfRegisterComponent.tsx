import { Component } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Text, View, Pressable, Image, ScrollView, Dimensions } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormGroup from "./Common/FormGroup";
import InputComponent from "./Common/InputComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import RegisterUserInterface from "../Interfaces/States/RegisterUserInterface";

export default class ProfRegisterComponent extends Component<ScreenInterfcae, RegisterUserInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phone_no: '',
            role:4,
            type:'professionalist'
        }
    }
    upDateMasterState(attr: any, value: any) {
        this.setState({ [attr]: value });
    }
    navigateToLogin() {
        this.props.navigation.navigate("LoginScreen");
    }
    render() {
        return <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ paddingTop: 45,  height: '100%', zIndex: 1, position: 'relative', backgroundColor: '#ebebff' }}>
            <KeyboardAwareScrollView style={{ width: '100%', height: '100%'}}>
                <View style={{ height: '100%' }}>
                    <ScrollView contentContainerStyle={[ThemeStyling.container, { flex: 1 }]}>
                        <View style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                            <View>
                                <Text style={[ThemeStyling.heading2, { textAlign: "center" }]}>Register!</Text>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.text1, { textAlign: "center" }]}>Register as Professional</Text>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'name'} value={this.state?.email} secureTextEntry={false} placeholder={"Fullname"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'email'} value={this.state?.email} secureTextEntry={false} placeholder={"Email"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'phone'} value={this.state?.email} secureTextEntry={false} placeholder={"Phone No."} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'password'} secureTextEntry={true} value={this.state?.password} placeholder={"Password"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'confirmPass'} secureTextEntry={true} value={this.state?.password} placeholder={"Confirm Password"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View style={[ThemeStyling.btnContainer, { marginBottom: 60 }]}>
                                <TouchableOpacity style={[ThemeStyling.btnPrimary]} onPress={() => { this.props.onClickResponse(this.state) }} disabled={this.state?.isDisable}>
                                    <Text style={ThemeStyling.btnText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[ThemeStyling.footer]}>
                                <TouchableOpacity onPress={() => { this.navigateToLogin() }} style={[ThemeStyling.btnLink, { display: 'flex', flexDirection: "row", justifyContent: "center" }]}>
                                    <Text>Already have an account?</Text><Text style={ThemeStyling.btnText2}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>

        </ScrollView>
    }
}