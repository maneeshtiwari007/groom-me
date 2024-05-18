import { Component, ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, Pressable, FlatList, TextInput, Modal, SafeAreaView, StatusBar, ScrollView, Platform, Alert } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import ServicesCard from "../../Components/ServicesCard";
import Colors from "../../utilty/Colors";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import MyServiceCardSingle from "../../Components/MyServiceCardSingle";
import { CommonHelper } from "../../utilty/CommonHelper";
import ImageComponent from "../../Components/Common/ImageComponent";
import { DashboardCard } from "../../Components/Cards/DashboardCard";
export default class Dashboard extends Component<ScreenInterfcae, CommonScreenStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            visible: false,
            msgData: false,
            loaderText: 'Please wait...'
        }
    }
    async componentDidMount() {
        const user = await CommonHelper.getUserData();
        this.setState({ loader: true,userObj:user })
        await this.getPAiData();
    }
    async getPAiData(){
        CommonApiRequest.dashboardApiData().then((response:any)=>{
            if(response?.status===200){
                this.setState({ loader: false })
                this.setState({dataObj:response?.results});
            }
        }).catch(()=>{
            this.setState({ loader: false })
        });
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => {this.getPAiData()}}
                otherText="Dashboard"
                loader={this.state?.loader}
                navigation={this.props.navigation}
                containerStyle={{ paddingTop: 0.01 }}
                route={this.props.route}
                showHeaderText={false}
                isSearchBar={false}
                loaderText={this.state.loaderText}
            >
                <View style={[ThemeStyling.bgPrimary, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 15 }]}>
                    <View style={[ThemeStyling.container, { justifyContent: "space-between", flexDirection: "row", minHeight: 1, width: '100%', minWidth: '100%' }]}>
                        <View>
                            <View>
                                <Text style={[ThemeStyling.heading2, { color: Colors.white }]}>Hello, {CommonHelper.getUserName(this.state.userObj)}</Text>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={[ThemeStyling.text1, { color: Colors.primary_light_color }]}>{CommonHelper.getCurrentDate()}</Text>
                            </View>
                        </View>
                        {/* <View style={{ position: "relative", top: 10 }}>
                            <TouchableOpacity style={{ position: "relative" }}>
                                <FontAwesome name="bell-o" size={20} color={Colors.white} />
                                <Text style={[ThemeStyling.text5, { color: Colors.white, fontWeight: '700', borderRadius: 100, width: 20, height: 20, lineHeight: 20, backgroundColor: Colors.success_color, position: "absolute", top: -10, right: -10 }]}>14</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
                <View style={[ThemeStyling.container, { alignItems: "flex-start", minHeight: 1, paddingBottom: 0,padding:0,marginHorizontal:10 }]}>
                    <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-evenly", marginTop: -25,width:'100%' }}>
                        <DashboardCard
                            data={{
                                title: 'Total Bookings',
                                value: this.state?.dataObj?.total_booking,
                                iconName: 'shopping-cart',
                                iconStyle: { color: Colors.complteted_color },
                                subTitle: (this.state?.dataObj?.today_booking)?this.state?.dataObj?.today_booking+' new booking today':'0 new booking today',
                                iconContainerStyle: ThemeStyling.bglightInfo,
                                headingSTyle: { color: Colors.complteted_color },
                                titleStyle:{color: Colors.complteted_color}
                            }} />
                        <DashboardCard
                            data={{
                                title: 'Completed',
                                value: this.state?.dataObj?.total_complete_booking,
                                iconName: 'shopping-cart',
                                iconStyle: { color: Colors.success_color },
                                subTitle: (this.state?.dataObj?.today_complete_booking)?this.state?.dataObj?.today_complete_booking+' booking completed today':'0 booking completed today',
                                iconContainerStyle: ThemeStyling.bglightSuccess,
                                headingSTyle: { color: Colors.success_color },
                                titleStyle:{color: Colors.success_color}
                            }} />
                    </View>
                    <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-evenly",width:'100%' }}>
                        <DashboardCard
                            data={{
                                title: 'Canceled',
                                value: this.state?.dataObj?.total_cancel_booking,
                                iconName: 'remove',
                                iconStyle: { color: Colors.primary_color },
                                subTitle: (this.state?.dataObj?.today_cancel_booking)?this.state?.dataObj?.today_cancel_booking+' order canceled today':'0 booking canceled today',
                                iconContainerStyle: ThemeStyling.bglightDanger,
                                headingSTyle: { color: Colors.primary_color },
                                titleStyle:{color: Colors.primary_color}
                            }} />
                        <DashboardCard
                            data={{
                                title: 'Pending',
                                value: this.state?.dataObj?.total_pending_booking,
                                iconName: 'shopping-cart',
                                iconStyle: { color: Colors.primary_color },
                                subTitle: '',
                                iconContainerStyle: ThemeStyling.bglightDanger,
                                headingSTyle: { color: Colors.primary_color },
                                titleStyle:{color: Colors.primary_color}
                            }} />
                    </View>
                    <View style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-evenly",width:'100%' }}>
                        <DashboardCard
                            data={{
                                title: 'Processing',
                                value: this.state?.dataObj?.total_processing_booking,
                                iconName: 'remove',
                                iconStyle: { color: Colors.orange_color },
                                subTitle: '',
                                iconContainerStyle: ThemeStyling.bglightDanger,
                                headingSTyle: { color: Colors.orange_color },
                                titleStyle:{color: Colors.orange_color}
                            }} />
                        <View style={[{ width: '47%'}]}></View>
                    </View>
                </View>

            </MainLayout>
        );
    }
}