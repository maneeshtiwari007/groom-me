import { Component } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import Colors from "../../utilty/Colors";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import SkeletonLoader from "expo-skeleton-loader";
export default class SkeletonContentPlaceHolder extends Component<ScreenInterfcae, { loading?: any }> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props?.loading);
    }
    render() {
        return (
            <SkeletonLoader>
                <SkeletonLoader.Container
                    style={[{ flex: 1, flexDirection: "row", justifyContent: 'center',marginVertical:20 },ThemeStyling.card]}
                >
                    <SkeletonLoader.Item
                        style={{ width: 350, height: 100, marginBottom: 5,flexDirection:'column',marginHorizontal:10 }}
                    />
                    
                </SkeletonLoader.Container>
            </SkeletonLoader>
        );
    }
}