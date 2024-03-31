import { Component, ReactNode } from "react";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
export default class BookingSuccess extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <MainLayout
                headerText=""
                loader={this.state?.loader}
                navigation={this.props.navigation}
                containerStyle={{ paddingTop: 10 }}
                route={this.props.route}
                showHeaderText={false}
                isSearchBar={false}
                otherText="Success"
            >
                <View style={[ThemeStyling.container,{justifyContent:'center'}]}>
                    <View style={{ alignItems: "center" }}>

                        <View>
                            <Image source={require('../../../assets/staticimages/checkmark.png')} style={{width:100,height:100}}></Image>
                        </View>
                        <View>
                            <Text style={[ThemeStyling.heading3, { color: Colors.success_color }]}>Booking successful!</Text>
                        </View>
                        <View style={{marginBottom:20}}>
                            <Text style={[ThemeStyling.text1]}>
                                Hi <Text style={{ color: Colors.success_color }}>Manish Tiwari</Text> your booking successfully done we will send invoice to your email.
                            </Text>
                        </View>
                        <View style={[ThemeStyling.btnContainer, { marginBottom: 60,width:'100%' }]}>
                            <Pressable style={[ThemeStyling.btnPrimary,{paddingHorizontal:50}]} onPress={()=>{this.props.navigation.navigate("BookingScreen")}}>
                                <Text style={ThemeStyling.btnText}>Go to Booking List</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}