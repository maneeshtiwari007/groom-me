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
        //const location = await Location.getCurrentPositionAsync({});
        // this.setState({ location: location })
        // const params = "latitude=" + location?.coords?.latitude + "&longitude=" + location?.coords?.longitude + "&cat=" + this.props?.route?.params?.data?.id
        // CommonApiRequest.getProfListsForUser(params).then((response: any) => {
        //     this.setState({ loader: false })
        //     if (response?.status == 200) {
        //         this.setState({ dataObj: response?.results })
        //     }
        // }).catch((error) => {
        //     this.setState({ loader: false })
        // })
    }
    getMarkerView() {
        if (this.state?.dataObj?.length) {

        }
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    //Initial state false for the switch. You can change it to true just to see.
    state = { switchValue: false };
    state2 = { switchValue2: false };

    toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value });
        //state changes according to switch
        //which will result in re-render the text
    };

    toggleSwitch2 = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue2: value });
        //state changes according to switch
        //which will result in re-render the text
    };
    toggleSwitch3 = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue3: value });
        //state changes according to switch
        //which will result in re-render the text
    };
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.getApiData() }}
                otherText="Settings"
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={true}
                scollEnabled={false}
            >
                <View style={ThemeStyling.container}>
                    <View style={{ borderBottomWidth: 1, borderBlockColor: Colors.gray400, borderStyle: "solid" }}>
                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginBottom: 5, fontWeight: '700' }]}>Settings</Text>
                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                            <View>
                                <Text style={{ color: Colors.gray_color }}>{this.state.switchValue ? 'Notification' : 'Notification'}</Text>
                            </View>
                            <View>
                                {/*Text to show the text according to switch condition*/}
                                {/* <Text>{this.state.switchValue ? 'Notifications ON' : 'Notifications OFF'}</Text> */}

                                {/*Switch with value set in constructor*/}
                                {/*onValueChange will be triggered after switch condition changes*/}
                                <Switch
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.switchValue}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                            <View>
                                <Text style={{ color: Colors.gray_color }}>{this.state.switchValue2 ? 'Call' : 'Call'}</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleSwitch2}
                                    value={this.state.switchValue2}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                            <View>
                                <Text style={{ color: Colors.gray_color }}>{this.state.switchValue3 ? 'Location' : 'Location'}</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleSwitch3}
                                    value={this.state.switchValue3}
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