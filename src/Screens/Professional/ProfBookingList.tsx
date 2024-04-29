import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, Alert, DeviceEventEmitter } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonHelper } from "../../utilty/CommonHelper";
import BookingCard from "../../Components/Common/BookingCard";
import NoRecordFound from "../../Components/Common/NoRecordFound";
import ProfBookingCard from "../../Components/Common/ProfBookingCard";
import { ConstantsVar } from "../../utilty/ConstantsVar";
export default class ProfBookingList extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'up'
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        await this.getApiUpcomingData();
    }
    async getApiData() {
        this.setState({ loader: true })
        CommonApiRequest.getProfArchiveBookingList("").then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.result })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    async getApiUpcomingData() {
        this.setState({ loader: true })
        CommonApiRequest.getProfUpcomingBookingList("").then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.result })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    changeTab(type: string = 'up') {
        this.setState({ type: type });
        if (type === 'up') {
            this.getApiUpcomingData()
        } else {
            this.getApiData();
        }
    }
    refreshAPiData() {
        if (this.state.type === 'up') {
            this.getApiUpcomingData()
        } else {
            this.getApiData();
        }
    }
    onUpdateOrder(type: any, item: any = {}) {
        const typeToShow = (type === 2) ? 'Accept' : 'Reject';
        Alert.alert(
            (type === 2) ? 'Accept' : 'Reject',
            'Are you sure? You want to ' + typeToShow + ' this booking',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        this.acceptOrCancelBooking(type, item);
                    },
                },
            ],
            { cancelable: false },
        );
    }
    acceptOrCancelBooking(type: any = 2, item) {
        this.setState({ loader: true });
        const updateOrderObj = {
            id: item?.order_id,
            status: type
        }
        CommonApiRequest.bookingAcceptOrCancel(updateOrderObj).then((response: any) => {
            this.setState({ loader: false })
            if (response?.status === 200) {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Booking accepted successfully!!', top: 20 } });
                if (this.state.type === 'up') {
                    this.getApiUpcomingData()
                } else {
                    this.getApiData();
                }
            }
        }).catch(() => {
            this.setState({ loader: false })
        });
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.refreshAPiData() }}
                otherText="Booking Lists"
                loader={this.state?.loader}
                containerStyle={{ paddingTop: 0.1 }}
                navigation={this.props.navigation}
                route={this.props.route}
                isSearchBar={false}
                scollEnabled={true}
                isTab={true}
                tabData={[{ name: 'Upcoming', key: 'up' }, { name: 'Archive', key: 'arc' }]}
                tabDefaultKey={this.state?.type}
                onClickTab={(changeTab) => { this.changeTab(changeTab) }}
            >
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        {this.state?.dataObj && this.state?.dataObj?.map((item, key) => {
                            return <ProfBookingCard onClickResponse={(type: any) => { this.onUpdateOrder(type?.type, item) }} navigation={this.props.navigation} data={item} key={key} isArchive={(this.state?.type === 'up') ? false : false}></ProfBookingCard>
                        })}
                        {/* <View style={{ minHeight:300,justifyContent:'center',alignItems:'center',flex:1 }}>
                            <Text style={[ThemeStyling.heading4,{textAlign:'center',color:'black',opacity:1}]}>No data found</Text>
                        </View> */}
                        {this.state?.dataObj?.length <= 0 &&
                            <NoRecordFound data={{ head: 'No Record found', msg: 'There is no data found please try with other' }}></NoRecordFound>
                        }
                    </View>
                </View>
            </MainLayout >
        );
    }
}