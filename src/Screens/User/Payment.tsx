import { Component, ReactNode } from "react";
import { FontAwesome, FontAwesome6, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Fontisto } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, TextInput} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
export default class Payment extends Component<ScreenInterfcae, CommonScreenStateInterface>{
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
                    <View>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <View style={[ThemeStyling.threeColumnLayout, { borderBottomWidth: 1, borderBlockColor: Colors.secondry_color, borderStyle: "dashed", padding: 15 }]}>
                                <View style={{ marginRight: 15 }}>
                                    <View style={[ThemeStyling.paymentMethod, ThemeStyling.paymentSelected]}>
                                        <FontAwesome style={{ marginBottom: 5 }} name="cc-mastercard" size={18} color="red" />
                                        <Text style={[ThemeStyling.text1, { textAlign: "center", fontWeight: '400', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Mastercard</Text>
                                    </View>
                                </View>
                                <View style={{ marginRight: 15 }}>
                                    <View style={[ThemeStyling.paymentMethod]}>
                                        <Fontisto style={{ marginBottom: 5 }} name="american-express" size={18} color="blue" />
                                        <Text style={[ThemeStyling.text1, { textAlign: "center", fontWeight: '400', color: Colors.secondry_color, marginBottom: 0, marginLeft: 5 }]}>American Express</Text>
                                    </View>
                                </View>
                                <View style={{ marginRight: 15 }}>
                                    <View style={[ThemeStyling.paymentMethod]}>
                                        <FontAwesome6 style={{ marginBottom: 0 }} name="google-pay" size={32} color="orange" />
                                        <Text style={[ThemeStyling.text1, { textAlign: "center", fontWeight: '400', color: Colors.secondry_color, marginBottom: 0, marginLeft: 5 }]}>Google Pay</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={[ThemeStyling.paymentMethod]}>
                                        <FontAwesome style={{ marginBottom: 5 }} name="cc-paypal" size={18} color="blue" />
                                        <Text style={[ThemeStyling.text1, { textAlign: "center", fontWeight: '400', color: Colors.secondry_color, marginBottom: 0, marginLeft: 5 }]}>Paypal</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            {/*Start Master Card */}
                            <View>
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={ThemeStyling.formLabel}>Card holder Name</Text>
                                    <TextInput style={ThemeStyling.formcontrol2} placeholder="Enter your card holder Name"></TextInput>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={ThemeStyling.formLabel}>Card Number</Text>
                                    <TextInput style={ThemeStyling.formcontrol2} placeholder="Enter your card Number"></TextInput>
                                </View>
                                <View style={ThemeStyling.twoColumnLayout}>
                                    <View style={[ThemeStyling.col5, { marginRight: 15 }]}>
                                        <View style={{ marginBottom: 15 }}>
                                            <Text style={ThemeStyling.formLabel}>MM/YY</Text>
                                            <TextInput style={ThemeStyling.formcontrol2} placeholder="Enter date"></TextInput>
                                        </View>
                                    </View>
                                    <View style={ThemeStyling.col5}>
                                        <View style={{ marginBottom: 15 }}>
                                            <Text style={ThemeStyling.formLabel}>CVV Code</Text>
                                            <TextInput style={ThemeStyling.formcontrol2} placeholder="CVV date"></TextInput>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* End Master Card */}
                            {/* Start Google Pay */}
                            <View style={{ marginBottom: 20 }}>
                                <View style={{ alignItems: "center", marginBottom: 15 }}>
                                    <FontAwesome6 style={{ marginBottom: 0 }} name="google-pay" size={42} color="orange" />
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '400', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Pay with google Pay</Text>
                                </View>
                                <View>
                                    <TextInput style={ThemeStyling.formcontrol} placeholder="Enter your UPI ID"></TextInput>
                                </View>
                            </View>
                            {/* End Google Pay */}
                            {/* Start Paypal */}
                            <View>
                                <View style={{ alignItems: "center", marginBottom: 15 }}>
                                    <FontAwesome name="cc-paypal" size={42} color="blue" />
                                </View>
                                <View>
                                    <TextInput style={ThemeStyling.formcontrol} placeholder="Enter your e-mail id"></TextInput>
                                </View>
                            </View>
                            {/* End Paypal */}
                        </View>
                    </ScrollView>
                    <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15 }]}>
                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainLayout >
        );
    }
}