import { Component, ReactNode } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Image, ScrollView, Text, View } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import Colors from "../utilty/Colors";
import CheckBox from 'expo-checkbox';
import { CommonHelper } from "../utilty/CommonHelper";

export default class ProfServicesComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    async componentDidMount() {
        //console.log(this.props?.data?.categories)
    }
    addServiceToCart(){

    }
    render() {
        return <ScrollView style={{ paddingTop: 10 }}>
            {this.props?.data?.categories?.length > 0 && this.props?.data?.categories?.map((item: any, index: number) => {
                if (item?.services) {
                    return item?.services?.map((itemObj: any, indexService: number) => {
                        return <View style={{ padding: 15, paddingVertical: 5 }} key={index + indexService}>
                            <View style={[ThemeStyling.twoColumnLayout]}>
                                <View style={{ marginRight: 10 }}>
                                    <View style={{ padding: 8, borderRadius: 100, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.white }}>
                                        <Image style={[ThemeStyling.cardImage, { width: 40, height: 40, borderRadius: 10 }]} source={{ uri: itemObj?.icon }} />
                                    </View>
                                </View>
                                <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                                    <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{itemObj?.service_name}</Text>
                                    <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f12, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                                </View>
                                <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginRight: 5 }]}>{CommonHelper.returnPriceWithCurrency(itemObj?.price)}</Text>
                                        <CheckBox color={Colors.primary_color} style={[{ width: 15, height: 15, borderColor: Colors.secondry_color, borderWidth: 1 }]} onChange={()=>{}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    })
                }

            })}

        </ScrollView>
    }
}