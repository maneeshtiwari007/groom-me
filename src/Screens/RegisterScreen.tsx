import { Component } from "react";
import { Text, Button, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormGroup from "../Components/Common/FormGroup";
import InputComponent from "../Components/Common/InputComponent";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { TabBar, TabView } from "react-native-tab-view";
import { CommonHelper } from "../utilty/CommonHelper";
import CustomerRegisterComponent from "../Components/CustomerRegisterComponent";
import Colors from "../utilty/Colors";
import ProfRegisterComponent from "../Components/ProfRegisterComponent";
export default class RegisterScreen extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phone: '',
            isDisable: false,
            loader: false,
            index: 0,
            routes: [
                { key: 1, title: 'Customer' },
                { key: 2, title: 'Professional' }
            ],
        }
    }
    RegisterUser() {

    }
    upDateMasterState(attr: any, value: any) {
        this.setState({ [attr]: value });
    }
    _renderScene = ({ route }) => {
        switch (route.key) {
            case 1:
                return <CustomerRegisterComponent data={this.state?.dataObj} onClickResponse={(data) => { this.setState({ commonData: data?.data }); }} navigation={this.props.navigation}></CustomerRegisterComponent>;
            case 2:
                return <ProfRegisterComponent data={this.state?.dataObj} onClickResponse={(data) => { this.setState({ commonData: data?.data }); }} navigation={this.props.navigation}></ProfRegisterComponent>;
            default:
                return null;
        }
    };
    _renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={Colors.primary_color}
            inactiveColor={Colors.secondry_color}
            style={{ backgroundColor: 'white', paddingTop: 5, paddingBottom: 5, borderColor: Colors.primary_color }}
        />
    );
    render() {
        return (
            <>
                <ScrollView style={{ height: '100%', marginTop: 45, backgroundColor: '#ebebff' }}>
                    <TabView
                        navigationState={{ index: this.state.index, routes: this.state.routes }}
                        renderScene={this._renderScene}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        style={{ height: Dimensions.get('screen').height, backgroundColor: '#ebebff' }}
                        renderTabBar={this._renderTabBar}
                    />
                </ScrollView>
            </>
        );
    }
}