import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, TextInput, Modal, DeviceEventEmitter } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
import { Divider } from "react-native-paper";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Schedule from "../Schedule";
import SelectAddress from "./SelectAddress";
import { ConstantsVar } from "../../utilty/ConstantsVar";
import { format, formatDate } from "date-fns";
import ImageComponent from "../../Components/Common/ImageComponent";
export default class ReviewCart extends Component<ScreenInterfcae, CommonScreenStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            commonData: [1, 2, 3, 4, 5],
            count: '$0',
            visible: false,
            visisbleAddress: false,
            isDisable: true
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        this.getApiData(this.props.route?.params?.data);
        this.setState({ dataObj: this.props.route?.params?.data, userObj: this.props.route?.params?.prof, count: await CommonHelper.getTotalPriceCount(this.props.route?.params?.data) });
        if (this.props.route?.params?.prof?.live) {
            this.setState({ bookingType: 'live', isDisable: false })
        } else {
            this.setState({ bookingType: undefined, isDisable: true })
        }
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    getApiData(params) {
        CommonApiRequest.getPriceCalculated({ services: params }).then((response: any) => {
            this.setState({ loader: false });
            if (response?.status == 200) {
                this.setState({ otherData: response?.data });
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    payment() {
        if (this.state.bookingType) {
            if (this.state.bookingType !== 'mobile') {
                this.props?.navigation?.navigate("Payment", { 
                    dataObj: this.state?.dataObj, 
                    userObj: this.state?.userObj, 
                    otherData: this.state?.otherData, 
                    remark: this?.state?.remark, 
                    bookingType: this.state.bookingType, 
                    slot: this.state.slot, 
                    slotKey: this.state.slotKey, 
                    bookingDate: this.state.date,
                    //address: this.state.commonData,
                    time_slot: this.state.slotKey + "__" + this.state.date 
                })
            } else {
                this.props?.navigation?.navigate("Addresses", { dataObj: this.state?.dataObj, userObj: this.state?.userObj, otherData: this.state?.otherData, remark: this?.state?.remark, bookingType: this.state.bookingType, slot: this.state.slot, slotKey: this.state.slotKey, bookingDate: this.state.date })
            }
        } else {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please select booking type!!", top: 20 } });
        }
    }
    selectBookingType(value: any) {
        this.setState({ bookingType: value })
        if (value === 'schedule' || value === 'mobile') {
            this.setState({ visible: true });
        }
    }
    disMissModal(data) {
        if (!data?.slot) {
            this.setState({ bookingType: undefined, selectedDate: data?.selectedDate });
        } else {
            this.setState({ selectedDate: CommonHelper.getCurrentDate(data?.selectedDate), slot: data?.slot, date: formatDate(data?.selectedDate, 'y-MM-dd'), slotKey: data?.slotKey })
        }
        this.setState({ visible: false });
    }
    disMissAddressModal(data) {
        this.setState({ visisbleAddress: false });
    }
    render() {
        return (
            <>
                <MainLayout
                    otherText=""
                    loader={this.state?.loader}
                    containerStyle={{ paddingTop: 1 }}
                    navigation={this.props.navigation}
                    route={this.props.route}
                    scollEnabled={true}
                >
                    <KeyboardAwareScrollView style={{ width: '100%', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <ScrollView>
                                <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                                    <View style={ThemeStyling.card}>
                                        <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                            <View style={[ThemeStyling.twoColumnLayout]}>
                                                <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                                    <ImageComponent style={[ThemeStyling.cardImage2]} src={CommonHelper.getImageFromSource(this?.state?.userObj?.photo_image)} />
                                                </View>
                                                <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                                    <View style={{ marginBottom: 5 }}>
                                                        <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>{this.state?.userObj?.name}</Text>
                                                        <View style={[ThemeStyling.starRating, { marginBottom: 8 }]}>
                                                            {this.state?.commonData && this.state?.commonData?.map((itemNumber: any, index: number) => {
                                                                if (itemNumber <= this.state?.userObj?.profavgrating) {
                                                                    return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.primary_color} key={index} />
                                                                } else {
                                                                    return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} key={index} />
                                                                }
                                                            })}
                                                        </View>
                                                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                            <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                            <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.state?.userObj?.user_professional_details?.location}</Text></View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[ThemeStyling.threeColumnLayout]}>
                                        <View style={[ThemeStyling.col5, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                            <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                <AntDesign style={{ position: "relative", top: 2 }} name="calendar" size={13} color="black" />
                                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Date</Text>
                                            </View>
                                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{(this.state.selectedDate) ? this.state.selectedDate : CommonHelper.getCurrentDate()}</Text>
                                        </View>
                                        {/* <View style={[ThemeStyling.col3, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <AntDesign style={{ position: "relative", top: 2 }} name="clockcircleo" size={13} color="black" />
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Time</Text>
                                    </View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>10:00 - 12 AM</Text>
                                </View> */}
                                        <View style={[ThemeStyling.col5, { alignItems: "center" }]}>
                                            <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                <Feather style={{ position: "relative", top: 3 }} name="phone" size={13} color="black" />
                                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Phone Number</Text>
                                            </View>
                                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>+91(1234567891)</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: Colors.gray400, marginBottom: 10 }}></View>
                                <View style={{ marginVertical: 10 }}>
                                    {this.props.route?.params?.prof?.live && this.props.route?.params?.prof?.schedule && this.props.route?.params?.prof?.mobile &&
                                        <RadioButtonGroup radioStyle={{ width: 18, height: 18, marginRight: 3 }} selected={this.state.bookingType} radioBackground={Colors.primary_color} containerOptionStyle={{ marginHorizontal: 10 }} containerStyle={{ marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }} onSelected={(value) => this.selectBookingType(value)}>
                                            <RadioButtonItem value="live" label="Live Booking" />
                                            <RadioButtonItem
                                                value="schedule"
                                                label="Schedule Booking"
                                            />
                                            <RadioButtonItem
                                                value="mobile"
                                                label="Mobile Booking"
                                            />
                                        </RadioButtonGroup>
                                    }
                                    {this.props.route?.params?.prof?.live && !this.props.route?.params?.prof?.schedule && !this.props.route?.params?.prof?.mobile &&
                                        <RadioButtonGroup radioStyle={{ width: 18, height: 18, marginRight: 3 }} selected={this.state.bookingType} radioBackground={Colors.primary_color} containerOptionStyle={{ marginHorizontal: 10 }} containerStyle={{ marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }} onSelected={(value) => this.selectBookingType(value)}>
                                            <RadioButtonItem value="live" label="Live Booking" />
                                        </RadioButtonGroup>
                                    }
                                    {!this.props.route?.params?.prof?.live && this.props.route?.params?.prof?.schedule && !this.props.route?.params?.prof?.mobile &&
                                        <RadioButtonGroup radioStyle={{ width: 18, height: 18, marginRight: 3 }} selected={this.state.bookingType} radioBackground={Colors.primary_color} containerOptionStyle={{ marginHorizontal: 10 }} containerStyle={{ marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }} onSelected={(value) => this.selectBookingType(value)}>
                                            <RadioButtonItem
                                                value="schedule"
                                                label="Schedule Booking"
                                            />
                                        </RadioButtonGroup>
                                    }
                                    {!this.props.route?.params?.prof?.live && this.props.route?.params?.prof?.schedule && this.props.route?.params?.prof?.mobile &&
                                        <RadioButtonGroup radioStyle={{ width: 18, height: 18, marginRight: 3 }} selected={this.state.bookingType} radioBackground={Colors.primary_color} containerOptionStyle={{ marginHorizontal: 10 }} containerStyle={{ marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }} onSelected={(value) => this.selectBookingType(value)}>
                                            <RadioButtonItem
                                                value="schedule"
                                                label="Schedule Booking"
                                            />
                                            <RadioButtonItem
                                                value="mobile"
                                                label="Mobile Booking"
                                            />
                                        </RadioButtonGroup>
                                    }
                                    {this.props.route?.params?.prof?.live && this.props.route?.params?.prof?.schedule && !this.props.route?.params?.prof?.mobile &&
                                        <RadioButtonGroup radioStyle={{ width: 18, height: 18, marginRight: 3 }} selected={this.state.bookingType} radioBackground={Colors.primary_color} containerOptionStyle={{ marginHorizontal: 10 }} containerStyle={{ marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }} onSelected={(value) => this.selectBookingType(value)}>
                                            <RadioButtonItem
                                                value="live"
                                                label="Live Booking"
                                            />
                                            <RadioButtonItem
                                                value="schedule"
                                                label="Schedule Booking"
                                            />
                                        </RadioButtonGroup>
                                    }
                                    {!this.props.route?.params?.prof?.live && !this.props.route?.params?.prof?.schedule && this.props.route?.params?.prof?.mobile &&
                                        <RadioButtonGroup radioStyle={{ width: 18, height: 18, marginRight: 3 }} selected={this.state.bookingType} radioBackground={Colors.primary_color} containerOptionStyle={{ marginHorizontal: 10 }} containerStyle={{ marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }} onSelected={(value) => this.selectBookingType(value)}>
                                            <RadioButtonItem
                                                value="mobile"
                                                label="Mobile Booking"
                                            />
                                        </RadioButtonGroup>
                                    }
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: Colors.gray400, marginBottom: 15 }}></View>
                                <View style={{ backgroundColor: Colors.primary_light_color, padding: 3, paddingTop: 5, paddingLeft: 15, marginBottom: 5, alignItems: 'center' }}>
                                    <Text style={[ThemeStyling.heading5, { margin: 0, color: Colors.primary_color }]}>Selected Services</Text>
                                </View>

                                <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                                    {this.state?.dataObj && this.state?.dataObj?.map((item, index) => {
                                        return <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]} key={index}>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{item?.service_name}</Text>
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{CommonHelper.returnPriceWithCurrency(item?.price)}</Text>
                                            </View>
                                        </View>
                                    })}

                                    <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Sub Total</Text>
                                        </View>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{this.state?.otherData?.subtotal}</Text>
                                        </View>
                                    </View>
                                    {this.state?.otherData?.tax && this.state?.otherData?.tax?.map((item, index) => {
                                        return <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]} key={index}>
                                            <View>
                                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{item?.name}</Text>
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{item?.price}</Text>
                                            </View>
                                        </View>
                                    })}
                                    <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Total Pay</Text>
                                        </View>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{this.state?.otherData?.total}</Text>
                                        </View>
                                    </View>
                                    <Divider bold={true} style={{ marginVertical: 10 }}></Divider>
                                    <View style={[{ justifyContent: "space-between", marginTop: 5 }]}>
                                        <View style={{ width: '100%', height: 'auto' }}>

                                            <TextInput
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={(text) => { this.setState({ remark: text }) }}
                                                value={this.state?.remark}
                                                style={{ minHeight: 90, borderRadius: 5, borderWidth: 1, borderColor: Colors.gray400, fontSize: 12, padding: 5 }}
                                                placeholder="Please enter your remarks here...." />
                                        </View>
                                    </View>
                                </View>

                            </ScrollView>

                        </View>

                    </KeyboardAwareScrollView>

                    <Modal
                        visible={this.state.visible}
                        transparent={false} >
                        <Schedule onDismiss={(data: any) => this.disMissModal(data)} data={this.props.route?.params?.prof}></Schedule>
                    </Modal>
                    <Modal visible={this.state.visisbleAddress} transparent={false} >
                        <SelectAddress onDismiss={(data) => { this.disMissAddressModal(data) }}></SelectAddress>
                    </Modal>
                </MainLayout>
                {this.state?.otherData?.total &&
                    <View style={[ThemeStyling.ForBottomOfSCreen, { paddingHorizontal: 15, paddingVertical: 2, marginBottom: 10 }]}>
                        <Pressable onPress={() => { this.payment() }} style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, opacity: (this.state?.otherData?.total && this.state.bookingType) ? 1 : 0.5 }]} disabled={(this.state?.otherData?.total && this.state.bookingType) ? false : true}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Pay {this.state?.otherData?.total}</Text>
                        </Pressable>
                    </View>
                }
            </>
        );
    }
}