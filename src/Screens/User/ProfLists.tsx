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
export default class ProfLists extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {

            loader: false
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        await this.getApiData()
    }
    async getApiData() {
        CommonApiRequest.getServiceCategory({}).then((response: any) => {
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
            <MainLayout onRefresh={() => { }} headerText="" loader={this.state?.loader}>
                <View style={ThemeStyling.container}>
                    {/* Card */}
                    <View style={ThemeStyling.card}>
                        <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                            <View style={ThemeStyling.twoColumnLayout}>
                                <View style={[ThemeStyling.col4, { marginRight: 10}]}>
                                    <Image style={ThemeStyling.cardImage2} source={require('../../../assets/staticimages/thumbnail2.jpg')} />
                                </View>
                                <View style={[ThemeStyling.col8, {padding:20, paddingLeft:0}]}>
                                    <View style={{marginBottom:10}}>
                                        <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color}]}>Barbar Republic</Text>
                                        <View style={[ThemeStyling.starRating]}>
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" />
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                       <View><Ionicons name="location-outline" size={18} style={{color:Colors.secondry_color}} /></View>
                                       <Text style={[ThemeStyling.text2, {color:Colors.secondry_color}]}>It has survived not only five centuries 810093</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Card End*/}
                     {/* Card */}
                     <View style={ThemeStyling.card}>
                        <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                            <View style={ThemeStyling.twoColumnLayout}>
                                <View style={[ThemeStyling.col4, { marginRight: 10}]}>
                                    <Image style={ThemeStyling.cardImage2} source={require('../../../assets/staticimages/thumbnail2.jpg')} />
                                </View>
                                <View style={[ThemeStyling.col8, {padding:20, paddingLeft:0}]}>
                                    <View style={{marginBottom:10}}>
                                        <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color}]}>Barbar Republic</Text>
                                        <View style={[ThemeStyling.starRating]}>
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" />
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                       <View><Ionicons name="location-outline" size={18} style={{color:Colors.secondry_color}} /></View>
                                       <Text style={[ThemeStyling.text2, {color:Colors.secondry_color}]}>It has survived not only five centuries 810093</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Card End*/}
                     {/* Card */}
                     <View style={ThemeStyling.card}>
                        <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                            <View style={ThemeStyling.twoColumnLayout}>
                                <View style={[ThemeStyling.col4, { marginRight: 10}]}>
                                    <Image style={ThemeStyling.cardImage2} source={require('../../../assets/staticimages/thumbnail2.jpg')} />
                                </View>
                                <View style={[ThemeStyling.col8, {padding:20, paddingLeft:0}]}>
                                    <View style={{marginBottom:10}}>
                                        <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color}]}>Barbar Republic</Text>
                                        <View style={[ThemeStyling.starRating]}>
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" />
                                         <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" />
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row"}}>
                                       <View><Ionicons name="location-outline" size={18} style={{color:Colors.secondry_color}} /></View>
                                       <Text style={[ThemeStyling.text2, {color:Colors.secondry_color}]}>It has survived not only five centuries 810093</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Card End*/}
                </View>
            </MainLayout>
        );
    }
}