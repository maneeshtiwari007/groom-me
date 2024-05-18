import { Component } from "react";
import { Pressable, Text, View } from "react-native";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import ScreenStateInterfcae from "../../Interfaces/Common/ScreenStateInterface";
import { ThemeStyling } from "../../utilty/styling/Styles";
import Colors from "../../utilty/Colors";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import ImageComponent from "../Common/ImageComponent";

export class DashboardCard extends Component<ScreenInterfcae, ScreenStateInterfcae> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <View style={[ThemeStyling.card, { width: '47%'}]}>
                    <View style={ThemeStyling.cardBody}>
                        <View style={{ marginBottom: 10, display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={[ThemeStyling.listIcon, ThemeStyling.bglightPrimary, { borderRadius: 8 },this.props?.data?.iconContainerStyle]}>
                                <FontAwesome name={this.props?.data?.iconName} size={16} style={this.props?.data?.iconStyle} />
                            </Text>
                            <Text style={[ThemeStyling.heading1, { fontSize: Colors.FontSize.h1, marginBottom: 0 },this.props?.data?.headingSTyle]}>{this.props?.data?.value}</Text>
                        </View>
                        <View>
                            <Text style={[ThemeStyling.heading5, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color },this.props?.data?.titleStyle]}>{this.props?.data?.title}</Text>
                            {this.props?.data?.subTitle &&
                                <Text style={[ThemeStyling.text5, { color: Colors.secondry_color, textAlign: "left" }]}>{this.props?.data?.subTitle}</Text>
                            }
                        </View>
                    </View>
                </View>
            </>
        )
    }
}