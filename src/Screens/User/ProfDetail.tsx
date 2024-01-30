import { Component, ReactNode } from "react";
import { FontAwesome, Ionicons, AntDesign, FontAwesome5} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import ProfCard from "../../Components/Common/ProfCard";
export default class ProfDetail extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    async componentDidMount() {
        this.setState({ loader: false });
    }

    render() {
        return (
            <MainLayout onRefresh={() => { }} headerText="" loader={this.state?.loader} containerStyle={{ paddingTop: 10 }}>
                <View>
                    <ImageBackground source={require('../../../assets/staticimages/thumbnail4.jpg')} resizeMode="cover" style={{ flex: 1, height: 150 }}></ImageBackground>
                </View>
                <View style={[ThemeStyling.card, { backgroundColor: Colors.gray200, borderRadius: 0, marginBottom: 0 }]}>
                    <View style={[ThemeStyling.cardBody, { paddingBottom: 10 }]}>
                        <View style={[ThemeStyling.twoColumnLayout, { alignItems: "flex-start" }]}>
                            <View style={[ThemeStyling.col8]}>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 3 }]}>The Big Tease Salon</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.gray400} />
                                    <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.gray400} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View><Ionicons name="location-outline" size={15} style={{ color: Colors.secondry_color }} /></View>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>4140 Parker Rd. Allortown</Text>
                                </View>
                            </View>
                            <View style={[ThemeStyling.col4, { alignItems: "flex-end" }]}>
                                <Text style={[ThemeStyling.text2, { fontSize: 11, color: Colors.secondry_color }]}>
                                <AntDesign name="checkcircle" size={11} color={Colors.success_color} />&nbsp;Live Booking</Text>
                                <Text style={[ThemeStyling.text2, { fontSize: 11, color: Colors.secondry_color }]}>
                                <FontAwesome5 name="times-circle" size={11} color={Colors.secondry_color} />&nbsp;Schedule Booking</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 15, paddingVertical: 5 }}>
                    <View style={[ThemeStyling.twoColumnLayout, { alignItems: "flex-start" }]}>
                        <View style={{ marginRight: 10 }}>
                            <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/staticimages/default.jpg')} />
                            </View>
                        </View>
                        <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Senior Cut</Text>
                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                        </View>
                        <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>$60</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 15, paddingVertical: 5 }}>
                    <View style={[ThemeStyling.twoColumnLayout, { alignItems: "flex-start" }]}>
                        <View style={{ marginRight: 10 }}>
                            <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/staticimages/default.jpg')} />
                            </View>
                        </View>
                        <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Kids Cut</Text>
                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                        </View>
                        <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>$40</Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 15, paddingVertical: 5 }}>
                    <View style={[ThemeStyling.twoColumnLayout, { alignItems: "flex-start" }]}>
                        <View style={{ marginRight: 10 }}>
                            <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/staticimages/default.jpg')} />
                            </View>
                        </View>
                        <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Beard Colour</Text>
                            <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                        </View>
                        <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>$20</Text>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}