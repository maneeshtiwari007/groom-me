import { Component, ReactNode } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import Colors from "../../utilty/Colors";

export default class CardWithImage extends Component<ScreenInterfcae>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Pressable style={[ThemeStyling.cardWithBorder]} onPress={() => {
                this.props.navigation.navigate("Professionals", { data: this.props?.data })
            }}>
                <View style={ThemeStyling.cardImageContaiiner}>
                    <Image source={{ uri: this.props?.data?.image }} style={ThemeStyling.cardImage}></Image>
                </View>
                <View>
                    <Text style={ThemeStyling.cardTitle}>{this.props?.data?.name}
                        {this.props?.showCount &&
                            <Text style={{ fontSize: 13, alignItems: 'center' }}>({this.props?.data?.professionalCount})</Text>
                        }
                    </Text>
                </View>
            </Pressable>
        );
    }
}