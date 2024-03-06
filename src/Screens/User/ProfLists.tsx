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
            type: 'list',
        }
    }
    async componentDidMount() {

        this.setState({ loader: true })
        await this.getApiData();
    }
    async getApiData(search:any=undefined) {
        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location })
        console.log(await Location.reverseGeocodeAsync({latitude:location?.coords?.latitude,longitude:location?.coords?.longitude}));
        let params = "latitude=" + location?.coords?.latitude + "&longitude=" + location?.coords?.longitude
        if(this.props?.route?.params?.data?.id){
            params= params+"&cat=" + this.props?.route?.params?.data?.id
        }
        if(search){
            params= params+"&q=" +search;
        }
        CommonApiRequest.getProfListsForUser(params).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.results })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    getMarkerView() {
        if (this.state?.dataObj?.length) {

        }
    }
    updateState(isFav: any, index: number) {
        this.state.dataObj[index].isFav = isFav;
        this.setState({ dataObj: this.state.dataObj })
    }
    searchCategory(text){
        this.setState({ loader: true })
        this.getApiData(text);
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
                onSearchCallback={(data)=>{this.searchCategory(data)}}
            >
                <View style={{ width: '100%'}}>
                    <View style={{ flexDirection: "row" }}>
                        <Pressable style={{ width: '48%', marginRight: 5 }} onPress={() => { this.setState({ type: 'map' }) }}><Text>Map</Text></Pressable>
                        <Pressable style={{ width: '48%' }} onPress={() => { this.setState({ type: 'list' }) }}><Text>List</Text></Pressable>
                    </View>
                </View>

                {this.state?.type === 'list' &&
                    <View style={ThemeStyling.container}>

                        {/* Card */}
                        {this.state?.type === 'list' && this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item, index) => {
                            return <ProfCard data={item} key={index} navigation={this.props.navigation} didUpdate={(data) => { this.updateState(data, index) }} isOnPressed={true} onClickResponse={() => {
                                this.props.navigation.navigate("Professional Detail", { data: item })
                            }}></ProfCard>
                        })}
                    </View>
                }
                {this.state?.type === 'map' && this.state?.dataObj && this.state.location &&
                    <View style={{ height: Dimensions.get('screen').height - 157, width: Dimensions.get('screen').width, backgroundColor: 'red' }}>
                        <MapCard data={this.state?.dataObj} location={this.state.location} navigation={this.props.navigation}></MapCard>
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