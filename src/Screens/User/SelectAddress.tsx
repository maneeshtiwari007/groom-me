import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, TextInput } from 'react-native';
import InputComponent from "../../Components/Common/InputComponent";
import FormGroup from "../../Components/Common/FormGroup";
import AppIntroSlider from 'react-native-app-intro-slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
export default class SelectAddress extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
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
                            <View>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 10, paddingBottom: 0 }]}>Enter Complete Address</Text>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your mobile number</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your email id</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your email id</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your address</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your city</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your state</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Enter your state</Text>
                                <TextInput style={ThemeStyling.formcontrol} placeholder=""></TextInput>
                            </View>
                            <View>
                                <Text style={ThemeStyling.text1}>Your saved address</Text>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                                        <View style={[ThemeStyling.col1, { marginRight: 10 }]}>
                                            <Feather name="circle" size={24} color="black" />
                                        </View>
                                        <View style={[ThemeStyling.col11, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginRight: 5 }]}>Home</Text>
                                                <Text style={[ThemeStyling.text2, { color: Colors.success_color }]}>201.12 m away</Text>
                                            </View>
                                            <View><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                Groom Me Technologies Inc. 2411 Newcastle Crescent, Oakville, ON L6M 4P9</Text></View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                                        <View style={[ThemeStyling.col1, { marginRight: 10 }]}>
                                            <Feather name="circle" size={24} color="black" />
                                        </View>
                                        <View style={[ThemeStyling.col11, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginRight: 5 }]}>Manish Kumar Tiwari</Text>
                                                <Text style={[ThemeStyling.text2, { color: Colors.success_color }]}>1000.60 m away</Text>
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                    A8 Ground Floor parsavnath city, Lucknow, UP 226028, India
                                                </Text>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                    Phone No: +91 xxxx xxxx xx
                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                                        <View style={[ThemeStyling.col1, { marginRight: 10 }]}>
                                            <Feather name="circle" size={24} color="black" />
                                        </View>
                                        <View style={[ThemeStyling.col11, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginRight: 5 }]}>Shiv Kumar Tiwari</Text>
                                                <Text style={[ThemeStyling.text2, { color: Colors.success_color }]}>3900.23 m away</Text>
                                            </View>
                                            <View>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                    8c/275 Vrindavan Colony, Lucknow, Uttar Pradesh 226029, India
                                                </Text>
                                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                    Phone No: +91 xxxx xxxx xx
                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15 }]}>
                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Save address</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainLayout >
        );
    }
}