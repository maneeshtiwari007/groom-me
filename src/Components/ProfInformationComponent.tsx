import { Component } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";

export default class ProfInformationComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    render() {
        return <ScrollView style={{ paddingTop: 10 }}>
            <View style={[ThemeStyling.card, { backgroundColor: Colors.gray100, marginBottom: 5, borderBottomColor: Colors.secondry_color, borderBottomWidth: 1, borderStyle: "solid" }]}>
                <View style={[ThemeStyling.cardBody]}>
                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>About</Text>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 }]}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</Text>
                </View>
            </View>
            <View style={[ThemeStyling.card, { backgroundColor: Colors.gray100, marginBottom: 5, borderBottomColor: Colors.secondry_color, borderBottomWidth: 1, borderStyle: "solid" }]}>
                <View style={[ThemeStyling.cardBody]}>
                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Gallery</Text>
                    <View style={[ThemeStyling.gallery, {justifyContent:"space-between"}]}>
                        <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/thumbnail3.jpg')} />
                        </View>
                                             <View style={[ThemeStyling.galleryItem, {width:'21%', marginRight:0, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                       <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/thumbnail2.jpg')} />
                        </View>
                       <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/avatar.jpg')} />
                        </View>
                        <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                       <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/thumbnail2.jpg')} />
                        </View>
                       <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/avatar.jpg')} />
                        </View>
                       <View style={[ThemeStyling.galleryItem, {width:'21%', marginHorizontal:5, alignItems: 'center' }]}>
                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width:70, height:70, borderColor: Colors.gray200}]} source={require('../../assets/staticimages/thumbnail3.jpg')} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    }
}