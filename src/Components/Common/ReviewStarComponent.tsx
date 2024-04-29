import React, { Component } from "react";
import Colors from "../../utilty/Colors";
import { ThemeStyling } from "../../utilty/styling/Styles";
import BadgeInterFace from "../../Interfaces/Common/BadgeInterFace";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
export default class ReviewStarComponent extends Component<BadgeInterFace, BadgeInterFace> {

    constructor(props: any) {
        super(props);
        this.state = {
            commonData: [1, 2, 3, 4, 5],
        }
    }
    componentDidMount(): void {
        
    }
    render() {
        return (
            <>
                {this.state?.commonData && this.state?.commonData?.map((itemNumber: any, index: number) => {
                    if (itemNumber <= this.props?.avg_rating) {
                        return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.primary_color} key={index} />
                    } else {
                        return <FontAwesome style={[ThemeStyling.iconStar]} name="star" color={Colors.gray400} key={index} />
                    }
                })}
            </>
        );
    }
}