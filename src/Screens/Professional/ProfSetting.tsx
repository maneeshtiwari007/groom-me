import { Component, ReactNode } from "react";
import {
    FontAwesome,
    MaterialCommunityIcons,
    Feather,
    FontAwesome5,
    AntDesign,
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, Switch } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from "expo-location";
import { CommonHelper } from "../../utilty/CommonHelper";
import FormGroup from "../../Components/Common/FormGroup";
import { SelectList } from "react-native-dropdown-select-list";
export default class ProfSetting extends Component<
    ScreenInterfcae,
    CommonScreenStateInterface
> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: "map",
        };
    }
    async componentDidMount() {
        await this.getApiData();
    }
    async getApiData() {
        this.setState({ loader: true });
        CommonApiRequest.getUserSettings({})
            .then((response: any) => {
                this.setState({ loader: false });
                if (response?.status == 200) {
                    this.setState({
                        notificationSetting: response?.results?.notification_status,
                        sch_available: response?.results?.sch_available,
                        live_available: response?.results?.available_status,
                        dataObj: response?.results,
                    });
                    if (this.state.dataObj?.workingSlot?.startTime) {
                        const objStartKeys = Object.keys(this.state.dataObj?.workingSlot?.startTime);
                        const objStopKeys = Object.keys(this.state.dataObj?.workingSlot?.stopTime);
                        const dataToPushStartTime = (this.state.objStartTime) ? this.state.objStartTime : [];
                        const dataToPushStopTime = (this.state.objStopTime) ? this.state.objStopTime : [];
                        objStartKeys?.map(item => {
                            dataToPushStartTime.push({ key: item, value: this.state.dataObj?.workingSlot?.startTime?.[item] });
                            this.setState({ objStartTime: dataToPushStartTime })
                        });
                        objStopKeys?.map(item => {
                            dataToPushStopTime.push({ key: item, value: this.state.dataObj?.workingSlot?.stopTime?.[item] });
                            this.setState({ objStopTime: dataToPushStopTime })
                        });
                    }
                }
            })
            .catch((error) => {
                this.setState({ loader: false });
            });
    }
    toggleSwitch = (value) => {
        this.setState({ notificationSetting: value });
        setTimeout(() => {
            this.updateSettings();
        }, 300);
    };
    toggleForLiveSwitch = (value) => {
        this.setState({ live_available: value });
        setTimeout(() => {
            this.updateAvlStatus();
        }, 300);
    };
    toggleForSchSwitch = (value) => {
        this.setState({ sch_available: value });
        setTimeout(() => {
            this.updateAvlStatus();
        }, 300);
    };
    async formateData() {
        return {
            status: this.state.notificationSetting,
        };
    }
    async formateAvlData() {
        return {
            status: this.state.live_available,
            sch_status: this.state.sch_available,
        };
    }
    async formateForTimeData(type: any = '', value: any = '') {
        return {
            type: type,
            time: value
        };
    }
    async updateSettings() {
        const settingFormate = await this.formateData();
        CommonApiRequest.updateProfNotification(settingFormate)
            .then((response: any) => {
                this.setState({ loader: false });
                if (response?.status == 200) {
                }
            })
            .catch((error) => {
                this.setState({ loader: false });
            });
    }
    async updateAvlStatus() {
        const settingFormate = await this.formateAvlData();
        CommonApiRequest.updateProfAvliableStatus(settingFormate)
            .then((response: any) => {
                this.setState({ loader: false });
                if (response?.status == 200) {
                }
            })
            .catch((error) => {
                this.setState({ loader: false });
            });
    }
    async updateTimeSettings(type: any, value: any) {
        this.setState({ loader: true })
        const settingFormate = await this.formateForTimeData(type, value);
        CommonApiRequest.updateUserSettings(settingFormate)
            .then((response: any) => {
                this.setState({ loader: false });
                if (response?.status == 200) {

                }
            })
            .catch((error) => {
                this.setState({ loader: false });
            });
    }
    setStartTime(time: any) {
        this.setState({ start_time: time });

    }
    setStopTime(time: any) {
        this.setState({ start_time: time });
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => {
                    this.getApiData();
                }}
                otherText="Booking Details"
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={false}
                scollEnabled={true}
            >
                <View style={{ height: 'auto', flex: 1 }}>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 10 }}>
                                <Image style={[ThemeStyling.cardImage3]} source={require('../../../assets/staticimages/avatar.jpg')} />
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Mane Beautilocks</Text>
                                <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Groom Me Technologies Inc.
                                        2411 Newcastle Crescent,
                                        Oakville, ON
                                        L6M 4P9</Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { backgroundColor: Colors.danger100, marginBottom: 10 }]}>
                            <View style={[ThemeStyling.cardBody, { padding: 10 }]}>
                                <View style={[ThemeStyling.twoColumnLayout]}>
                                    <View style={{ marginRight: 10 }}>
                                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                            <View><AntDesign name="calendar" size={18} style={{ color: Colors.dark_color, marginRight: 5 }} /></View>
                                            <View><Text style={[ThemeStyling.text2, { color: Colors.dark_color }]}>Fri, 12 Jun</Text></View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                            <View><AntDesign name="clockcircleo" size={18} style={{ color: Colors.dark_color, marginRight: 5 }} /></View>
                                            <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.dark_color }]}>2Pm - 4Pm</Text></View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Booking Number</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading5, {fontWeight: '700', color: Colors.success_color, textTransform: "uppercase", marginBottom: 0 }]}>#MFJKU966948</Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10, borderBottomWidth: 4, borderBottomColor: Colors.gray200, }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                <View>
                                    <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Service List</Text>
                                </View>
                                <View style={ThemeStyling.serviceCounter}>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '700', marginBottom: 0, color: Colors.primary_color }]}>3</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 5, marginBottom: 5 }}>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Men's Fancy Hair Cut</Text>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>20 Min</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>$20</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 5, marginBottom: 5 }}>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Hair Spa</Text>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>30 Min</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>$50.08</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Oil Treatment</Text>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>30 Min</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>$30.14</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 8, marginBottom: 8 }}>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>Item Total</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>$150.43</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 8, marginBottom: 8 }}>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>Vat Tax</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>$3.075</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.success_color }]}>Special discount</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.success_color }]}>-$2.15</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <View>
                                <Text style={[ThemeStyling.heading2, { fontWeight: '700', color: Colors.dark_color }]}>Grand Total</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading2, { fontWeight: '700', color: Colors.dark_color }]}>$198.26</Text>
                            </View>
                        </View>
                        <View style={[ThemeStyling.card, { backgroundColor: Colors.danger100, marginBottom: 20 }]}>
                            <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <View>
                                        <View style={[ThemeStyling.twoColumnLayout]}>
                                            <View style={{ marginRight: 10 }}>
                                                <FontAwesome name="cc-visa" size={34} style={{ color: Colors.dark_color }} />
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Payment Successfull</Text>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Payment by Card</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <MaterialCommunityIcons name="check-decagram" size={34} style={{ color: Colors.success_color }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={ThemeStyling.col5}>
                                <Pressable style={[ThemeStyling.btnOutlinedark]} >
                                    <Text style={[ThemeStyling.btnText,{color:Colors.dark_color}]}>Reschedule</Text>
                                </Pressable>
                            </View>
                            <View style={ThemeStyling.col5}>
                                <Pressable style={[ThemeStyling.btnPrimary]} >
                                    <Text style={ThemeStyling.btnText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}
