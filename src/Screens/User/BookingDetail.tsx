import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
export default class BookingDetail extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            commonData: [1, 2, 3, 4, 5],
            count: '$0'
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        this.getApiData(this.props.route?.params?.data);
        this.setState({ dataObj: this.props.route?.params?.data, userObj: this.props.route?.params?.prof, count: await CommonHelper.getTotalPriceCount(this.props.route?.params?.data) });
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    getApiData(params) {
        CommonApiRequest.getPriceCalculated({ services: params }).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ otherData: response?.data });
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    payment() {
        this.props?.navigation?.navigate("Payment", { dataObj: this.state?.dataObj, userObj: this.state?.userObj, otherData: this.state?.otherData })
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
                scollEnabled={false}
            >
                <View style={{ height: Dimensions.get('screen').height - this.find_dimesions() }}>
                    <ScrollView>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={{ uri: this?.state?.userObj?.photo }} />
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
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>19 Sep 2022</Text>
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
                        </View>
                    </ScrollView>

                </View>
                {this.state?.otherData?.total &&
                    <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 0, paddingHorizontal: 15, paddingVertical: 15 }]}>
                        <TouchableOpacity onPress={()=>{this.payment()}} style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, opacity: (this.state?.otherData?.total) ? 1 : 0.5 }]} disabled={(this.state?.otherData?.total) ? false : true}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Pay {this.state?.otherData?.total}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </MainLayout >
        );
    }
}