import { Component } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";

export default class ProfReviewComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    render() {
        return <ScrollView style={[ThemeStyling.container]}>
            <Pressable style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor:Colors.gray400, borderStyle:"solid", borderWidth:1, borderRadius:10 }]}>
                <View style={ThemeStyling.cardHeader}>
                    <View style={[ThemeStyling.twoColumnLayout]}>
                        <View style={[{ marginRight: 5 }]}>
                            <Image style={[ThemeStyling.cardImage, { width: 55, height:55, borderRadius: 100 }]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                        <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                            <View style={{}}>
                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Cameron Willamson</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }]}>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 , marginBottom:0}]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </View>
            </Pressable>
            <Pressable style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor:Colors.gray400, borderStyle:"solid", borderWidth:1, borderRadius:10 }]}>
                <View style={ThemeStyling.cardHeader}>
                    <View style={[ThemeStyling.twoColumnLayout]}>
                        <View style={[{ marginRight: 5 }]}>
                            <Image style={[ThemeStyling.cardImage, { width: 55, height:55, borderRadius: 100 }]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                        <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                            <View style={{}}>
                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Cameron Willamson</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }]}>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 , marginBottom:0}]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </View>
            </Pressable>
            <Pressable style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor:Colors.gray400, borderStyle:"solid", borderWidth:1, borderRadius:10 }]}>
                <View style={ThemeStyling.cardHeader}>
                    <View style={[ThemeStyling.twoColumnLayout]}>
                        <View style={[{ marginRight: 5 }]}>
                            <Image style={[ThemeStyling.cardImage, { width: 55, height:55, borderRadius: 100 }]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                        <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                            <View style={{}}>
                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Cameron Willamson</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }]}>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 , marginBottom:0}]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </View>
            </Pressable>
            <Pressable style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor:Colors.gray400, borderStyle:"solid", borderWidth:1, borderRadius:10 }]}>
                <View style={ThemeStyling.cardHeader}>
                    <View style={[ThemeStyling.twoColumnLayout]}>
                        <View style={[{ marginRight: 5 }]}>
                            <Image style={[ThemeStyling.cardImage, { width: 55, height:55, borderRadius: 100 }]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                        <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                            <View style={{}}>
                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Cameron Willamson</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }]}>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 , marginBottom:0}]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </View>
            </Pressable>
            <Pressable style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor:Colors.gray400, borderStyle:"solid", borderWidth:1, borderRadius:10 }]}>
                <View style={ThemeStyling.cardHeader}>
                    <View style={[ThemeStyling.twoColumnLayout]}>
                        <View style={[{ marginRight: 5 }]}>
                            <Image style={[ThemeStyling.cardImage, { width: 55, height:55, borderRadius: 100 }]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                        <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                            <View style={{}}>
                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Cameron Willamson</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }]}>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 , marginBottom:0}]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </View>
            </Pressable>
            <Pressable style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor:Colors.gray400, borderStyle:"solid", borderWidth:1, borderRadius:10 }]}>
                <View style={ThemeStyling.cardHeader}>
                    <View style={[ThemeStyling.twoColumnLayout]}>
                        <View style={[{ marginRight: 5 }]}>
                            <Image style={[ThemeStyling.cardImage, { width: 55, height:55, borderRadius: 100 }]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                        <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                            <View style={{}}>
                                <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Cameron Willamson</Text>
                                <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.primary_color} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                    <FontAwesome style={[ThemeStyling.iconStar, { fontSize: Colors.FontSize.f12 , marginBottom:0}]} name="star" color={Colors.gray400} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius:10, borderBottomRightRadius:10 }]}>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 , marginBottom:0}]}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </View>
            </Pressable>
        </ScrollView>
    }
}