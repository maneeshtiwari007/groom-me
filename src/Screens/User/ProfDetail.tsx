import { Component, ReactNode } from "react";
import { FontAwesome, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions, Pressable, Button } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import ProfCard from "../../Components/Common/ProfCard";
import { TabBar, TabView } from 'react-native-tab-view';
import ProfServicesComponent from "../../Components/ProfServicesComponent";
import ProfInformationComponent from "../../Components/ProfInformationComponent";
import ProfReviewComponent from "../../Components/ProfReviewComponent";
import { CommonHelper } from "../../utilty/CommonHelper";
import ButtonComponent from "../../Components/Common/ButtonComponent";
export default class ProfDetail extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            index: 0,
            routes: [
                { key: '1', title: 'Services' },
                { key: '2', title: 'Information' },
                { key: '3', title: 'Review' },
            ],

        }
    }
    async componentDidMount() {
        this.setState({ loader: true });
        await this.getApiData()
    }
    async getApiData() {
        const id = this.props.route?.params?.data?.id;
        CommonApiRequest.getProfDetails(id).then((response) => {
            this.setState({ loader: false });
            if (response?.status === 200) {
                this.setState({ dataObj: response?.results });
            }
        }).then((error) => {
            this.setState({ loader: false });
        })
    }
    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <ProfServicesComponent data={this.state?.dataObj} onClickResponse={(data)=>{this.setState({commonData:data?.data});}}></ProfServicesComponent>;
            case '2':
                return <ProfInformationComponent></ProfInformationComponent>;
            case '3':
                return <ProfReviewComponent></ProfReviewComponent>;
            default:
                return null;
        }
    };
    _renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={Colors.primary_color}
            inactiveColor={Colors.secondry_color}
            style={{ backgroundColor: 'white', paddingTop: 5, paddingBottom: 5, borderColor: Colors.primary_color }}
        />
    );
    ContinueBooking(){
        this.props?.navigation?.navigate("Review Cart",{data:this.state?.commonData,prof:this.state?.dataObj?.users})
    }
    render() {
        return (
            <MainLayout scollEnabled={false} onRefresh={() => { }} headerText="" loader={this.state?.loader} containerStyle={{ paddingTop: 0.5 }} navigation={this.props.navigation} route={this.props.route}>
                {this.state?.dataObj &&
                    <>
                        <View>
                            <ImageBackground source={{ uri: this.state?.dataObj?.users?.photo }} resizeMode="cover" style={{ flex: 1, height: 150, width: '100%' }}></ImageBackground>
                        </View>
                        <View style={[ThemeStyling.card, { backgroundColor: Colors.gray200, borderRadius: 0, marginBottom: 0 }]}>
                            <View style={[ThemeStyling.cardBody, { paddingBottom: 10 }]}>
                                <View style={[ThemeStyling.twoColumnLayout,]}>
                                    <View style={[ThemeStyling.col8, { borderRightColor: Colors.gray400, borderStyle: "solid", borderRightWidth: 1 }]}>
                                        <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 3 }]}>{this.state?.dataObj?.users?.name}</Text>
                                        <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                            <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.primary_color} />
                                            <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.primary_color} />
                                            <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.primary_color} />
                                            <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.gray400} />
                                            <FontAwesome style={ThemeStyling.iconStar} name="star" color={Colors.gray400} />
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <View><Ionicons name="location-outline" size={15} style={{ color: Colors.secondry_color }} /></View>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.state?.dataObj?.users?.user_professional_details?.location}</Text>
                                        </View>
                                    </View>
                                    <View style={[ThemeStyling.col4, { alignItems: "flex-start", paddingLeft: 10 }]}>
                                        <Text style={[ThemeStyling.text2, { fontSize: 11, color: Colors.secondry_color }]}>
                                            {this.state?.dataObj && this.state?.dataObj?.users?.live &&
                                                <AntDesign name="checkcircle" size={11} color={Colors.success_color} />
                                            }
                                            {this.state?.dataObj && !this.state?.dataObj?.users?.live &&
                                                <FontAwesome5 name="times-circle" size={11} color={Colors.primary_color} />
                                            }
                                            &nbsp;Live Booking
                                        </Text>
                                        <Text style={[ThemeStyling.text2, { fontSize: 11, color: Colors.secondry_color }]}>
                                            {this.state?.dataObj && this.state?.dataObj?.users?.schedule &&
                                                <AntDesign name="checkcircle" size={11} color={Colors.success_color} />
                                            }
                                            {this.state?.dataObj && !this.state?.dataObj?.users?.schedule &&
                                                <FontAwesome5 name="times-circle" size={11} color={Colors.primary_color} />
                                            }
                                            &nbsp;Schedule Booking
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height:Dimensions.get('screen').height-CommonHelper.getHeightPercentage(Dimensions.get('screen').height,46.7) }}>
                            <TabView
                                navigationState={{ index: this.state.index, routes: this.state.routes }}
                                renderScene={this._renderScene}
                                onIndexChange={index => this.setState({ index })}
                                initialLayout={{ width: Dimensions.get('window').width }}
                                style={{ height: (Dimensions.get('screen').height / 2)-CommonHelper.getHeightPercentage(Dimensions.get('screen').height,0.09) }}
                                renderTabBar={this._renderTabBar}
                            />
                        </View>
                        <View>
                            <ButtonComponent style={[(this.state?.commonData?.length > 0)?{opacity:1}:{opacity:0.4},{backgroundColor:Colors.primary_color}]} textStyle={{color:Colors.white}} title="Continue" onPressCall={()=>{this.ContinueBooking()}} isDisabled={(this.state?.commonData?.length > 0)?'false':'true'}></ButtonComponent>
                        </View>
                    </>
                }
            </MainLayout>
        );
    }
}