import { Component, ReactNode } from "react";
import { FontAwesome, Ionicons, FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import ProfCard from "../../Components/Common/ProfCard";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapCard from "../../Components/MapCard";
export default class ProfLists extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
        }
    }
    async componentDidMount() {

        this.setState({ loader: true })
        await this.getApiData();
    }
    async getApiData() {
        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location })
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
    getMarkerView() {
        if (this.state?.dataObj?.length) {

        }
    }
    render() {
        return (
            <MainLayout onRefresh={() => { this.getApiData() }} headerText="" loader={this.state?.loader} containerStyle={{ paddingTop: 1 }}>
                <View style={{ width:'100%'}}>
                    <View style={{flexDirection:"row"}}>
                        <Pressable style={{ width:'48%',marginRight:5 }} onPress={()=>{this.setState({type:'map'})}}><Text>Map</Text></Pressable>
                        <Pressable style={{ width:'48%' }} onPress={()=>{this.setState({type:'list'})}}><Text>List</Text></Pressable>
                    </View>
                </View>
               
                {this.state?.type === 'list' &&
                    <View style={ThemeStyling.container}>
                        
                        {/* Card */}
                        {this.state?.type === 'list' && this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item, index) => {
                            return <ProfCard data={item} key={index} navigation={this.props.navigation}></ProfCard>
                        })}
                    </View>
                }
                {this.state?.type === 'map' && this.state?.dataObj && this.state.location &&
                    <View style={{ height: Dimensions.get('screen').height-137, width: Dimensions.get('screen').width, backgroundColor: 'red' }}>
                        <MapCard data={this.state?.dataObj} location={this.state.location}></MapCard>
                    </View>
                }
            </MainLayout>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});