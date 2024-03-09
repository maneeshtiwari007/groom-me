import { Component, ReactNode } from "react";
import { FontAwesome, FontAwesome6, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Fontisto } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, TextInput, DeviceEventEmitter } from 'react-native';
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
import { ConstantsVar } from "../../utilty/ConstantsVar";
export default class Payment extends Component<ScreenInterfcae, PaymentStateInterface>{
    publishableKey = "pk_test_516DulZE61VXq3iXLo6rMjpiLpvExilReH3ma8LW7gm20HNSCP1yQ8M9hlzfXZNMrrR6FnmTLpMUtaKprfH8FNs8p00ZVc5a88T";
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
        }
    }
    async componentDidMount() {
        //this.setState({ loader: true })
        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
        const user = await CommonHelper.getUserData();
        this.setState({ userObj: user })
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
        setTimeout(() => {
            const billingDetails: BillingDetails = {
                email: this?.state?.userObj?.email,
                name: this?.state?.userObj?.name,

            };
            CommonApiRequest.startPayment(this.state.dataObj?.client_secret, billingDetails, this.state.dataObj?.id).then((response) => {
                this.setState({ loader: false });
                this.setState({ loader: true });
                if (response?.status == 'success') {
                    this.setState({ paymentData: response?.data });
                    setTimeout(() => {
                        this.createOrder();
                    }, 500)
                }
            }).catch(() => {
                this.setState({ loader: false })
            })
        }, 700)

    }
    async setUpIntent() {
        this.setState({ loader: true })
        const params = { amount: this.props.route?.params?.otherData?.totalamount };
        CommonApiRequest.createStripeIntent(params).then((response) => {
            this.setState({ dataObj: response?.result });
            setTimeout(() => {
                this.addCard()
            }, 700)
        }).catch(() => {
            this.setState({ loader: false })
        })
    }
    async formatObjOrderData() {
        const reverGeocode = await Location.reverseGeocodeAsync({ latitude: this.state.location?.coords?.latitude, longitude: this.state.location?.coords?.longitude });
        const orderObj = {
            services: this?.props?.route?.params?.dataObj,
            customer_detail: this.state.userObj,
            address: {
                zip_code: reverGeocode?.[0]?.postalCode,
                latitude: this.state.location?.coords?.latitude,
                longitude: this.state.location?.coords?.longitude,
                city: reverGeocode?.[0]?.city,
                state: reverGeocode?.[0]?.district,
                country: reverGeocode?.[0]?.country,
                subLocality: reverGeocode?.[0]?.name,
                address: reverGeocode?.[0]?.name + " " + reverGeocode?.[0]?.city + " " + reverGeocode?.[0]?.country,
            },
            payment: this.state?.paymentData,
            bookingType: 'live',
            card: this.state?.card
        }
        return orderObj;
    }
    async createOrder() {
        const objOrderData = await this.formatObjOrderData();
        CommonApiRequest.createUserOrder(objOrderData).then((response) => {
            console.log('response');
            console.log(response);
            if (response?.status === 200) {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Booking placed successfully!!', top: 20 } });
                this.props.navigation.navigate("BookingSuccess");
            } else if (response?.status === 500) {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
            } else {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: 'Something went wrong please try after sometime', top: 20 } })
            }
            this.setState({ loader: false });
            //this.props.navigation.navigate("BookingSuccess");
        }).catch(() => {
            this.setState({ loader: false })
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
                                        this.setState({ card: cardDetails });
                                    }}
                                    style={{ height: 200 }}

                                />
                            </StripeProvider>
                        </View>
                    </ScrollView>
                    <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15 }]}>
                        {!this.state?.card &&
                            <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, opacity: 0.5 }]} onPress={() => this.setUpIntent()} disabled={(this.state?.card) ? false : true}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Payment</Text>
                            </TouchableOpacity>
                        }
                        {this.state?.card &&
                            <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]} onPress={() => this.setUpIntent()}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Payment</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </MainLayout >
        );
    }
}