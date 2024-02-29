import { Component, ReactNode } from "react";
import { FontAwesome, FontAwesome6, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Fontisto } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, TextInput } from 'react-native';
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
import usePaymentHook from '../../utilty/usePaymentHook';
import {
    BillingDetails,
    CardField,
    CardFieldInput,
    CardForm,
    StripeProvider,
    useStripe,
} from '@stripe/stripe-react-native';
import PaymentStateInterface from "../../Interfaces/States/PaymentStateInterface";
export default class Payment extends Component<ScreenInterfcae, PaymentStateInterface>{
    publishableKey = "pk_test_x923gp2pqkT8utgAVRjfLHNY";
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
        await this.setUpIntent()

    }
    getMarkerView() {
        if (this.state?.dataObj?.length) {

        }
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    async addCard() {
        const billingDetails: BillingDetails = {
            email: 'test096343rnhyg@gmail.com',
            name: 'Test-test096343rnhyg',

        };
        this.setState({loader:true})
        CommonApiRequest.startPayment(this.state.dataObj?.client_secret, billingDetails, this.state.dataObj?.id).then((response) => {
            console.log("Payment")
            console.log(response);
            this.setState({loader:false})
        }).catch(()=>{
            this.setState({loader:false})
        })
    }
    async setUpIntent() {
        this.setState({loader:true})
        const params = { amount: this.props.route?.params?.otherData?.totalamount };
        CommonApiRequest.createStripeIntent(params).then((response) => {
            this.setState({loader:false})
            this.setState({ dataObj: response?.result })
        }).catch(()=>{
            this.setState({loader:false})
        })
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
                                    <View style={[ThemeStyling.paymentMethod]}>
                                        <FontAwesome style={{ marginBottom: 5 }} name="cc-stripe" size={18} color="red" />
                                        <Text style={[ThemeStyling.text1, { textAlign: "center", fontWeight: '400', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Stripe</Text>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            <StripeProvider publishableKey={this.publishableKey} urlScheme="https://fw.kurieta.ca/">
                                <CardForm
                                    onFormComplete={(cardDetails) => {
                                        console.log('card details', cardDetails);
                                        this.setState({ card: cardDetails })

                                    }}
                                    style={{ height: 200 }}
                                />
                                <Pressable onPress={() => this.addCard()}>
                                    <Text>Add Card to Wallet</Text>
                                </Pressable>
                            </StripeProvider>
                            {/*Start Master Card */}
                            {/* <View>
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
                            </View> */}
                            {/* End Master Card */}
                            {/* Start Google Pay */}
                            {/* <View style={{ marginBottom: 20 }}>
                                <View style={{ alignItems: "center", marginBottom: 15 }}>
                                    <FontAwesome6 style={{ marginBottom: 0 }} name="google-pay" size={42} color="orange" />
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '400', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Pay with google Pay</Text>
                                </View>
                                <View>
                                    <TextInput style={ThemeStyling.formcontrol} placeholder="Enter your UPI ID"></TextInput>
                                </View>
                            </View> */}
                            {/* End Google Pay */}
                            {/* Start Paypal */}
                            {/* <View>
                                <View style={{ alignItems: "center", marginBottom: 15 }}>
                                    <FontAwesome name="cc-paypal" size={42} color="blue" />
                                </View>
                                <View>
                                    <TextInput style={ThemeStyling.formcontrol} placeholder="Enter your e-mail id"></TextInput>
                                </View>
                            </View> */}
                            {/* End Paypal */}
                        </View>
                    </ScrollView>
                    <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15 }]}>
                        {!this.state?.card &&
                            <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, opacity: 0.5 }]} onPress={() => this.addCard()} disabled={(this.state?.card) ? false : true}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Payment</Text>
                            </TouchableOpacity>
                        }
                        {this.state?.card &&
                            <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]} onPress={() => this.addCard()}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Payment</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </MainLayout >
        );
    }
}