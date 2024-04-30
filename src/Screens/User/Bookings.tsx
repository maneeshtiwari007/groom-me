import { Component, ReactNode } from "react";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, Dimensions, Pressable, ActivityIndicator } from 'react-native';
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
import LoadMore from "../../Components/Common/LoadMore";
export default class Bookings extends Component<ScreenInterfcae, CommonScreenStateInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            type: 'up',
            loadMore: false
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        await this.getApiUpcomingData();
    }
    async getApiData() {
        this.setState({ loader: true });
        CommonApiRequest.getUserBookingList(this.state?.meta?.next_page).then((response: any) => {
            this.setState({ loader: false, loadMore: false });
            const record = (this.state?.dataObj) ? this.state?.dataObj : [];
            if (response?.data?.record) {
                response?.data?.record?.map((item) => {
                    record.push(item);
                    this.setState({ dataObj: record });
                })
                this.setState({ meta: response?.data?.meta });
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    async getApiUpcomingData() {
        this.setState({ loader: true })
        CommonApiRequest.getUserUpcomingBookingList("").then((response: any) => {
            this.setState({ loader: false })
            if (response?.status == 200) {
                this.setState({ dataObj: response?.result })
            }
        }).catch((error) => {
            this.setState({ loader: false })
        })
    }
    changeTab(type: string = 'up') {
        this.setState({ type: type, meta: undefined });
        if (type === 'up') {
            this.setState({ dataObj: undefined })
            this.getApiUpcomingData()
        } else {
            this.setState({ dataObj: undefined })
            this.getApiData();
        }
    }
    refreshAPiData() {
        this.setState({ dataObj: undefined, meta: undefined });
        setTimeout(() => {
            if (this.state.type === 'up') {
                this.getApiUpcomingData()
            } else {
                this.getApiData();
            }
        }, 500)
    }
    getLoadMoreData() {
        if (this.state?.meta?.last_page >= this.state.meta?.current_page) {
            this.setState({ loadMore: true });
            if (this.state.type === 'up') {
                this.getApiUpcomingData()
            } else {
                this.getApiData();
            }
        }
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
                onScroll={() => {
                    this.getLoadMoreData()
                }}
            >

                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        {this.state?.dataObj && this.state?.dataObj?.map((item, key) => {
                            return <BookingCard navigation={this.props.navigation} data={item} key={key} isArchive={true}></BookingCard>
                        })}
                        {this.state?.dataObj?.length <= 0 &&
                            <NoRecordFound data={{ head: 'No Record found', msg: 'There is no data found please try with other' }}></NoRecordFound>
                        }
                        {this.state.loadMore &&
                            <LoadMore></LoadMore>
                        }
                    </View>

                </View>
            </MainLayout >
        );
    }
}