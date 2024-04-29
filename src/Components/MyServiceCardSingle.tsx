import { Component } from "react";
import CardInterface from "../Interfaces/Common/CardInterface";
import { ThemeStyling } from "../utilty/styling/Styles";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Colors from "../utilty/Colors";
import { CommonHelper } from "../utilty/CommonHelper";

export default class MyServiceCardSingle extends Component<CardInterface, CardInterface>{
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.setState({ dataObj: this.props.dataObj });
    }
    onDeletePress(){
        if(this.props?.onDelete){
            this.props?.onDelete(this.state.dataObj);
        }
    }
    render() {
        return (
            <View style={[ThemeStyling.card,this?.props?.style,{marginHorizontal:10}]}>
                <View style={[ThemeStyling.cardBody]}>
                    <View style={[ThemeStyling.threeColumnLayout, { flex: 1,width:'100%',paddingVertical:5 }]}>
                        <View style={[{width:'20%'}]}>
                            <Image style={{ width: 40, height: 40 }} source={{uri:CommonHelper.replceStringForImage(this.state?.dataObj?.icon)}}></Image>
                        </View>
                        <View style={[{width:'60%'}]}>
                            <Text style={[ThemeStyling.text1,this?.props?.textStyle, {textAlign: 'center' }]}>{this.state?.dataObj?.service_name}</Text>
                            <Text style={[ThemeStyling.text2,this?.props?.textStyle, {textAlign: 'center' }]}>{this.state?.dataObj?.services?.service_cat?.name}</Text>
                        </View>
                        <View style={[{width:'20%',alignItems:'flex-end'}]}>
                            <Text style={[ThemeStyling.text2, { color: Colors.success_color, textAlign: 'right',fontWeight:'900' }]}>{CommonHelper.returnPriceWithCurrency(this.state?.dataObj?.price)}</Text>
                            <Pressable onPress={()=>{this.onDeletePress()}} style={{ justifyContent:'center',alignItems:'center',marginTop:4,backgroundColor:Colors.primary_color,width:30,height:30,padding:3,borderRadius:5 }}>
                                <Feather name="trash-2" size={17} color={Colors.white} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}