import { Component, ReactNode } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Location from 'expo-location';
import MapView, { Callout, MapMarker, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
        console.log(this.props.location);
    }
    setMarkerCallOut(objData) {
        this.setState({ dataObj: objData })
    }
    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.props?.data?.location}
                    onMapLoaded={() => { console.log('MapLoaded') }}
                    onMapReady={() => { console.log('MapReaddy') }}
                    style={styles.map}
                >
                    <View>
                        {this.props?.data?.length > 0 && this.props?.data?.map((item, index) => {
                            return <MapMarker
                                key={index}
                                coordinate={{ latitude: item.user_professional_details?.latitude, longitude: item.user_professional_details?.longitude }}
                                onPress={() => { this.setMarkerCallOut(item) }} />
                        })}

                    </View>
                </MapView>
                {this.state.dataObj &&
                    <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height / 5, position: 'absolute', bottom: 0, left: 0, zIndex: 9, }}>
                        <View style={{ alignItems: "flex-end"}}>
                           <Entypo name="circle-with-cross" size={24} color={Colors.primary_color} />
                        </View>
                        <ProfCard data={this.state.dataObj} navigation={this.props.navigation}></ProfCard>
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});