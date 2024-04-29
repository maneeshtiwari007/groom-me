import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, TextInput, DeviceEventEmitter, Alert, SafeAreaView, StatusBar } from 'react-native';
import InputComponent from "../../Components/Common/InputComponent";
import FormGroup from "../../Components/Common/FormGroup";
import AppIntroSlider from 'react-native-app-intro-slider';
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
import { RadioButton } from "react-native-paper";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ConstantsVar } from "../../utilty/ConstantsVar";
import { Ionicons } from '@expo/vector-icons';


export default class SelectAddress extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: true,
            type: 'list',
            index: 0,
        }
    }
    async componentDidMount() {
        await this.getApiData();
    }
    getCurrentLocation(coords: any) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + coords.latitude + ',' + coords.longitude + '&key=' + ConstantsVar.GOOGLE_API_KEY)
            .then((response) => {
                response.json().then((json) => {
                    this.setState({
                        otherData: {
                            data: json?.results?.[0],
                            details: json?.results?.[0],
                            description: "Current location",
                        }
                    })
                });
            })
    }
    async getApiData(params: string = '') {
        if (params !== "") {
            params = "?q=" + params
        }
        CommonApiRequest.getUserAddress(params).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.results })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    find_dimesions() {
        return CommonHelper.getHeightPercentage(Dimensions.get('screen').height, 17)
    }
    async changeType(type: string = 'list') {
        this.setState({ type: type, index: undefined });
        if (type === 'new') {
            this.setState({ loaderText: 'Please wait while fetching location....', loader: true })
            const location = await Location.getCurrentPositionAsync({});
            this.getCurrentLocation(location?.coords);
            this.setState({ loader: false, loaderText: undefined })
        }
    }
    fetchOtherAddressDetails(details: any = {}) {
        const city = details?.address_components?.find(item => item?.types?.includes("administrative_area_level_3"));
        const state = details?.address_components?.find(item => item?.types?.includes("administrative_area_level_1"));
        const country = details?.address_components?.find(item => item?.types?.includes("country"));
        const zipCode = details?.address_components?.find(item => item?.types?.includes("postal_code"));
        const neighborhood = details?.address_components?.find(item => item?.types?.includes("neighborhood"));
        const locality = details?.address_components?.find(item => item?.types?.includes("locality"));
        const formatted_address = details?.formatted_address;
        this.setState({
            address: {
                subLocality: locality?.long_name,
                formated_address: formatted_address,
                address_line1: neighborhood?.long_name,
                addressComp: {
                    city: city?.long_name,
                    state: state?.long_name,
                    country: country?.long_name,
                    zip_code: zipCode?.long_name,
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    address: formatted_address
                }
            }
        })
    }
    async formatAddress(details: any = {}) {
        const city = details?.address_components?.find(item => item?.types?.includes("administrative_area_level_3"));
        const state = details?.address_components?.find(item => item?.types?.includes("administrative_area_level_1"));
        const country = details?.address_components?.find(item => item?.types?.includes("country"));
        const zipCode = details?.address_components?.find(item => item?.types?.includes("postal_code"));
        const neighborhood = details?.address_components?.find(item => item?.types?.includes("neighborhood"));
        const locality = details?.address_components?.find(item => item?.types?.includes("locality"));
        const formatted_address = details?.formatted_address;
        return {
            subLocality: locality?.long_name,
            formated_address: formatted_address,
            address_line1: neighborhood?.long_name,
            addressComp: {
                city: city?.long_name,
                state: state?.long_name,
                country: country?.long_name,
                zip_code: zipCode?.long_name,
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                address: formatted_address
            }
        }
    }
    setAddressDetail(address) {
        this.fetchOtherAddressDetails(address);
    }
    onSaveAddress() {
        if (!this.state.address?.name) {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please enter address name", top: 20 } });
        } else if (!this.state.address?.building) {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please building or house no.", top: 20 } });
        } else {
            this.saveAddress();
        }
    }
    upDateMasterState(attr: any, value: any) {
        let address = (this.state?.address) ? this.state?.address : {};
        address[attr] = value;
        this.setState({ address: address });
    }
    upDateMasterStateComp(attr: any, value: any) {
        let address = (this.state?.address?.addressComp) ? this.state?.address : { addressComp: {} };
        address.addressComp[attr] = value;
        this.setState({ address: address });
    }
    saveAddress() {
        this.setState({ loader: true })
        CommonApiRequest.saveUserAddress(this.state.address).then((response) => {
            this.setState({ loader: false })
            if (response?.status === 200) {
                this.setState({ loader: true, type: 'list' });
                this.getApiData();
                this.setState({ index: response?.result?.id, commonData: response?.result })
            }

        }).catch(() => {
            this.setState({ loader: false })
        });
    }
    deleteUserAddress(id: any) {
        this.setState({ loader: true });
        CommonApiRequest.deleteUserAddress(id).then((response) => {
            this.setState({ loader: false })
            if (response?.status === 200) {
                this.setState({ loader: true, type: 'list' });
                this.getApiData();
            }
        }).catch(() => {
            this.setState({ loader: false })
        });
    }
    deleteUserAddressPrompt(id: any) {
        Alert.alert('Remove Address', 'Are you sure you want remove this address!!', [
            {
                text: 'Yes',
                onPress: () => this.deleteUserAddress(id),
            },
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            }
        ]);
    }
    onNext() {
        this.props?.navigation?.navigate("Payment",
            {
                dataObj: this.props.route?.params?.dataObj,
                userObj: this.props.route?.params?.userObj,
                otherData: this.props.route?.params?.otherData,
                remark: this.props.route?.params?.remark,
                bookingType: this.props.route?.params?.bookingType,
                address: this.state.commonData,
                time_slot: this.props.route?.params?.slotKey + "__" + this.props.route?.params?.bookingDate
            }
        )
    }
    render() {

        return (
            <>
                <MainLayout
                    otherText=""
                    loader={this.state?.loader}
                    containerStyle={{ paddingTop: 1 }}
                    navigation={this.props.navigation}
                    route={this.props.route}
                    scollEnabled={true}
                    onRefresh={() => { this.getApiData() }}
                    loaderText={this.state?.loaderText}
                >
                    <View>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            {this.state?.type === 'new' &&
                                <View>
                                    <View>
                                        <Text style={[ThemeStyling.heading3, { marginBottom: 10, paddingBottom: 0 }]}>Enter Complete Address</Text>
                                    </View>
                                    <View>
                                        <GooglePlacesAutocomplete
                                            placeholder='Enter Location....'
                                            fetchDetails={true}
                                            onPress={(data, details:any = null) => {
                                                this.setAddressDetail((details?.data) ? details?.data : details);
                                            }}
                                            query={{
                                                key: ConstantsVar.GOOGLE_API_KEY,
                                                language: 'en',

                                            }}
                                            enablePoweredByContainer={false}
                                            predefinedPlaces={[this.state.otherData]}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Name</Text>
                                        <TextInput onChangeText={(text) => { this.upDateMasterState('name', text) }} style={ThemeStyling.formcontrol} placeholder="Work or Office or etc..." value={this.state?.address?.name}></TextInput>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Building or house no.</Text>
                                        <TextInput onChangeText={(text) => { this.upDateMasterState('building', text) }} style={ThemeStyling.formcontrol} placeholder="like 292 b..." value={this.state?.address?.building}></TextInput>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>City</Text>
                                        <TextInput onChangeText={(text) => { this.upDateMasterStateComp('city', text) }} style={ThemeStyling.formcontrol} placeholder="City" value={this.state?.address?.addressComp?.city}></TextInput>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>State</Text>
                                        <TextInput onChangeText={(text) => { this.upDateMasterStateComp('state', text) }} style={ThemeStyling.formcontrol} placeholder="State" value={this.state?.address?.addressComp?.state}></TextInput>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Country</Text>
                                        <TextInput onChangeText={(text) => { this.upDateMasterStateComp('country', text) }} style={ThemeStyling.formcontrol} placeholder="Country" value={this.state?.address?.addressComp?.country}></TextInput>
                                    </View>
                                    <View style={{ marginBottom: 15 }}>
                                        <Text style={[ThemeStyling.formLabel, { marginBottom: 5 }]}>Postal code</Text>
                                        <TextInput onChangeText={(text) => { this.upDateMasterStateComp('zip_code', text) }} style={ThemeStyling.formcontrol} placeholder="Postal Code" value={this.state?.address?.addressComp?.zip_code}></TextInput>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, width: 150 }]} onPress={() => { this.onSaveAddress() }}>
                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Save</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, width: 150 }]} onPress={() => { this.changeType('list') }}>
                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            {this.state?.type === 'list' &&
                                <>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, bottom: 10 }}>
                                            <Text style={[ThemeStyling.text1]}>Select from saved address or</Text>
                                            <TouchableOpacity style={[ThemeStyling.btnPrimary, { marginLeft: 5, height: 'auto', borderRadius: 12, width: 'auto', padding: 5 }]} onPress={() => { this.changeType('new') }}>
                                                <Text style={{ color: Colors.white }}>New address</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {this.state?.dataObj && this.state?.dataObj?.map((item, index) => {
                                        return <View style={ThemeStyling.card} key={index}>
                                            <View style={[ThemeStyling.cardBody, { paddingBottom: 5 }]}>
                                                <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                                                    <TouchableOpacity style={[ThemeStyling.col1, { marginRight: 10, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }]} onPress={() => { this.setState({ index: item?.id, commonData: item }) }}>
                                                        {this.state.index === item?.id &&
                                                            <AntDesign name="checkcircle" size={24} color={Colors.primary_color} />
                                                        }
                                                        {this.state.index !== item?.id &&
                                                            <Feather name="circle" size={24} color={Colors.primary_color} />
                                                        }
                                                    </TouchableOpacity>
                                                    <View style={[ThemeStyling.col10, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color, marginRight: 5 }]}>{item?.place}</Text>
                                                            {/* <Text style={[ThemeStyling.text2, { color: Colors.success_color }]}>201.12 m away</Text> */}
                                                        </View>
                                                        <View><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>
                                                            {item?.address}, {item?.zip_code}</Text></View>
                                                    </View>
                                                    <View style={[ThemeStyling.col1, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                                        <TouchableOpacity style={[ThemeStyling.col1, { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }]} onPress={() => { this.deleteUserAddressPrompt(item?.id) }}>
                                                            <AntDesign name="delete" size={24} color={Colors.primary_color} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    })}
                                    {this.state?.dataObj?.length <= 0 &&
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", height: 200 }}>
                                            <Text style={[ThemeStyling.heading3, { textAlign: 'center' }]}>No record Found</Text>
                                        </View>
                                    }

                                </>
                            }
                        </View>
                    </View>
                </MainLayout>
                {this.state?.type === 'list' &&
                    <View style={{ padding: 10 }}>
                        <Pressable disabled={(this.state?.index) ? false : true} style={[ThemeStyling.btnPrimary, { height: 45, borderRadius: 12, backgroundColor: Colors.success_color, opacity: ((this.state?.index)) ? 1 : 0.5 }]} onPress={() => { this.onNext() }}>
                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.p }]}>Next</Text>
                        </Pressable>
                    </View>
                }
            </>
        );
    }
}