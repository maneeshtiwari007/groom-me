import { Component, ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import { FontAwesome, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import { CommonHelper } from "../../utilty/CommonHelper";
import ScreenStateInterfcae from "../../Interfaces/Common/ScreenStateInterface";
export default class ProfCard extends Component<ScreenInterfcae, ScreenStateInterfcae>{
    constructor(props: any) {
        super(props);
        this.state = {
            dataObj: [1, 2, 3, 4, 5]
        }
    }
    render() {
        return (
            <Pressable style={ThemeStyling.card} onPress={() => {
                this.props.navigation.navigate("ProfDetail", { data: this.props?.data })
            }}>
                <View style={[ThemeStyling.cardBody, { padding: 0, paddingTop:8 }]}>
                    <View style={[ThemeStyling.twoColumnLayout,{alignItems:"flex-start"}]}>
                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                            <Image style={[ThemeStyling.cardImage2]} source={{ uri: this.props?.data?.photo }} />
                        </View>
                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop:12, position:"relative" }]}>
                            <View style={{ marginBottom: 5 }}>
                                <View style={{position:"absolute", right:5, top:-14 }}>
                                    {/* <Entypo name="heart" size={18} color="black" /> */}
                                    <Entypo name="heart-outlined" size={18} color="{{color:Colors.primary-color}}" />
                                </View>
                                <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>{this.props?.data?.name}</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    {this.state?.dataObj && this.state?.dataObj?.map((itemNumber: any, index: number) => {
                                        if (itemNumber <= this.props?.data?.profavgrating) {
                                            return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#aa160e" key={index} />
                                        } else {
                                            return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color="#C1C6DE" key={index} />
                                        }
                                    })}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                    {this.props?.data?.services?.length > 0 && this.props?.data?.services?.map((item: any, index: number) => {
                                        return <View key={index} style={{ width: '49%', flexDirection: 'row', marginTop: 3, marginBottom: 3, justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Image style={{ width: 17, height: 17, marginRight: 2 }} source={{ uri: item?.icon }}></Image>
                                            <Text style={{ fontSize: 12 }}>{item?.service_name}</Text>
                                        </View>
                                    })}
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                <View><MaterialCommunityIcons name="map-marker-distance" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{CommonHelper.returnDistanceWithUnit(this.props?.data?.distance)}</Text>
                            </View>
                            {this.props?.data?.user_professional_details?.location &&
                                <View style={{ flexDirection: "row" }}>
                                    <View><Ionicons name="location-outline" size={18} style={{ color: Colors.secondry_color }} /></View>
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.user_professional_details?.location}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }
}