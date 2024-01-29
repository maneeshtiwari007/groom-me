import { Component, ReactNode } from "react";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet } from 'react-native';
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
        this.setState({ loader: true });
        await this.getApiData();
    }
    async getApiData() {
        const location = await Location.getCurrentPositionAsync({});
        const params = "latitude=" + location?.coords?.latitude + "&longitude=" + location?.coords?.longitude + "&cat=" + this.props?.route?.params?.data?.id
        CommonApiRequest.getProfListsForUser(params).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.results })
            }
        }).catch((error) => {
            this.setState({ loader: false })
            console.log(error);
        })
    }
    render() {
        return (
            <MainLayout onRefresh={() => { this.getApiData() }} headerText="" loader={this.state?.loader} containerStyle={{ paddingTop: 10 }}>
                <View style={ThemeStyling.container}>
                    {/* Card */}
                    {this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item, index) => {
                        return <ProfCard data={item} key={index} navigation={this.props.navigation}></ProfCard>
                    })}
                </View>
            </MainLayout>
        );
    }
}