import { Component, ReactNode } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import Colors from "../../utilty/Colors";
import FormGroupInterface from "../../Interfaces/Common/FormGroupInterface";


export default class LoadMore extends Component<FormGroupInterface> {

    constructor(props) {
        super(props);
        this.state = {
            isFieldActive: false
        }
    }

    render() {
        return (
            <View style={{ alignItems: 'center', marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Text>Loading please wait... </Text>
                <ActivityIndicator size={"large"} color={Colors.dark_color} />
            </View>
        )
    }
}