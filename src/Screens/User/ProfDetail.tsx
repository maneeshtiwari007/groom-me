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
        this.setState({ loader: false });
    }
    
    render() {
        return (
            <MainLayout onRefresh={() => {  }} headerText="" loader={this.state?.loader} containerStyle={{ paddingTop: 10 }}>
                <View style={ThemeStyling.container}>
                    
                </View>
            </MainLayout>
        );
    }
}