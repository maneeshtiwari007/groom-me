import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, Modal, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform, DeviceEventEmitter, StyleSheet } from 'react-native';
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
import MapView, { MapMarker, PROVIDER_GOOGLE, Polygon, Polyline } from "react-native-maps";
export default class BookingDetail extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            commonData: [1, 2, 3, 4, 5],
            count: '$0',
            visible: false,
            otherData: { review_text: undefined, rating: undefined, professional_id: undefined }
        }
    }
    async componentDidMount() {
        this.setState({ loader: true, otherData: { review_text: undefined, rating: undefined } })
        this.getApiData(this.props.route?.params?.data);
        const locationObj = await CommonHelper.getData(ConstantsVar.LOCATION_KEY);
        const location = locationObj?.location
        this.setState({ location: location });
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    getApiData(params) {
        CommonApiRequest.getUserBookingDetail(params).then((response: any) => {
            this.setState({ loader: false });
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
    openReviewModal(type: boolean = true) {
        this.setState({ visible: type })
    }
    setRating(rating: any) {
        const otherData = this.state.otherData;
        otherData.rating = rating;
        this.setState({ otherData: otherData });
    }
    setReviewText(text: any) {
        const otherData = this.state.otherData;
        otherData.review_text = text;
        this.setState({ otherData: otherData });
    }
    saveReview() {
        this.setState({ loader: true });
        this.openReviewModal(false);
        CommonApiRequest.saveUserReview(this.state.dataObj?.order_id, this.state.otherData).then((response: any) => {
            this.getApiData(this.props.route?.params?.data);
            this.openReviewModal(false);
            this.setState({ loader: false });
            if (response?.status == '200') {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: "Review saved successfully!!", top: 20 } });
            }
        }).catch(() => {
            this.setState({ loader: false });
            this.openReviewModal(false);
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Something went wrong please try after sometime!!", top: 20 } });
        });
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { }}
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
                            {this.state?.dataObj?.qr_code &&
                                <View style={{ marginVertical: 10, alignItems: 'center', marginBottom: 20 }}>
                                    <Image style={{ width: 100, height: 100 }} source={{ uri: this.state?.dataObj?.qr_code }}></Image>
                                </View>
                            }
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={{ uri: this?.state?.dataObj?.professionalDetails?.photo_image }} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>{this.state?.dataObj?.professionalName}</Text>
                                                <View style={[ThemeStyling.starRating, { marginBottom: 8 }]}>
                                                    <ReviewStarComponent avg_rating={this.state?.dataObj?.avg_rating}></ReviewStarComponent>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.state?.dataObj?.professionalAddress}</Text></View>
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
                            <View style={[ThemeStyling.twoColumnLayout, { marginVertical: 3 }]}>
                                <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.secondry_color, textTransform: "uppercase" }]}>Order OTP</Text>
                                </View>
                                <View style={[ThemeStyling.col8, {}]}>
                                    <Text style={[ThemeStyling.heading5, { color: Colors.success_color, textTransform: "uppercase", fontWeight: "bold" }]}>{this.state.dataObj?.order_otp}</Text>
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
                            {this.state?.dataObj?.canReview &&
                                <>
                                    <Divider bold={true} style={{ marginVertical: 10 }}></Divider>
                                    <View>
                                        <Pressable onPress={() => { this.openReviewModal() }} style={[ThemeStyling.btnSuccess, { backgroundColor: Colors.primary_color, justifyContent: 'center' }]}>
                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, paddingTop: 5, paddingBottom: 5 }]}>Leave Review</Text>
                                        </Pressable>
                                    </View>
                                </>
                            }
                        </View>
                        
                        <Modal visible={this.state.visible} transparent={true}>
                            <Pressable onPress={() => { this.openReviewModal(false) }} style={{ backgroundColor: '#000', height: '100%', opacity: 0.5 }}></Pressable>
                            <SafeAreaView style={{ zIndex: 999, position: 'absolute', borderRadius: 20, top: (Platform?.OS === 'ios') ? 105 : 75, width: '95%', backgroundColor: Colors.white, opacity: 1, marginLeft: '2.5%' }}>
                                <StatusBar backgroundColor={Colors.primary_color} barStyle="default"></StatusBar>
                                <ScrollView>
                                    <View style={{ flex: 1, height: 45, width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Pressable onPress={() => { this.openReviewModal(false) }} style={{ justifyContent: 'center', alignItems: 'flex-end', height: '100%', paddingRight: 10, zIndex: 1, position: 'relative', width: 50 }}>
                                            <Entypo name="cross" size={24} color={Colors.dark_color} />
                                        </Pressable>
                                    </View>
                                    <View>
                                        <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 0 }]}>
                                            <View>
                                                <Text style={[ThemeStyling.heading3, { marginBottom: 0, textAlign: 'center' }]}>Your Review</Text>
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, marginBottom: 5, textAlign: 'center' }]}>What are you feel about this professional?</Text>
                                            </View>
                                            <View style={[ThemeStyling.starRating, { marginBottom: 15, justifyContent: "center" }]}>
                                                {this.state.commonData && this.state.commonData?.map((item: any, index: number) => {
                                                    return <Pressable onPress={() => { this.setRating(item) }} key={index}>
                                                        <FontAwesome style={[ThemeStyling.iconStar, { fontSize: 30 }]} name="star" color={(this.state?.otherData?.rating >= item) ? Colors.primary_color : Colors.gray400} />
                                                    </Pressable>
                                                })}

                                            </View>
                                            <View style={{ marginBottom: 5 }}>
                                                <View style={{ width: '100%', height: 'auto' }}>
                                                    <TextInput
                                                        multiline={true}
                                                        numberOfLines={4}
                                                        maxLength={180}
                                                        onChangeText={(text) => { this.setReviewText(text) }}
                                                        value={this.state?.remark}
                                                        style={{ minHeight: 90, borderRadius: 5, borderWidth: 1, borderColor: Colors.gray400, fontSize: 12, padding: 5, paddingLeft: 10 }}
                                                        textAlignVertical="top"
                                                        placeholder="Say something...." />
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text3, { color: Colors.secondry_color, marginBottom: 15, }]}>Remark: Max character 180 allowed</Text>
                                            </View>
                                            <View>
                                                <Pressable disabled={(this.state?.otherData?.rating > 0) ? false : true} style={[ThemeStyling.btnSuccess, { backgroundColor: Colors.primary_color, justifyContent: 'center', opacity: (this.state?.otherData?.rating > 0) ? 1 : 0.5 }]} onPress={() => { this.saveReview() }}>
                                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, paddingTop: 5, paddingBottom: 5 }]}>Save Review</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </Modal>
                    </View>
                }
            </MainLayout >
        );
    }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});