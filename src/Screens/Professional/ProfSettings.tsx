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
export default class ProfSettings extends Component<
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
                console.log(response);
                if (response?.status == 200) {
                    this.setState({
                        notificationSetting: response?.results?.notification_status,
                        sch_available: response?.results?.sch_available,
                        live_available: response?.results?.available_status,
                        dataObj: response?.results,
                        mobile_status: response?.results?.mobile
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
    toggleForMobileSwitch = (value) => {
        this.setState({ mobile_status: value });
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
            mobile: (this.state?.mobile_status)?this.state?.mobile_status:false
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
        console.log(settingFormate);
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
                otherText="Settings"
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={false}
                scollEnabled={true}
            >
                <View style={ThemeStyling.container}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBlockColor: Colors.gray400,
                            borderStyle: "solid",
                        }}
                    >
                        <Text
                            style={[
                                ThemeStyling.heading5,
                                {
                                    color: Colors.dark_color,
                                    marginBottom: 5,
                                    fontWeight: "700",
                                },
                            ]}
                        >
                            Settings
                        </Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <View
                            style={[
                                ThemeStyling.twoColumnLayout,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <View>
                                <Text style={{ color: Colors.gray_color }}>Notification</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.notificationSetting}
                                    trackColor={{
                                        false: Colors.gray400,
                                        true: Colors.primary_color,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <View
                            style={[
                                ThemeStyling.twoColumnLayout,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <View>
                                <Text style={{ color: Colors.gray_color }}>Live Booking</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleForLiveSwitch}
                                    value={this.state.live_available}
                                    trackColor={{
                                        false: Colors.gray400,
                                        true: Colors.primary_color,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <View
                            style={[
                                ThemeStyling.twoColumnLayout,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <View>
                                <Text style={{ color: Colors.gray_color }}>
                                    Schedule Booking
                                </Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleForSchSwitch}
                                    value={this.state.sch_available}
                                    trackColor={{
                                        false: Colors.gray400,
                                        true: Colors.primary_color,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <View
                            style={[
                                ThemeStyling.twoColumnLayout,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <View>
                                <Text style={{ color: Colors.gray_color }}>
                                    Mobile Booking
                                </Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={this.toggleForMobileSwitch}
                                    value={this.state.mobile_status}
                                    trackColor={{
                                        false: Colors.gray400,
                                        true: Colors.primary_color,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    {this.state.dataObj?.workingSlot?.startTime && this.state.sch_available &&
                        <>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBlockColor: Colors.gray400,
                                    borderStyle: "solid",
                                    marginBottom: 10,
                                    marginVertical: 15
                                }}
                            >
                                <Text
                                    style={[
                                        ThemeStyling.heading5,
                                        {
                                            color: Colors.dark_color,
                                            marginBottom: 5,
                                            fontWeight: "700",
                                        },
                                    ]}
                                >
                                    Manage Start And Stop Time
                                </Text>
                            </View>
                            {this.state.dataObj?.workingSlot?.startTime &&
                                <View >
                                    <View>
                                        <FormGroup>
                                            <Text style={{ marginBottom: 5 }}>Start Time</Text>
                                            <SelectList
                                                data={this.state.objStartTime}
                                                boxStyles={{ borderRadius: 10, borderStyle: 'solid', borderColor: Colors.gray400, minHeight: 55, alignItems: 'center' }}
                                                setSelected={(val) => { this.setState({ start_time: val }); this.updateTimeSettings('startTime', val) }} save="key" search={false}
                                                placeholder="Select start time"
                                                defaultOption={this.state.dataObj?.getStartStopTime?.startTimeObj} />

                                        </FormGroup>
                                    </View>
                                </View>
                            }
                            {this.state.dataObj?.workingSlot?.stopTime &&
                                <View>
                                    <View>
                                        <FormGroup>
                                            <Text style={{ marginBottom: 5 }}>Stop Time</Text>
                                            <SelectList
                                                data={this.state.objStopTime}
                                                boxStyles={{ borderRadius: 10, borderStyle: 'solid', borderColor: Colors.gray400, minHeight: 55, alignItems: 'center' }}
                                                setSelected={(val) => { this.setState({ stop_time: val }); this.updateTimeSettings('stopTime', val) }} save="key" search={false}
                                                placeholder="Select stop time"
                                                defaultOption={this.state.dataObj?.getStartStopTime?.stopTimeObj} />
                                        </FormGroup>
                                    </View>
                                </View>
                            }
                        </>
                    }
                </View>
            </MainLayout>
        );
    }
}
