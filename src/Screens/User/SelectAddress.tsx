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