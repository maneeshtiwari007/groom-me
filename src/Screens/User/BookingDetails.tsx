import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Dimensions, Pressable, Modal, SafeAreaView, StatusBar, TextInput, Platform, DeviceEventEmitter, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
import { Divider } from "react-native-paper";
import { ConstantsVar } from "../../utilty/ConstantsVar";
import ImageComponent from "../../Components/Common/ImageComponent";
import { Image } from "expo-image";
import ImageView from "react-native-image-viewing";
import { BookingSlot, BookingTotal, Details, PaymentDetail, ServiceLists, UserInfoWithQr } from "../../Components/Bookings/Details";

export default class BookingDetails extends Component<ScreenInterfcae, CommonScreenStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            commonData: [1, 2, 3, 4, 5],
            count: '$0',
            visible: false,
            otherData: { review_text: undefined, rating: undefined, professional_id: undefined },
            isDisable: false
        }
    }
    async componentDidMount() {
        this.setState({ loader: true, otherData: { review_text: undefined, rating: undefined } });
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
            console.log(response);
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
    openQrCode(data?: any) {
        this.setState({ isDisable: true });
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.getApiData(this.props.route?.params?.data) }}
                otherText=""
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                scollEnabled={true}
                onScroll={() => { }}
            >

                {this.state?.dataObj &&
                    <View style={{ height: 'auto', flex: 1 }}>

                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <ImageComponent style={[ThemeStyling.cardImage3]} src={{ uri: this.state?.dataObj?.professionalDetails?.photo_image }} />
                                </View>
                                <UserInfoWithQr isQrNeed={true} callBackQr={(data: any) => { this.openQrCode(data) }} data={{ qr_code: this.state?.dataObj?.qr_code, name: this.state?.dataObj?.professionalName, address: this.state?.dataObj?.professionalAddress }}></UserInfoWithQr>
                            </View>
                            <BookingSlot data={{ bookingSlot: this.state?.dataObj?.bookingSlot }}></BookingSlot>
                            <View style={{ borderBottomWidth: 1.8, borderBottomColor: Colors.gray200, marginVertical: 10 }}>
                                <Details order_otp={this.state?.dataObj?.order_otp} orderStatus={this.state?.dataObj?.order_status} showAddress={true} data={this.state?.dataObj}></Details>
                            </View>
                            <ServiceLists data={{ services: this.state?.dataObj?.services, totalservice: this.state?.dataObj?.totalservice }}></ServiceLists>
                            <BookingTotal data={{ data: this.state?.dataObj?.data }}></BookingTotal>
                            {this.state?.dataObj?.remark &&
                                <>
                                    <View style={{ marginBottom: 10 }}>
                                        <View>
                                            <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>Remarks</Text>
                                        </View>
                                        <Text style={[ThemeStyling.text1]}>{this.state?.dataObj?.remark}</Text>
                                    </View>
                                </>
                            }
                            <PaymentDetail data={{paymentDetails:this.state?.dataObj?.paymentDetails,payment_status:this.state?.dataObj?.payment_status,cardBrand:this.state?.cardBrand}}></PaymentDetail>
                            
                        </View>
                        {this.state.dataObj?.canReview &&
                            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                                <View style={ThemeStyling.col11}>
                                    <Pressable onPress={() => { this.openReviewModal() }} style={[ThemeStyling.btnPrimary]} >
                                        <Text style={ThemeStyling.btnText}>Leave Review</Text>
                                    </Pressable>
                                </View>
                            </View>
                        }
                    </View>
                }
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
                <ImageView
                    images={[{ uri: this.state?.dataObj?.qr_code }]}
                    imageIndex={0}
                    visible={this.state.isDisable}
                    animationType={"slide"}
                    onRequestClose={() => { this.setState({ isDisable: false }) }}
                />
            </MainLayout >
        );
    }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});