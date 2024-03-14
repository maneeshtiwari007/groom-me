import { Component, ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import { FontAwesome5, FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import { CommonHelper } from "../../utilty/CommonHelper";
import ScreenStateInterfcae from "../../Interfaces/Common/ScreenStateInterface";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
export default class ProfCard extends Component<ScreenInterfcae, ScreenStateInterfcae>{
    constructor(props: any) {
        super(props);
        this.state = {
            dataObj: [1, 2, 3, 4, 5]
        }
    }
    componentDidMount() {
        console.log(this.props?.data?.live);
    }
    makeProfFavorite() {
        const params = { isFav: (this.props?.data?.isFav) ? false : true, id: this.props?.data?.id }
        CommonApiRequest.makeProfFavorite(params).then((response) => {
            this.props.data.isFav = params?.isFav;
            if (this.props.didUpdate) {
                this.props.didUpdate(params?.isFav);
            }
        })
    }
    onPressResponse() {
        if (this.props.isOnPressed) {
            this.props.onClickResponse();
        }
    }
    render() {
        return (
            <Pressable style={ThemeStyling.card} onPress={() => {
                this.onPressResponse();
            }}>
                <View style={[ThemeStyling.cardBody, { padding: 0, paddingTop: 8 }]}>
                    <View style={[ThemeStyling.twoColumnLayout, {  }]}>
                        <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                            <Image style={[ThemeStyling.cardImage2]} source={{ uri: this.props?.data?.photo_image }} />
                        </View>
                        <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                            <View style={{ marginBottom: 5 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 5 }]}>{this.props?.data?.name}</Text>
                                    <Pressable style={{ marginRight: 5, alignItems: "flex-start", height: 30, justifyContent: "center" }} onPress={() => { this.makeProfFavorite() }}>
                                        {this.props?.data?.isFav &&
                                            <AntDesign name="heart" size={18} color={Colors.primary_color} />
                                        }
                                        {!this.props?.data?.isFav &&
                                            <AntDesign name="hearto" size={18} color={Colors.primary_color} />
                                        }
                                    </Pressable>
                                </View>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    {this.state?.dataObj && this.state?.dataObj?.map((itemNumber: any, index: number) => {
                                        if (itemNumber <= this.props?.data?.profavgrating) {
                                            return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.primary_color} key={index} />
                                        } else {
                                            return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} key={index} />
                                        }
                                    })}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                    {this.props?.data?.services?.length > 0 && this.props?.data?.services?.map((item: any, index: number) => {
                                        if (index < 2) {
                                            return <View key={index} style={{ width: '49%', flexDirection: 'row', marginTop: 3, marginBottom: 3, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Image style={{ width: 17, height: 17, marginRight: 2 }} source={{ uri: item?.icon }}></Image>
                                                <Text style={{ fontSize: 12 }}>{item?.service_name}</Text>
                                            </View>
                                        }
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
                                    <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, flexWrap: 'wrap', flex: 1 }]}>{this.props?.data?.user_professional_details?.location}</Text>
                                </View>
                            }
                            <View style={{ flexDirection: "row", marginBottom: 5,marginTop:5 }}>
                                <View>
                                    <Text style={[ThemeStyling.text2, { fontSize: 11, color: Colors.secondry_color }]}>
                                        {this.props?.data && this.props?.data?.live &&
                                            <AntDesign name="checkcircle" size={11} color={Colors.success_color} />
                                        }
                                        {this.props?.data && !this.props?.data?.live &&
                                            <FontAwesome5 name="times-circle" size={11} color={Colors.primary_color} />
                                        }
                                        &nbsp;Live Booking
                                    </Text>
                                </View>
                                <View style={{ marginLeft:5 }}>
                                    <Text style={[ThemeStyling.text2, { fontSize: 11, color: Colors.secondry_color }]}>
                                        {this.props?.data && this.props?.data?.schedule &&
                                            <AntDesign name="checkcircle" size={11} color={Colors.success_color} />
                                        }
                                        {this.props?.data && !this.props?.data?.schedule &&
                                            <FontAwesome5 name="times-circle" size={11} color={Colors.primary_color} />
                                        }
                                        &nbsp;Schedule Booking
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }
}