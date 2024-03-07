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
import BookingCard from "../../Components/Common/BookingCard";
import NoRecordFound from "../../Components/Common/NoRecordFound";
export default class Bookings extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'up'
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        await this.getApiUpcomingData();
    }
    async getApiData() {
        this.setState({ loader: true })
        CommonApiRequest.getUserBookingList("").then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.result })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    async getApiUpcomingData() {
        this.setState({ loader: true })
        CommonApiRequest.getUserUpcomingBookingList("").then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.result })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    changeTab(type: string = 'up') {
        console.log(type);
        this.setState({ type: type });
        if(type==='up'){
            this.getApiUpcomingData()
        } else {
            this.getApiData();
        }
    }
    refreshAPiData(){
        if(this.state.type==='up'){
            this.getApiUpcomingData()
        } else {
            this.getApiData();
        }
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.refreshAPiData() }}
                otherText="Booking Lists"
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 0.1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={false}
                scollEnabled={true}
                isTab={true}
                tabData={[{name:'Upcoming',key:'up'},{name:'Archive',key:'arc'}]}
                tabDefaultKey={this.state?.type}
                onClickTab={(changeTab)=>{this.changeTab(changeTab)}}
            >
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary_color }}>
                    <View style={[(this.state?.type === 'up') ? ThemeStyling.tabActive : {}, { width: '45%', marginRight: 10, justifyContent: 'center', alignItems: 'center' }]}>
                        <Pressable onPress={() => { this.changeTab('up') }} style={{ width: '100%', alignItems: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: Colors.white }}>Upcoming</Text>
                        </Pressable>
                    </View>
                    <View style={[(this.state?.type === 'arc') ? ThemeStyling.tabActive : {}, { width: '45%', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }]}>
                        <Pressable onPress={() => { this.changeTab('arc') }} style={{ width: '100%', alignItems: 'center', paddingVertical: 15 }}>
                            <Text style={{ color: Colors.white }}>Archive</Text>
                        </Pressable>
                    </View>
                </View> */}
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        {this.state?.dataObj && this.state?.dataObj?.map((item, key) => {
                            return <BookingCard data={item} key={key} isArchive={true}></BookingCard>
                        })}
                        {/* <View style={{ minHeight:300,justifyContent:'center',alignItems:'center',flex:1 }}>
                            <Text style={[ThemeStyling.heading4,{textAlign:'center',color:'black',opacity:1}]}>No data found</Text>
                        </View> */}
                        {this.state?.dataObj?.length <= 0 &&
                            <NoRecordFound data={{head:'No Record found',msg:'There is no data found please try with other'}}></NoRecordFound>
                        }
                    </View>
                </View>
            </MainLayout >
        );
    }
}