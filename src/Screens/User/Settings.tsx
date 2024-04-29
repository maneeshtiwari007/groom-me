import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, Switch } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
export default class Settings extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            
        }
    }
    async componentDidMount() {
        //this.setState({ loader: true })
        await this.getApiData();
    }
    async getApiData() {
        CommonApiRequest.getUserSettings({}).then((response: any) => {
            this.setState({ loader: false });
            if (response?.status == 200) {
                this.setState({ notificationSetting: response?.results?.notification_status })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    toggleSwitch = value => {
        this.setState({ notificationSetting: value });
        setTimeout(()=>{
            this.updateSettings()
        },300)
    };

    toggleSwitch2 = value => {
        this.setState({ callSetting: value });
    };
    toggleSwitch3 = value => {
        this.setState({ locationSetting: value });
    };
    async formateData(){
        return {
            notification_status:this.state.notificationSetting
        }
    }
    async updateSettings(){
        const settingFormate = await this.formateData();
        CommonApiRequest.updateUserSettings(settingFormate).then((response: any) => {
            this.setState({ loader: false });
            if (response?.status == 200) {
                
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.getApiData() }}
                otherText="Settings"
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={false}
                scollEnabled={true}
            >
                <View style={ThemeStyling.container}>
                    <View style={{ borderBottomWidth: 1, borderBlockColor: Colors.gray400, borderStyle: "solid" }}>
                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginBottom: 5, fontWeight: '700' }]}>Settings</Text>
                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                            <View>
                                <Text style={{ color: Colors.gray_color }}>Notification</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.notificationSetting}
                                    trackColor={{false:Colors.gray400,true:Colors.primary_color}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                            <View>
                                <Text style={{ color: Colors.gray_color }}>Call</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleSwitch2}
                                    value={this.state.callSetting}
                                    trackColor={{false:Colors.gray400,true:Colors.primary_color}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                            <View>
                                <Text style={{ color: Colors.gray_color }}>Location</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleSwitch3}
                                    value={this.state.locationSetting}
                                    trackColor={{false:Colors.gray400,true:Colors.primary_color}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBlockColor: Colors.gray400, borderStyle: "solid", marginBottom: 10 }}>
                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginBottom: 5, fontWeight: '700' }]}>General</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: Colors.gray_color }}>About App</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: Colors.gray_color }}>Privacy Policy</Text>
                    </View>
                </View>
            </MainLayout >
        );
    }
}