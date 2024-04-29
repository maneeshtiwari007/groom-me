import { Component } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";
import NoRecordFound from "./Common/NoRecordFound";
import ReviewStarComponent from "./Common/ReviewStarComponent";

export default class ProfReviewComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    render() {
        return <ScrollView style={[ThemeStyling.container]}>
            {this.props?.data?.reviews?.data?.length > 0 && this.props?.data?.reviews?.data?.map((item: any, index: number) => {
                return <Pressable key={index} style={[ThemeStyling.card, { backgroundColor: Colors.gray100, borderColor: Colors.gray400, borderStyle: "solid", borderWidth: 1, borderRadius: 10 }]}>
                    <View style={ThemeStyling.cardHeader}>
                        <View style={[ThemeStyling.twoColumnLayout]}>
                            <View style={[{ marginRight: 5 }]}>
                                <Image style={[ThemeStyling.cardImage, { width: 55, height: 55, borderRadius: 100 }]} source={{uri:item?.review_user?.photo_image}} />
                            </View>
                            <View style={[ThemeStyling.col10, { padding: 8, paddingVertical: 0 }]}>
                                <View style={{}}>
                                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{item?.review_user?.name}</Text>
                                    <View style={[ThemeStyling.starRating, { marginBottom: 5 }]}>
                                        <ReviewStarComponent avg_rating={item?.rating}></ReviewStarComponent>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.cardBody, { paddingVertical: 8, backgroundColor: Colors.white, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                        <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12, marginBottom: 0 }]}>{item?.review_text}</Text>
                    </View>
                </Pressable>
            })}
            {this.props?.data?.reviews?.data?.length <= 0 &&
                <View style={{alignItems:'center'}}>
                    <Text><NoRecordFound data={{msg:'There is no review given yet!!!',head:'No record found'}}></NoRecordFound></Text>
                </View>
            }
        </ScrollView>
    }
}