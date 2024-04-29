import { Component } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { FontAwesome, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";
import ImageView from "react-native-image-viewing";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ProfInformationComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            isDisable:false,
            index:0
        }
    }
    componentDidMount() {
        if(this.props?.data?.gallery?.length > 0){
            const images = [];
            this.props?.data?.gallery?.map((item:any,index:any)=>{
                images?.push({
                    uri: item?.image,
                });
                this.setState({commonData:images});
            });
        }
    }
    render() {
        return <ScrollView style={{ paddingTop: 10 }}>
            {/* <View style={[ThemeStyling.card, { backgroundColor: Colors.gray100, marginBottom: 5, borderBottomColor: Colors.secondry_color, borderBottomWidth: 1, borderStyle: "solid" }]}>
                <View style={[ThemeStyling.cardBody]}>
                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>About</Text>
                    <Text style={[ThemeStyling.text1, { fontSize: Colors.FontSize.f12 }]}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</Text>
                </View>
            </View> */}
            <View style={[ThemeStyling.card, { backgroundColor: Colors.gray100, marginBottom: 5, borderBottomColor: Colors.secondry_color, borderBottomWidth: 1, borderStyle: "solid" }]}>
                <View style={[ThemeStyling.cardBody]}>
                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Gallery</Text>
                    <View style={[ThemeStyling.gallery, { justifyContent: "space-between" }]}>
                        {this.props?.data?.gallery?.length > 0 && this.props?.data?.gallery?.map((item: any, index: number) => {
                            return <Pressable onPress={()=>{this.setState({isDisable:true,index:index})}} key={index} style={[ThemeStyling.galleryItem, { width: '21%', marginHorizontal: 5, alignItems: 'center' }]}>
                                <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width: 70, height: 70, borderColor: Colors.gray200 }]} source={{ uri: item?.image }} />
                            </Pressable>
                        })}
                    </View>
                </View>
            </View>
            <ImageView
                images={this.state.commonData}
                imageIndex={this.state.index}
                visible={this.state.isDisable}
                animationType={"slide"}
                onRequestClose={()=>{this.setState({isDisable:false})}}
            />
        </ScrollView>
    }
}