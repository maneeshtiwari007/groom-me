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
export default class Bookings extends Component<ScreenInterfcae, CommonScreenStateInterface>{
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
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View><View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View><View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View><View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View><View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View><View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, {alignItems:"center"}]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <Image style={[ThemeStyling.cardImage2]} source={require('../../../assets/staticimages/default.jpg')} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>Salon irdescent</Text>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Shop 103/16 Lonsdale St, Braddon ACT 2612, Australia</Text></View>
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                                    <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>25 March 2022 (9:00AM)</Text></View>
                                                </View>
                                                <View style={[ThemeStyling.twoColumnLayout,{marginBottom:0}]}>
                                                    <View style={{marginRight:10}}>
                                                        <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal:8, paddingVertical:6 }]}>
                                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {/* <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15 }]}>
                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Book Appointment</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </MainLayout >
        );
    }
}