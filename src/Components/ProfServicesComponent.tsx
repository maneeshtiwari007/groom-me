import { Component, ReactNode } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import Colors from "../utilty/Colors";
import CheckBox from 'expo-checkbox';
import { CommonHelper } from "../utilty/CommonHelper";

export default class ProfServicesComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
        }
    }
    async componentDidMount() {
    }
    addServiceToCart(data) {
        let dataObj = (this.state.dataObj) ? this.state.dataObj : [];
        let commonObj = (this.state.commonData) ? this.state.commonData : [];
        const indexObj = dataObj?.indexOf(data?.service_id);
        if (dataObj?.indexOf(data?.service_id) >= 0) {
            dataObj?.splice(indexObj, 1);
            commonObj?.splice(indexObj, 1)
        } else {
            dataObj.push(data?.service_id);
            commonObj.push(data);
        }
        this.setState({ dataObj: dataObj,commonData:commonObj });
        this.props?.onClickResponse({data:commonObj});
    }
    render() {
        return <ScrollView style={{ paddingTop: 0 }}>
            {this.props?.data?.categories?.length > 0 && this.props?.data?.categories?.map((item: any, index: number) => {
                if (item?.services) {
                    return <View key={index}>
                        <View style={{ backgroundColor: Colors.primary_light_color, padding: 3, paddingTop: 5, marginBottom: 5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={[ThemeStyling.heading5, { margin: 0, color: Colors.primary_color }]}>{item?.name}</Text>
                        </View>
                        {item?.services?.map((itemObj: any, indexService: number) => {
                            return <View style={{ padding: 15, paddingVertical: 5 }} key={index + indexService}>
                                <View style={[ThemeStyling.twoColumnLayout]}>
                                    <View style={{ marginRight: 10 }}>
                                        <View style={{ padding: 5, borderRadius: 100, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.white }}>
                                            <Image style={[ThemeStyling.cardImage, { width: 43, height: 43, borderRadius: 100 }]} source={{ uri: itemObj?.icon }} />
                                        </View>
                                    </View>
                                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                                        <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{itemObj?.service_name}</Text>
                                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f12, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                                    </View>
                                    <Pressable style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]} onPress={() => { this.addServiceToCart(itemObj) }}>
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <Text style={[ThemeStyling.heading5, { fontSize: Colors.FontSize.h6, fontWeight: '600', color: Colors.dark_color, marginBottom: 0, marginRight: 5 }]}>{CommonHelper.returnPriceWithCurrency(itemObj?.price)}</Text>
                                            <CheckBox value={(this.state?.dataObj?.indexOf(itemObj?.service_id) >= 0) ? true : false} color={Colors.primary_color} style={[{ width: 15, height: 15, borderColor: Colors.secondry_color, borderWidth: 1, backgroundColor: 'green' }]} />
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        })
                        }
                    </View>
                }

            })}
        <View style={{ height:20 }}></View>
        </ScrollView>
    }
}