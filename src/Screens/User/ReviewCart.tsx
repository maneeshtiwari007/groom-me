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
export default class ReviewCart extends Component<ScreenInterfcae, CommonScreenStateInterface>{
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
        //     console.log(error);
        // })
    }
    getMarkerView() {
        if (this.state?.dataObj?.length) {

        }
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.getApiData() }}
                headerText=""
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={true}
                scollEnabled={false}
            >
                <View style={{ height: Dimensions.get('screen').height - this.find_dimesions() }}>
                    <ScrollView>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0}]}>
                                    <View style={[ThemeStyling.twoColumnLayout]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>The Big Tease Salon</Text>
                                                <View style={[ThemeStyling.starRating, { marginBottom: 8 }]}>
                                                    <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} />
                                                    <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} />
                                                    <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} />
                                                    <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.primary_color} />
                                                    <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.primary_color} />
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{flexShrink: 1}}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>All the Lorem Ipsum on the Internet tend to repeat</Text></View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[ThemeStyling.threeColumnLayout]}>
                                <View style={[ThemeStyling.col3, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <AntDesign style={{ position: "relative", top: 2 }} name="calendar" size={13} color="black" />
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Date</Text>
                                    </View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>19 Sep 2022</Text>
                                </View>
                                <View style={[ThemeStyling.col3, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <AntDesign style={{ position: "relative", top: 2 }} name="clockcircleo" size={13} color="black" />
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Time</Text>
                                    </View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>10:00 - 12 AM</Text>
                                </View>
                                <View style={[ThemeStyling.col4, { alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <Feather style={{ position: "relative", top: 3 }} name="phone" size={13} color="black" />
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Phone Number</Text>
                                    </View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>+91(1234567891)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: Colors.primary_light_color, padding: 3, paddingTop: 5, paddingLeft: 15, marginBottom: 5 }}>
                            <Text style={[ThemeStyling.heading5, { margin: 0, color: Colors.primary_color }]}>Specialist</Text>
                        </View>
                        <View style={[ThemeStyling.container, { minHeight: 'auto', borderBottomWidth: 1, borderBlockColor: Colors.secondry_color, borderStyle: "dashed" }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Dariene Robertson</Text>
                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f12, color: Colors.secondry_color }]}>(Hair Cutting Specialist)</Text>
                        </View>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Medium Hair Cut</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>$40</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Partial High Light</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>$40</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Coupon</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>-$10</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Medium Hair Cut</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>$40</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Partial High Light</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>$40</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Coupon</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>-$10</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Medium Hair Cut</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>$40</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Partial High Light</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>$40</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>Coupon</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>-$10</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]}>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Total Pay</Text>
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>$70</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15 }]}>
                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Give Rate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainLayout >
        );
    }
}