import { Component } from "react";
import { Text, Button, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, DeviceEventEmitter } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import InputComponent from "../Components/Common/InputComponent";
import FormGroup from "../Components/Common/FormGroup";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { CommonHelper } from "../utilty/CommonHelper";
import { ConstantsVar } from "../utilty/ConstantsVar";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Snackbar } from "react-native-paper";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
export default class LoginScreen extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isDisable: false,
            loader: false,
            visible: false,
        }
    }
    navigateToRegister() {
        this.props.navigation.navigate("Register");
    }
    loginUser() {
        this.setState({ isDisable: true });
        //this.props.navigation.navigate("AppContainer");
        this.setState({ loader: true });
        CommonApiRequest.loginUser(this.state).then((response: any) => {
            this.setState({ loader: false });
            this.setState({ isDisable: false });
            if (response?.code == 200) {
                if (response?.error === true) {
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.message, top: 20 } });
                } else {
                    CommonHelper.saveStorageData(ConstantsVar.USER_STORAGE_KEY, JSON.stringify(response?.results));
                    if (response?.results?.type == 2) {
                        setTimeout(()=>{
                            this.props.navigation.navigate("UserIntroSlider");
                        },500)
                    } else if (response?.results?.type == 4) {
                        this.props.navigation.navigate("ProfIntroSlider");
                    } else {
                        this.props.navigation.navigate("AppContainer");
                    }
                }
            }
        }).catch((eeror) => {
            this.setState({ loader: false });
            this.setState({ isDisable: false });
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please enter valid email and password", top: 20 } });
        })
    }
    upDateMasterState(attr: any, value: any) {
        this.setState({ [attr]: value });
    }
    async componentDidMount() {
        const token = await CommonHelper.getData(ConstantsVar.NOTIFICATION_STORAGE_KEY);
        this.setState({uidToken:token?.token});
        DeviceEventEmitter.addListener(ConstantsVar.API_ERROR, (data: any) => {
            this.setState({ visible: true })
            this.setState({
                color: data?.color,
                msgData: data?.msgData
            })
            if (data?.top) {
                this.setState({
                    top: data?.top
                });
            }
        });
    }
    render() {
        return (
            <>
                {this.state?.loader &&
                    <View style={ThemeStyling.loader}>
                        <ActivityIndicator size="large" color={Colors.primary_color} />
                    </View>
                }
                <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ paddingTop: 45, height: '100%', zIndex: 1, position: 'relative', backgroundColor: '#ebebff' }}>
                    <Snackbar
                        visible={(this.state?.visible) ? true : false}
                        onDismiss={() => this.setState({ visible: false })}
                        duration={3000}
                        style={{ backgroundColor: this.state.color, top: 0 }}
                        wrapperStyle={{ top: this.state.top }}
                    >
                        <View>
                            {this.state?.msgData?.head &&
                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, color: Colors.white }]}>{this.state?.msgData?.head} : </Text>
                            }
                            {this.state?.msgData?.subject &&
                                <Text style={[ThemeStyling.text1, { fontWeight: '400', color: Colors.white, marginBottom: 0, flexWrap: 'wrap' }]}>{this.state?.msgData?.subject}</Text>
                            }
                        </View>
                    </Snackbar>
                    <KeyboardAwareScrollView style={{ width: '100%', height: Dimensions.get('window').height - 45 }}>
                        <View style={{ height: Dimensions.get('window').height - 45 }}>
                            <ScrollView contentContainerStyle={[ThemeStyling.container, { flex: 1 }]}>
                                <View style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                                    <View style={[ThemeStyling.imagecontainer, { marginBottom: 40 }]}>
                                        <Image style={ThemeStyling.image} source={require('../../assets/staticimages/logo.png')} />
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading2, { textAlign: "center" }]}>Welcome back!</Text>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.text1, { textAlign: "center" }]}>Sign in to continue</Text>
                                    </View>
                                    <View>
                                        <FormGroup>
                                            <InputComponent keyboardType="email-address" attrName={'email'} value={this.state?.email} secureTextEntry={false} placeholder={"Username or email"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                        </FormGroup>
                                    </View>
                                    <View>
                                        <FormGroup>
                                            <InputComponent attrName={'password'} secureTextEntry={true} value={this.state?.password} placeholder={"Password"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }}></InputComponent>
                                        </FormGroup>
                                    </View>
                                    <View style={[ThemeStyling.btnContainer, { marginBottom: 60 }]}>
                                        <TouchableOpacity style={[ThemeStyling.btnPrimary]} onPress={() => { this.loginUser() }} disabled={this.state?.isDisable}>
                                            <Text style={ThemeStyling.btnText}>Sign In</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[ThemeStyling.footer]}>
                                        <TouchableOpacity onPress={() => { this.props?.navigation?.navigate("Register") }} style={[ThemeStyling.btnLink, { display: 'flex', flexDirection: "row", justifyContent: "center" }]}>
                                            <Text>Don't have and account?</Text><Text style={ThemeStyling.btnText2}>Sign up</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>

                        </View>
                    </KeyboardAwareScrollView>

                </ScrollView>
            </>
        );
    }
}