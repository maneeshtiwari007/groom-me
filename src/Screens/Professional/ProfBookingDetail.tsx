import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, Modal, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform, DeviceEventEmitter, Alert } from 'react-native';
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
import Badge from "../../Components/Common/Badge";
import ReviewStarComponent from "../../Components/Common/ReviewStarComponent";
import { ConstantsVar } from "../../utilty/ConstantsVar";
import { OtpInput } from "react-native-otp-entry";
export default class ProfBookingDetail extends Component<ScreenInterfcae, CommonScreenStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            commonData: [1, 2, 3, 4, 5],
            count: '$0',
            visible: false,
            otherData: { review_text: undefined, rating: undefined, professional_id: undefined },
            isDisable: true,
            callSetting: false
        }
    }
    async componentDidMount() {
        this.setState({ loader: true, otherData: { review_text: undefined, rating: undefined } })
        this.getApiData(this.props.route?.params?.data);
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    getApiData(params) {
        CommonApiRequest.getProfBookingDetail(params).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                const otherData = this.state.otherData;
                otherData.professional_id = response?.professional_id;
                this.setState({ otherData: otherData });
                this.setState({ dataObj: response });
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    payment() {

    }
    openOtpModal(type: boolean = true) {
        this.setState({ visible: type })
    }
    completeOrder() {
        this.setState({ isDisable: true, callSetting: true, isError: false });
        CommonApiRequest.matchOrderOtp({ order_id: this.state?.dataObj?.order_id, order_otp: this.state.otp }).then((response: any) => {
            this.setState({ loader: false, callSetting: false });
            if (response?.status == '200') {
                this.getApiData(this.props.route?.params?.data);
                this.openOtpModal(false);
                this.setState({ otp: undefined });
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: "Order completed successfully!!", top: 20 } });
            } else if (response?.status === 201) {
                this.setState({ isError: true, isDisable: false });
            }
        }).catch(() => {
            this.setState({ loader: false, callSetting: false });
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Something went wrong please try after sometime!!", top: 20 } });
        });
    }
    onUpdateOrder(type: any, item: any = {}) {
        const typeToShow = (type === 2) ? 'Accept' : 'Reject';
        Alert.alert(
            'Confirmation',
            'Are you sure? You want to ' + typeToShow + ' this booking',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        this.acceptOrCancelBooking(type, item);
                    },
                },
            ],
            { cancelable: false },
        );
    }
    acceptOrCancelBooking(type: any = 2, item) {
        this.setState({ loader: true });
        const updateOrderObj = {
            id: item?.order_id,
            status: type
        }
        CommonApiRequest.bookingAcceptOrCancel(updateOrderObj).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status === 200) {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Booking accepted successfully!!', top: 20 } });
                this.setState({ loader: true })
                this.getApiData(this.props.route?.params?.data);
            } else {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: 'Something went wrong please try after sometime!!', top: 20 } });
            }
        }).catch(() => {
            this.setState({ loader: false })
        });
    }
    completeBookingConfirmation() {
        Alert.alert(
            'Confirmation',
            'Are you sure? You want to complete this booking',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        this.openOtpModal(true)
                    },
                },
            ],
            { cancelable: false },
        );
    }
    otpUpdate(otp: any) {
        if (otp?.length === 6) {
            this.setState({ isDisable: false, otp: otp, isError: false })
        } else {
            this.setState({ isDisable: true, otp: undefined })
        }
    }
    render() {
        return (
            <>
                <MainLayout
                    onRefresh={() => { this.getApiData(this.props.route?.params?.data); }}
                    otherText=""
                    loader={this.state?.loader}
                    containerStyle={{ paddingTop: 1 }}
                    navigation={this.props.navigation}
                    route={this.props.route}
                    scollEnabled={true}
                >
                    {this.state?.dataObj &&
                        <View style={{ height: 'auto', flex: 1 }}>
                            <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                                <View style={ThemeStyling.card}>
                                    <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                        <View style={[ThemeStyling.twoColumnLayout]}>
                                            <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                                <Image style={[ThemeStyling.cardImage2]} source={{ uri: this?.state?.dataObj?.image }} />
                                            </View>
                                            <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 5 }]}>
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>{this.state?.dataObj?.customer_name}</Text>
                                                    <View style={[ThemeStyling.starRating, { marginBottom: 8 }]}>

                                                    </View>
                                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                        <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.state?.dataObj?.address}</Text></View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout]}>
                                    <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                        <Text style={[ThemeStyling.heading5, { color: Colors.secondry_color, textTransform: "uppercase" }]}>Status</Text>
                                    </View>
                                    <View style={[ThemeStyling.col8, {}]}>
                                        <Text style={[ThemeStyling.heading5, { color: (this.state?.dataObj?.order_status?.iconcolor) ? this.state?.dataObj?.order_status?.iconcolor : Colors.orange_color, textTransform: "uppercase", fontWeight: "bold" }]}>{this.state.dataObj?.order_status?.status}</Text>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout, { marginVertical: 3 }]}>
                                    <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Booking Type</Text>
                                    </View>
                                    <View style={[ThemeStyling.col8, {}]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.dark_color, textTransform: "capitalize" }]}>{this.state.dataObj?.bookingType}</Text>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout, { marginVertical: 3 }]}>
                                    <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Booked On</Text>
                                    </View>
                                    <View style={[ThemeStyling.col8, {}]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.dark_color, textTransform: "capitalize" }]}>{this.state?.dataObj?.bookingSlot?.booking_date} | {this.state?.dataObj?.bookingSlot?.booking_time}</Text>
                                    </View>
                                </View>
                                {this.state?.dataObj?.bookedSlot?.booking_date &&
                                    <View style={[ThemeStyling.twoColumnLayout, { marginVertical: 3 }]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Booking Date</Text>
                                        </View>
                                        <View style={[ThemeStyling.col8, {}]}>
                                            <Text style={[ThemeStyling.text2, { color: Colors.dark_color, textTransform: "capitalize" }]}>{this.state?.dataObj?.bookedSlot?.booking_date} | {this.state?.dataObj?.bookedSlot?.booking_time}</Text>
                                        </View>
                                    </View>
                                }
                                <View style={[ThemeStyling.twoColumnLayout, { alignItems: "flex-start", marginVertical: 3 }]}>
                                    <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Address</Text>
                                    </View>
                                    <View style={[ThemeStyling.col8, {}]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.dark_color, textTransform: "capitalize" }]}>{this.state?.dataObj?.address}</Text>
                                    </View>
                                </View>

                                <View style={[ThemeStyling.threeColumnLayout, { display: "none" }]}>
                                    <View style={[ThemeStyling.col3, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                            <AntDesign style={{ position: "relative", top: 2 }} name="calendar" size={13} color="black" />
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Date</Text>
                                        </View>
                                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{this.state?.dataObj?.bookingSlot?.booking_date}</Text>
                                    </View>
                                    <View style={[ThemeStyling.col3, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                            <AntDesign style={{ position: "relative", top: 2 }} name="clockcircleo" size={13} color="black" />
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Time</Text>
                                        </View>
                                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{this.state?.dataObj?.bookingSlot?.booking_time}</Text>
                                    </View>
                                    <View style={[ThemeStyling.col3, { alignItems: "center" }]}>
                                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                            <FontAwesome style={{ position: "relative", top: 3 }} name="scissors" size={13} color={"black"} />
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Booking Status</Text>
                                        </View>
                                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f12, color: this.state?.dataObj?.order_status?.iconcolor, textTransform: 'capitalize' }]}>{this.state?.dataObj?.order_status?.status}</Text>
                                    </View>
                                </View>
                                <View style={[ThemeStyling.twoColumnLayout]}>
                                    <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Payment Status</Text>
                                    </View>
                                    <View style={[ThemeStyling.col8, {}]}>
                                        <Text style={[ThemeStyling.text2, { fontFamily: 'Poppins_600SemiBold', color: ((this.state.dataObj?.payment_status)) ? Colors.success_color : Colors.primary_color, textTransform: "capitalize" }]}>{(this.state.dataObj?.payment_status) ? this.state.dataObj?.payment_status : 'Not Completed'}</Text>
                                    </View>
                                </View>
                                {this.state.dataObj?.paymentDetails &&
                                    <View style={{ marginTop: 10 }}>
                                        <View style={[ThemeStyling.twoColumnLayout, { alignItems: "flex-start", marginVertical: 3 }]}>
                                            <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Payment</Text>
                                            </View>
                                            <View style={[ThemeStyling.col8, {}]}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                    <FontAwesome name={(this.state.dataObj?.paymentDetails?.card_brand)?'cc-'+this.state.dataObj?.paymentDetails?.card_brand :'cc-visa'} size={20} color="black" />
                                                    <Text style={[ThemeStyling.text2, { color: Colors.success_color, marginLeft: 10 }]}>
                                                        {CommonHelper.getCardMaskedNumber(this.state.dataObj?.paymentDetails?.card_last_4_digit,this.state.dataObj?.paymentDetails?.card_brand)}
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                }
                            </View>

                            <View style={{ backgroundColor: Colors.primary_light_color, padding: 3, paddingTop: 5, paddingLeft: 15, marginBottom: 5, alignItems: 'center' }}>
                                <Text style={[ThemeStyling.heading5, { margin: 0, color: Colors.primary_color }]}>Selected Services</Text>
                            </View>

                            <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                                {this.state?.dataObj?.services && this.state?.dataObj?.services?.map((item, index) => {
                                    return <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]} key={index}>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{item?.service}</Text>
                                        </View>
                                        <View>
                                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{(item?.price)}</Text>
                                        </View>
                                    </View>
                                })}

                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Sub Total</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{this.state?.dataObj?.data?.subtotal}</Text>
                                    </View>
                                </View>
                                {this.state?.dataObj?.data?.tax && this.state?.dataObj?.data?.tax?.map((item, index) => {
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
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Total Payment</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{this.state?.dataObj?.data?.total}</Text>
                                    </View>
                                </View>
                                {this.state?.dataObj?.remark &&
                                    <>
                                        <Divider bold={true} style={{ marginVertical: 10 }}></Divider>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, fontWeight: '900' }]}>Remarks : </Text>
                                            <Text style={[ThemeStyling.text1]}>{this.state?.dataObj?.remark}</Text>
                                        </View>
                                    </>
                                }

                            </View>

                        </View>
                    }
                </MainLayout>
                <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
                    <View style={[ThemeStyling.twoColumnLayout, { justifyContent: 'center' }]}>
                        {this.state.dataObj?.canAccepted &&
                            <View style={{ alignItems: 'flex-start', width: '48.5%', marginRight: 5 }}>
                                <Pressable onPress={() => { this.onUpdateOrder(2, this.state.dataObj) }} style={[ThemeStyling.btnSuccess, ThemeStyling.btnSmall, { width: '100%', height: 50, justifyContent: 'center' }]}>
                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f18 }]}>Accept</Text>
                                </Pressable>
                            </View>
                        }
                        {this.state.dataObj?.canRejected &&
                            <View style={{ alignItems: 'flex-end', width: '48.5%', marginLeft: 5 }}>
                                <Pressable onPress={() => { this.onUpdateOrder(5, this.state.dataObj) }} style={[ThemeStyling.btnPrimary, ThemeStyling.btnSmall, { width: '100%', height: 50, justifyContent: 'center' }]}>
                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f18 }]}>Reject</Text>
                                </Pressable>
                            </View>
                        }
                    </View>
                </View>
                {this.state.dataObj?.canCompleted &&
                    <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
                        <View style={[ThemeStyling.twoColumnLayout]}>
                            <View style={{ alignItems: 'flex-start', width: '100%' }}>
                                <Pressable onPress={() => { this.completeBookingConfirmation() }} style={[ThemeStyling.btnSuccess, ThemeStyling.btnSmall, { width: '100%', height: 50, justifyContent: 'center' }]}>
                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f18 }]}>Complete Booking</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
                <Modal visible={this.state.visible} transparent={true}>
                    <Pressable onPress={() => { this.openOtpModal(false) }} style={{ backgroundColor: '#000', height: '100%', opacity: 0.5 }}></Pressable>
                    <SafeAreaView style={{ zIndex: 999, position: 'absolute', borderRadius: 20, top: (Platform?.OS === 'ios') ? 105 : 75, width: '95%', backgroundColor: Colors.white, opacity: 1, marginLeft: '2.5%' }}>
                        <StatusBar backgroundColor={Colors.primary_color} barStyle="default"></StatusBar>
                        <ScrollView>
                            <View style={{ flex: 1, height: 45, width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Pressable onPress={() => { this.openOtpModal(false) }} style={{ justifyContent: 'center', alignItems: 'flex-end', height: '100%', paddingRight: 10, zIndex: 1, position: 'relative', width: 50 }}>
                                    <Entypo name="cross" size={24} color={Colors.dark_color} />
                                </Pressable>
                            </View>
                            <View>
                                <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                                    <View style={{ marginBottom: 0 }}>
                                        <Text style={[ThemeStyling.heading2, { textAlign: 'center', textTransform: 'none' }]}>OTP Verification</Text>
                                    </View>
                                    <View style={{ marginBottom: 20 }}>
                                        <Text style={[ThemeStyling.text1, { color: Colors.secondry_color, textAlign: 'center' }]}>Please ask customer for order OTP which will appear on customer booking detail screen</Text>
                                    </View>

                                    <View style={{ marginBottom: 5 }}>
                                        <View style={{ width: '100%', height: 'auto' }}>
                                            <OtpInput numberOfDigits={6} onTextChange={(text) => this.otpUpdate(text)} onFilled={(text) => console.log(`OTP is ${text}`)} />
                                        </View>
                                    </View>
                                    {this.state.isError &&
                                        <View style={{ marginTop: 2 }}>
                                            <Text style={[ThemeStyling.text1, { color: Colors.primary_color, textAlign: 'center', fontSize: 14 }]}>Order OTP does not match. Please enter correct OTP</Text>
                                        </View>
                                    }
                                    {this.state.callSetting &&
                                        <View style={{ marginTop: 2 }}>
                                            <Text style={[ThemeStyling.text1, { color: Colors.success_color, textAlign: 'center', fontSize: 14 }]}>Please wait...</Text>
                                        </View>
                                    }
                                    <View style={{ marginTop: 20 }}>
                                        <Pressable disabled={this.state?.isDisable} style={[ThemeStyling.btnSuccess, { backgroundColor: Colors.primary_color, justifyContent: 'center', opacity: (!this.state?.isDisable) ? 1 : 0.5 }]} onPress={() => { this.completeOrder() }}>
                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, paddingTop: 5, paddingBottom: 5 }]}>Complete</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
            </>
        );
    }
}