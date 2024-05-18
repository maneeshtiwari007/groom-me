import { Component, ReactNode } from "react";
import {
    FontAwesome,
    MaterialCommunityIcons,
    Feather,
    FontAwesome5,
    AntDesign,
    Entypo
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, Switch, DeviceEventEmitter, Alert, Modal, SafeAreaView, StatusBar, Platform } from "react-native";
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
import { ConstantsVar } from "../../utilty/ConstantsVar";
import { OtpInput } from "react-native-otp-entry";
import { BookingSlot, BookingTotal, Details, PaymentDetail, ServiceLists, UserInfoWithQr } from "../../Components/Bookings/Details";
export default class ProfBookingDetails extends Component<
    ScreenInterfcae,
    CommonScreenStateInterface
> {
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
            this.setState({ loader: false });
            if (response?.status == 200) {
                const otherData = this.state.otherData;
                otherData.professional_id = response?.professional_id;
                this.setState({ otherData: otherData });
                this.setState({ dataObj: response, cardBrand: (response?.paymentDetails?.card_brand) ? "cc-" + response?.paymentDetails?.card_brand : 'cc-visa' });
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
                    onRefresh={() => {
                        this.getApiData(this.props.route?.params?.data);
                    }}
                    loader={this.state?.loader}
                    containerStyle={{ paddingTop: 1 }}
                    navigation={this.props.navigation}
                    route={this.props.route}
                    isSearchBar={false}
                    scollEnabled={true}
                >
                    {this.state?.dataObj &&
                        <View style={{ height: 'auto', flex: 1 }}>
                            <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <Image style={[ThemeStyling.cardImage3]} source={{ uri: this.state?.dataObj?.customer?.photo_image }} />
                                    </View>
                                    <UserInfoWithQr isQrNeed={false} data={{ name: this.state?.dataObj?.customer_name, address: this.state?.dataObj?.address }}></UserInfoWithQr>
                                    
                                </View>
                                <BookingSlot data={{ bookingSlot: this.state?.dataObj?.bookingSlot }}></BookingSlot>
                                <View style={{ borderBottomWidth: 1.8, borderBottomColor: Colors.gray200, marginVertical: 10 }}>
                                    <Details orderStatus={this.state?.dataObj?.order_status} showAddress={false} data={this.state?.dataObj}></Details>
                                </View>
                                <ServiceLists data={{ services: this.state?.dataObj?.services, totalservice: this.state?.dataObj?.totalservice }}></ServiceLists>
                                <BookingTotal data={{ data: this.state?.dataObj?.data }}></BookingTotal>
                                
                                {this.state?.dataObj?.remark &&
                                    <View style={{ marginBottom: 10, borderBottomWidth: 4, borderBottomColor: Colors.gray200,borderTopWidth: 4,borderTopColor: Colors.gray200, }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                            <View>
                                                <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Remarks </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 5, marginBottom: 5 }}>
                                            <View>
                                                <Text style={[ThemeStyling.heading6, { color: Colors.dark_color }]}>{this.state?.dataObj?.remark}</Text>
                                            </View>
                                        </View>
                                    </View>
                                }
                                <PaymentDetail data={{paymentDetails:this.state?.dataObj?.paymentDetails,payment_status:this.state?.dataObj?.payment_status,cardBrand:this.state?.cardBrand}}></PaymentDetail>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    {this.state.dataObj?.canAccepted &&
                                        <View style={ThemeStyling.col5}>
                                            <Pressable onPress={() => { this.onUpdateOrder(2, this.state.dataObj) }} style={[ThemeStyling.btnOutlinedark]} >
                                                <Text style={[ThemeStyling.btnText, { color: Colors.dark_color }]}>Accept</Text>
                                            </Pressable>
                                        </View>
                                    }
                                    {this.state.dataObj?.canAccepted &&
                                        <View style={ThemeStyling.col5}>
                                            <Pressable onPress={() => { this.onUpdateOrder(5, this.state.dataObj) }} style={[ThemeStyling.btnPrimary]} >
                                                <Text style={ThemeStyling.btnText}>Reject</Text>
                                            </Pressable>
                                        </View>
                                    }
                                </View>
                                {this.state.dataObj?.canCompleted &&
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <View style={ThemeStyling.col11}>
                                            <Pressable onPress={() => { this.completeBookingConfirmation() }} style={[ThemeStyling.btnPrimary]} >
                                                <Text style={ThemeStyling.btnText}>Complete this booking</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    }
                </MainLayout>
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
