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
import { Linking } from 'react-native';
import {
    BillingDetails,
    CardField,
    CardFieldInput,
    CardForm,
    StripeProvider,
    useStripe,
    initPaymentSheet,
    presentPaymentSheet,
    confirmPaymentSheetPayment
} from '@stripe/stripe-react-native';
import PaymentStateInterface from "../../Interfaces/States/PaymentStateInterface";
import { ConstantsVar } from "../../utilty/ConstantsVar";
import ImageComponent from "../../Components/Common/ImageComponent";
export default class Payment extends Component<ScreenInterfcae, PaymentStateInterface> {
    publishableKey = ConstantsVar.PUBLISH_KEY;
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            ratingDataObj: [1, 2, 3, 4, 5]
        }
    }
    async componentDidMount() {
        const locationObj = await CommonHelper.getData(ConstantsVar.LOCATION_KEY);
        const location = locationObj?.location
        this.setState({ location: location });

        const user = await CommonHelper.getUserData();
        this.setState({ userObj: user })
        const initialUrl = await Linking.getInitialURL();
        const objParams = await this.formatObjOrderData();
        this.setState({ otherDataObj: objParams });
    }
    async getApiData() {
        //await this.createOrder();
        await this.setUpIntent()
    }
    async createIntent() {
        if (this.state?.orderObj?.id) {
            await this.setUpIntent(this.state?.orderObj?.id)
        } else {
            await this.createOrder();
        }
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 21.5)
    }
    async addCard() {
        this.setState({ loader: true });
        setTimeout(() => {
            const billingDetails: BillingDetails = {
                email: this?.state?.userObj?.email,
                name: this?.state?.userObj?.name,
            };
            CommonApiRequest.startPayment(this.state.dataObj?.client_secret, billingDetails, this.state.dataObj?.id).then((response: any) => {
                this.setState({ loader: false });
                this.setState({ loader: true });
                if (response?.status == 'success') {
                    this.setState({ paymentData: response?.data });
                    setTimeout(() => {
                        this.createOrder();
                    }, 500)
                } else if (response?.status == 'error') {
                    this.setState({ loader: false });
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.message, top: 20 } })
                }
            }).catch((error) => {
                this.setState({ loader: false })
            })
        }, 700)

    }
    async setUpIntent(orderId: any = '') {
        this.setState({ loader: true })
        const params = { amount: this.props.route?.params?.otherData?.totalamount, orderId: orderId };
        CommonApiRequest.createStripeIntent(params).then((response) => {
            this.setState({ loader: false })
            this.setState({ dataObj: response?.result });
            setTimeout(() => {
                this.initPayment();
                //this.addCard()
            }, 700)
        }).catch(() => {
            this.setState({ loader: false })
        })
    }

    async formatObjOrderData() {
        //const reverGeocode = await Location.reverseGeocodeAsync({ latitude: this.state.location?.coords?.latitude, longitude: this.state.location?.coords?.longitude });
        const orderObj: any = {
            services: this?.props?.route?.params?.dataObj,
            customer_detail: this.state.userObj,
            address: this.props.route?.params?.address,
            payment: this.state?.paymentData,
            bookingType: this.props?.route?.params?.bookingType,
            card: this.state?.card,
            remark: this?.props?.route?.params?.remark
        }
        if (this.props?.route?.params?.bookingType === ConstantsVar?.MOBILE_KEY) {
            orderObj.time_slot = this?.props?.route?.params?.time_slot
        }
        return orderObj;
    }
    async createOrder() {
        this.setState({ loader: true });
        const objOrderData = await this.formatObjOrderData();
        CommonApiRequest.createUserOrder(objOrderData).then((response) => {
            this.setState({ loader: false });
            if (response?.status === 200) {
                //DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Booking placed successfully!!', top: 20 } });
                //this.props.navigation.navigate("BookingSuccess");
                this.setState({ orderObj: response?.results });
                this.setUpIntent(response?.results?.id);
            } else if (response?.status === 500) {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
            } else {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: 'Something went wrong please try after sometime', top: 20 } })
            }

            //this.props.navigation.navigate("BookingSuccess");
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    async initPayment() {
        const { error, paymentOption } = await initPaymentSheet({
            customerId: this.state.dataObj?.customer,
            customerEphemeralKeySecret: this.state.dataObj?.ephemeralKey,
            paymentIntentClientSecret: this.state.dataObj?.client_secret,
            merchantDisplayName: 'Example Inc.',
            returnURL: 'exp://172.16.8.65:8081',
            appearance: {
                primaryButton: {
                    colors: {
                        background: Colors.success_color,
                        text: Colors.white,
                        border: Colors.success_color,
                    }
                }
            }
        });
        if (!error) {
            this.completePatment()
        }
    }
    async completePatment() {
        const { error, paymentOption } = await presentPaymentSheet();
        if (error) {
            if (error?.code !== 'Canceled') {
                alert('Something went wrong please try after some time');
            }
        } else {
            this.setState({ loader: false });
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Booking placed successfully!!', top: 20 } });
            setTimeout(() => {
                //this.createOrder();
                this.props.navigation.navigate("BookingSuccess");
            }, 500)
        }

    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { }}
                headerText=""
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={false}
                scollEnabled={true}
            >
                {/* <View style={{ height: Dimensions.get('screen').height - this.find_dimesions() }}>
                    <View>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <View style={[ThemeStyling.threeColumnLayout, { padding: 15 }]}>
                                <View style={{ marginRight: 15 }}>
                                    <Pressable onPress={() => this.completePatment()} style={[ThemeStyling.paymentMethod]}>
                                        <FontAwesome style={{ marginBottom: 5 }} name="cc-stripe" size={18} color="red" />
                                        <Text style={[ThemeStyling.text1, { textAlign: "center", fontWeight: '400', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Stripe</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView contentContainerStyle={{ flex: 1, minHeight: '60%' }}>
                        <View style={[ThemeStyling.container, { height: '100%' }]}>
                            <StripeProvider publishableKey={this.publishableKey}>
                                <CardForm
                                    onFormComplete={(cardDetails) => {
                                        this.setState({ card: cardDetails });
                                    }}
                                    style={{ minHeight: '100%' }}
                                />
                            </StripeProvider>
                        </View>
                    </ScrollView>
                </View> */}
                <View style={{ minHeight: Dimensions.get('screen').height - this.find_dimesions(), position: 'relative' }}>
                    <StripeProvider publishableKey={this.publishableKey}>
                        <View>
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <Text style={ThemeStyling.heading3}>Professional Detail</Text>
                            </View>
                            <View style={[ThemeStyling.card, { width: '95%', marginHorizontal: '2.5%', marginTop: 3 }]}>
                                <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                                    <View style={[ThemeStyling.twoColumnLayout]}>
                                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                            <ImageComponent style={[ThemeStyling.cardImage2]} src={CommonHelper.getImageFromSource(this?.props?.route?.params?.userObj?.photo_image)} />
                                        </View>
                                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                            <View style={{ marginBottom: 5 }}>
                                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>{this?.props?.route?.params?.userObj?.name}</Text>
                                                <View style={[ThemeStyling.starRating, { marginBottom: 8 }]}>
                                                    {this.state?.ratingDataObj && this.state?.ratingDataObj?.map((itemNumber: any, index: number) => {
                                                        if (itemNumber <= this?.props?.route?.params?.userObj?.profavgrating) {
                                                            return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.primary_color} key={index} />
                                                        } else {
                                                            return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} key={index} />
                                                        }
                                                    })}
                                                </View>
                                                <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                                    <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                                    <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this?.props?.route?.params?.userObj?.user_professional_details?.location}</Text></View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[ThemeStyling.threeColumnLayout, { marginTop: 10 }]}>
                                <View style={[ThemeStyling.col5, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1, alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <AntDesign style={{ position: "relative", top: 2 }} name="calendar" size={13} color="black" />
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Date</Text>
                                    </View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>{(this.state.otherDataObj?.bookingType !== 'live') ? CommonHelper.getCurrentDate(this.state.otherDataObj?.time_slot?.split("_")?.[1]) : CommonHelper.getCurrentDate()}</Text>
                                </View>
                                <View style={[ThemeStyling.col5, { alignItems: "center" }]}>
                                    <View style={{ flexDirection: "row", marginBottom: 0 }}>
                                        <Feather style={{ position: "relative", top: 3 }} name="phone" size={13} color="black" />
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.f12, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginLeft: 5 }]}>Phone Number</Text>
                                    </View>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f11, color: Colors.secondry_color }]}>+91(1234567891)</Text>
                                </View>
                            </View>
                            {this?.props?.route?.params?.address?.address &&
                                <>
                                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                                        <Text style={ThemeStyling.heading3}>Address Detail</Text>
                                    </View>
                                    <View style={[ThemeStyling.card, { width: '95%', marginHorizontal: '2.5%', marginTop: 3 }]}>
                                        <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                                            <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                                                <View style={[ThemeStyling.col10, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginRight: 5 }]}>{this?.props?.route?.params?.address?.place}</Text>
                                                        {/* <Text style={[ThemeStyling.text2, { color: Colors.success_color }]}>201.12 m away</Text> */}
                                                    </View>
                                                    <View><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                        {this?.props?.route?.params?.address?.address}, {this?.props?.route?.params?.address?.address?.zip_code}</Text></View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            }

                            {this.state?.otherDataObj?.remark &&
                                <View>
                                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                                        <Text style={ThemeStyling.heading3}>Remark</Text>
                                    </View>
                                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                                        <Text style={[ThemeStyling.text1]}>{this.state?.otherDataObj?.remark}</Text>
                                    </View>
                                </View>
                            }
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <Text style={ThemeStyling.heading3}>Selected Services</Text>
                            </View>
                            <View style={[ThemeStyling.container, { minHeight: 'auto', paddingTop: 2 }]}>
                                {this?.state?.otherDataObj?.services && this?.state?.otherDataObj?.services?.map((item, index) => {
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
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{this.props?.route?.params?.otherData?.subtotal}</Text>
                                    </View>
                                </View>
                                {this.props?.route?.params?.otherData?.tax && this.props?.route?.params?.otherData?.tax?.map((item, index) => {
                                    return <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 5 }]} key={index}>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{item?.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.primary_color, marginBottom: 0 }]}>{item?.price}</Text>
                                        </View>
                                    </View>
                                })}
                                <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between", marginBottom: 10 }]}>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color, marginBottom: 0 }]}>Total Pay</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.success_color, marginBottom: 0, fontFamily: 'Poppins_600SemiBold' }]}>{this.props?.route?.params?.otherData?.total}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={[ThemeStyling.ForBottomOfSCreen, { marginBottom: 10, paddingHorizontal: 15, flex: 1, width: '100%' }]}>
                            <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12 }]} onPress={() => this.createIntent()}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Confirm Booking</Text>
                            </TouchableOpacity>
                        </View>
                    </StripeProvider>
                </View>
            </MainLayout>
        );
    }
}