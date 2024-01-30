import { Component, ReactNode } from "react";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import { Image, ScrollView, Text, View } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import Colors from "../utilty/Colors";
import CheckBox from 'expo-checkbox';

export default class ProfServicesComponent extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false
        }
    }
    render() {
        return <ScrollView>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Senior Cut</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$20</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Kids Cut</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$60</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Beard Colour</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$80</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Senior Cut</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$34</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Kids Cut</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$57</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Beard Colour</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$23</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Senior Cut</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$123</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Kids Cut</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$160</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 15, paddingVertical: 5 }}>
                <View style={[ThemeStyling.twoColumnLayout]}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ borderRadius: 15, shadowColor: '#000', shadowOffset: { width: -2, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, backgroundColor: Colors.primary_color }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/staticimages/default.jpg')} />
                        </View>
                    </View>
                    <View style={[ThemeStyling.col6, { marginRight: 10 }]}>
                        <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>Beard Colour</Text>
                        <Text style={[ThemeStyling.text2, { fontSize: Colors.FontSize.f10, color: Colors.secondry_color }]}>Cleaning up the necklines, touch up sidebuns</Text>
                    </View>
                    <View style={[ThemeStyling.col2, { flex: 1, alignItems: "flex-end" }]}>
                        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <Text style={[ThemeStyling.heading5, { fontSize: 13, fontWeight: '600', color: Colors.dark_color, marginBottom: 0,marginRight:5 }]}>$45</Text>
                            <CheckBox style={[{width:15, height:15, borderColor:Colors.secondry_color, borderWidth:1}]} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    }
}