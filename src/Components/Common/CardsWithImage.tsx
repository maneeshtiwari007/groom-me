import { Component, ReactNode } from "react";
import { Image, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";

export default class CardWithImage extends Component<ScreenInterfcae>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <View style={ThemeStyling.cardWithBorder}>
                
            </View>
        );
    }
}