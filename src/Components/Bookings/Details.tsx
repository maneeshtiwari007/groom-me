import { Component } from "react";
import { Pressable, Text, View } from "react-native";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import ScreenStateInterfcae from "../../Interfaces/Common/ScreenStateInterface";
import { ThemeStyling } from "../../utilty/styling/Styles";
import Colors from "../../utilty/Colors";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import ImageComponent from "../Common/ImageComponent";

export class Details extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <View style={{ marginBottom: 20, borderBottomWidth: 1.8, borderBottomColor: Colors.gray200, paddingBottom: 10 }}>
                    <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Booking Details</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Booking Number</Text>
                    </View>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.success_color, textTransform: "uppercase", marginBottom: 0 }]}>{(this.props?.data?.order_token) ? '#' + this.props?.data?.order_token : '#'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Booking Type</Text>
                    </View>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '900', color: Colors.success_color, textTransform: "uppercase", marginBottom: 0, fontFamily: ThemeStyling.semiBold.fontFamily }]}>{(this.props?.data?.bookingType) ? this.props?.data?.bookingType : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Booking Status</Text>
                    </View>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '900', color: this.props?.orderStatus?.iconcolor, textTransform: "uppercase", marginBottom: 0, fontFamily: ThemeStyling.semiBold.fontFamily }]}>{(this.props?.orderStatus?.status) ? this.props?.orderStatus?.status : ''}</Text>
                    </View>
                </View>
                {this?.props?.order_otp &&
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                        <View>
                            <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Booking OTP</Text>
                        </View>
                        <View>
                            <Text style={[ThemeStyling.heading5, { fontWeight: '900', color: Colors.primary_color, textTransform: "uppercase", marginBottom: 0, fontFamily: ThemeStyling.semiBold.fontFamily }]}>{(this.props?.order_otp) ? this.props?.order_otp : ''}</Text>
                        </View>
                    </View>
                }
                {this.props?.data?.address && this.props?.showAddress &&
                    <View style={{ marginBottom: 15 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <View style={{ width: '40%' }}>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Booking Address : </Text>
                            </View>
                            <View style={{ width: '58%', marginLeft: '2%', alignItems: 'flex-end' }}>
                                <Text style={[ThemeStyling.heading6, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>{this.props?.data?.address}</Text>
                            </View>
                        </View>
                    </View>
                }
            </>
        )
    }
}
export class UserInfoWithQr extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    callBackPressedQr() {
        if (this.props?.callBackQr) {
            this.props?.callBackQr(this.props?.data?.qr_code);
        }
    }
    render() {
        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={{ width: (this.props?.isQrNeed) ? '75%' : '100%' }}>
                        <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{this.props?.data?.name}</Text>
                        <View style={{ flexDirection: "row", marginBottom: 0 }}>
                            <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                            <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color, flexWrap: 'wrap' }]}>{this.props?.data?.address}</Text></View>
                        </View>
                    </View>
                    {this.props?.isQrNeed &&
                        <View style={{ width: '20%' }}>
                            {this.props?.data?.qr_code &&
                                <Pressable onPress={() => { this.callBackPressedQr() }} style={{ alignItems: 'center' }}>
                                    <ImageComponent style={{ width: 50, height: 50 }} src={{ uri: this.props?.data?.qr_code }}></ImageComponent>
                                </Pressable>
                            }
                        </View>
                    }
                </View>
            </>
        )
    }
}
export class BookingSlot extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <View style={[ThemeStyling.card, { backgroundColor: Colors.danger100, marginBottom: 10 }]}>
                    <View style={[ThemeStyling.cardBody, { padding: 10 }]}>
                        <View style={[ThemeStyling.twoColumnLayout]}>
                            <View style={{ marginRight: 10 }}>
                                <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                    <View><AntDesign name="calendar" size={18} style={{ color: Colors.dark_color, marginRight: 5 }} /></View>
                                    <View><Text style={[ThemeStyling.text2, { color: Colors.dark_color }]}>{this.props?.data?.bookingSlot?.booking_date}</Text></View>
                                </View>
                            </View>
                            {this.props?.data?.bookingSlot?.booking_time &&
                                <View>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <View><AntDesign name="clockcircleo" size={18} style={{ color: Colors.dark_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.dark_color }]}>{this.props?.data?.bookingSlot?.booking_time}</Text></View>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </>
        )
    }
}
export class ServiceLists extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <View style={{ marginBottom: 10, borderBottomColor: Colors.gray200, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <View>
                            <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Service List</Text>
                        </View>
                        <View style={ThemeStyling.serviceCounter}>
                            <Text style={[ThemeStyling.heading5, { fontWeight: '700', marginBottom: 0, color: Colors.primary_color }]}>{this.props?.data?.totalservice}</Text>
                        </View>
                    </View>
                    {this.props?.data?.services && this.props?.data?.services?.map((item: any, index: number) => {
                        return <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 5, marginBottom: 5 }}>
                            <View>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>{item?.service}</Text>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{item?.detail?.service_cat?.name}</Text>
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>{item?.price}</Text>
                            </View>
                        </View>
                    })}
                </View>
            </>
        )
    }
}
export class BookingTotal extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <View>
                    <Text style={[ThemeStyling.heading3, { fontWeight: '600', color: Colors.dark_color, marginBottom: 10 }]}>Total</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 8, marginBottom: 8 }}>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>Item Total</Text>
                    </View>
                    <View>
                        <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>{this.props?.data?.data?.subtotal}</Text>
                    </View>
                </View>
                {this.props?.data?.data?.tax && this.props?.data?.data?.tax?.map((item: any, index: number) => {
                    return <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: Colors.gray200, paddingBottom: 8, marginBottom: 8 }}>
                        <View>
                            <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>{item?.name}</Text>
                        </View>
                        <View>
                            <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color }]}>{item?.price}</Text>
                        </View>
                    </View>
                })}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, borderBottomWidth: 1.8, borderBottomColor: Colors.gray200, paddingBottom: 5, }}>
                    <View>
                        <Text style={[ThemeStyling.heading2, { fontWeight: '700', color: Colors.dark_color }]}>Grand Total</Text>
                    </View>
                    <View>
                        <Text style={[ThemeStyling.heading2, { fontWeight: '700', color: Colors.dark_color }]}>{this.props?.data?.data?.total}</Text>
                    </View>
                </View>
            </>
        )
    }
}
export class PaymentDetail extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <View style={[ThemeStyling.card, { backgroundColor: Colors.danger100, marginBottom: 20 }]}>
                    <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <View>
                                <View style={[ThemeStyling.twoColumnLayout]}>
                                    <View style={{ marginRight: 10 }}>
                                        {this.props?.data?.paymentDetails?.card_brand &&
                                            <FontAwesome name={this.props?.data?.cardBrand} size={34} style={{ color: Colors.dark_color }} />
                                        }
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Payment {(this.props?.data?.payment_status) ? this.props?.data?.payment_status : 'Not Successful'}</Text>
                                        {this.props?.data?.paymentDetails?.payment_method &&
                                            <Text style={[ThemeStyling.heading5, { fontWeight: '700', color: Colors.dark_color, marginBottom: 0 }]}>Payment by {this.props?.data?.paymentDetails?.payment_method}</Text>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View>
                                <MaterialCommunityIcons name={(this.props?.data?.payment_status === 'Complete') ? "check-decagram" : "close"} size={34} style={{ color: (this.props?.data?.payment_status === 'Complete') ? Colors.success_color : Colors.primary_color }} />
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}