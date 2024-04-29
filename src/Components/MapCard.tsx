import { Component, ReactNode } from "react";
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Location from 'expo-location';
import MapView, { Callout, MapMarker, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import CommonScreenStateInterface from "../Interfaces/States/CommonScreenStateInterface";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ProfCard from "./Common/ProfCard";
import { Entypo } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
export default class MapCard extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'map',
            dataObj: undefined
        }
    }
    async componentDidMount() {

    }
    setMarkerCallOut(objData) {
        this.setState({ dataObj: objData })
    }
    render() {
        return (
            <>
                {this.state.dataObj &&
                    <View style={{ width: Dimensions.get('screen').width, height: 'auto', position: 'absolute', bottom: 10, left: 0, zIndex: 9, paddingHorizontal: 10 }}>
                        <Pressable style={{ alignItems: "flex-end", position: "relative", bottom: -7, zIndex: 1 }} onPress={() => { this.setState({ dataObj: undefined }) }}>
                            <Entypo name="circle-with-cross" size={24} color={Colors.primary_color} />
                        </Pressable>
                        <ProfCard data={this.state.dataObj} navigation={this.props.navigation} didUpdate={(data: any) => {
                            this.state.dataObj.isFav = data;
                            this.setState({ dataObj: this.state.dataObj });
                        }} isOnPressed={true} onClickResponse={() => { this.props.navigation.navigate("Professional Detail", { data: this.state.dataObj }) }}></ProfCard>
                    </View>
                }
                <View style={{ width: '100%', height: '100%' }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: this.props?.location?.coords?.latitude,
                            longitude: this.props?.location?.coords?.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={styles.map}
                    >
                        {/* <Polyline coordinates={[{ latitude: this.props?.data?.[4].user_professional_details?.latitude, longitude: this.props?.data?.[6].user_professional_details?.longitude },{ latitude: 26.865400, longitude: 82.143204 }]}></Polyline> */}
                        <View>
                            {this.props?.data?.length > 0 && this.props?.data?.map((item, index) => {
                                if (item?.user_professional_details?.latitude) {
                                    return <MapMarker
                                        key={index}
                                        image={require('../../assets/staticimages/map-icon.png')}
                                        coordinate={{ latitude: item.user_professional_details?.latitude, longitude: item.user_professional_details?.longitude }}
                                        onPress={() => { this.setMarkerCallOut(item) }} />
                                }
                            })}

                        </View>
                    </MapView>
                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});