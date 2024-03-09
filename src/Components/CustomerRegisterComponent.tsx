import { Component } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Text, View, Pressable, Image, ScrollView, Dimensions, Button, Touchable, Platform, ActivityIndicator, DeviceEventEmitter } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormGroup from "./Common/FormGroup";
import InputComponent from "./Common/InputComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import RegisterUserInterface from "../Interfaces/States/RegisterUserInterface";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { ConstantsVar } from "../utilty/ConstantsVar";

export default class CustomerRegisterComponent extends Component<ScreenInterfcae, RegisterUserInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phone_no: '',
            role: 2,
            type: 'customer',
            isDisable: true,
            isConfirmPassError: false,
            confirmPassError: '',
            loader:false
        }
    }
    checkValidation() {
        if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.c_password !== '') {
            if (this.state.c_password !== this.state.password) {
                this.setState({ isConfirmPassError: true, confirmPassError: 'Password and confirm password must be same', isDisable: true });
            } else {
                this.setState({ isConfirmPassError: false, confirmPassError: '', isDisable: false });
            }
        } else {
            this.setState({ isDisable: true });
        }
    }
    upDateMasterState(attr: any, value: any) {
        this.setState({ [attr]: value });
        setTimeout(() => {
            this.checkValidation();
        }, 500);

    }
    navigateToLogin() {
        this.props.navigation.navigate("LoginScreen");
    }
    registerUser() {
        const sendUser = {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "c_password": this.state.c_password,
            "phone_no": this.state.phone_no,
            "location": "delhi",
            "udid": this.state.pushToken,
            "role": this.state.role,
            "type": this.state.type
        }
        this.setState({ loader:true });
        CommonApiRequest.registerUser(sendUser).then((response) => {
            this.setState({ loader:false });
            if (response?.code === 201) {
                setTimeout(()=>{
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'User register successfully!!', top: 20 } });
                    this.props.navigation.navigate("LoginScreen");
                },500);
            }
        }).catch((err) => {
            this.setState({ loader:false });
        });
    }

    async registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: '2d96f7ce-3031-4897-aa5e-dcff8a899bb2',
            });
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token?.data;
    }
    async componentDidMount() {
        const token = await this.registerForPushNotificationsAsync();
        this.setState({ pushToken: token });
    }
    render() {
        return <>
        {this.state?.loader &&
                    <View style={ThemeStyling.loader}>
                        <ActivityIndicator size="large" color={Colors.primary_color} />
                    </View>
                }
        <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ paddingTop: 45, height: '100%', zIndex: 1, position: 'relative', backgroundColor: '#ebebff' }}>
            <KeyboardAwareScrollView style={{ width: '100%', height: '100%' }}>
                <View style={{ height: '100%' }}>
                    <ScrollView contentContainerStyle={[ThemeStyling.container, { flex: 1 }]}>
                        <View style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                            <View>
                                <Text style={[ThemeStyling.heading2, { textAlign: "center" }]}>Register!</Text>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.text1, { textAlign: "center" }]}>Register as customer</Text>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent keyboardType="default" textContentType={'name'} attrName={'name'} value={this.state?.name} secureTextEntry={false} placeholder={"Fullname"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent keyboardType="email-address" textContentType={'name'} attrName={'email'} value={this.state?.email} secureTextEntry={false} placeholder={"Email"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent keyboardType="phone-pad" attrName={'phone_no'} value={this.state?.phone_no} secureTextEntry={false} placeholder={"Phone No."} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'password'} textContentType={'newPassword'} secureTextEntry={true} value={this.state?.password} placeholder={"Password"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                </FormGroup>
                            </View>
                            <View>
                                <FormGroup>
                                    <InputComponent attrName={'c_password'} textContentType={'newPassword'} secureTextEntry={true} value={this.state?.c_password} placeholder={"Confirm Password"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                    {this.state.isConfirmPassError &&
                                        <Text style={{ color: Colors.primary_color }}>{this.state.confirmPassError}</Text>
                                    }
                                </FormGroup>
                            </View>
                            <View style={[ThemeStyling.btnContainer, { marginBottom: 10, marginTop: 10 }]}>
                                <Pressable style={[ThemeStyling.btnPrimary, (this.state.isDisable) ? ThemeStyling.disable : {}, { width: Dimensions.get('window').width - 30 }]} onPress={() => { this.registerUser() }} disabled={this.state?.isDisable}>
                                    <Text style={ThemeStyling.btnText}>Register</Text>
                                </Pressable>
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
        </>
    }
}