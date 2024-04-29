import { Component } from "react";
import CardInterface from "../Interfaces/Common/CardInterface";
import { ThemeStyling } from "../utilty/styling/Styles";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";

export default class ServicesCard extends Component<CardInterface, CardInterface>{
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.setState({ dataObj: this.props.dataObj });
    }
    onPresEvent(){
        this.props?.onPress({data:'asdfasd'});
    }
    render() {
        return (
            <View style={[ThemeStyling.card,this?.props?.style,{marginHorizontal:10}]}>
                <View style={[ThemeStyling.cardBody]}>
                    <View style={[ThemeStyling.threeColumnLayout, { flex: 1,width:'100%',paddingVertical:5 }]}>
                        <View style={[{width:'20%'}]}>
                            <Image style={{ width: 40, height: 40 }} source={{uri:this.state?.dataObj?.service_images?.image}}></Image>
                        </View>
                        <View style={[{width:'60%'}]}>
                            <Text style={[ThemeStyling.text1,this?.props?.textStyle, {textAlign: 'center' }]}>{this.state?.dataObj?.name}</Text>
                        </View>
                        <View style={[{width:'20%'}]}>
                            <Text style={[ThemeStyling.text2, { color: Colors.success_color, textAlign: 'right',fontWeight:'900' }]}>{CommonHelper.returnPriceWithCurrency(this.state?.dataObj?.min_price)} - {CommonHelper.returnPriceWithCurrency(this.state?.dataObj?.max_price)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}