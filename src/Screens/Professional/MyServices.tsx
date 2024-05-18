import { Component, ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, Pressable, FlatList, TextInput, Modal, SafeAreaView, StatusBar, ScrollView, Platform, Alert } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import ServicesCard from "../../Components/ServicesCard";
import Colors from "../../utilty/Colors";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import MyServiceCardSingle from "../../Components/MyServiceCardSingle";
import { CommonHelper } from "../../utilty/CommonHelper";
import ImageComponent from "../../Components/Common/ImageComponent";
export default class MyServices extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            visible: false,
            msgData: false,
            loaderText:'Please wait...'
        }
    }
    async componentDidMount() {
        this.setState({ loader: true })
        await this.getApiData();
    }
    async getApiData(params: any = {}) {
        const urlParams = (params) ? '?' + new URLSearchParams(params).toString() : '';
        CommonApiRequest.getAllProfServicesByUser(urlParams).then((response: any) => {
            this.setState({ loader: false,loaderText:'Please wait...' });
            this.setState({ loadMore: { status: false } });
            if (response?.status === 200) {
                this.setState({ dataObj: undefined })
                this.setState({ dataObj: response?.results })

            }
        }).catch((error) => {
            this.setState({ loader: false,loaderText:'Please wait...' });
            this.setState({ loadMore: { status: false } });
        })
    }
    searchCategory(text: string) {
        this.setState({ loader: true });
        this.getApiData({ q: text });
    }
    loadMoreData() {
        this.setState({ loadMore: { status: true } });
        this.getApiData({ catId: this.props.route.params?.data?.id, type: 'push' })
    }
    openReviewModal(type: boolean = true, item: any = undefined) {
        this.setState({ visible: type, commonData: item,count:(item?.services?.savedPrice)?item?.services?.savedPrice:undefined })
    }
    setPrice(price: any = 0) {
        if (price <= this.state?.commonData?.services?.max_price && price >= this.state?.commonData?.services?.min_price) {
            this.setState({ msgData: false, count: price });
        } else {
            this.setState({ msgData: true, count: undefined });
        }
    }
    saveServicePrice() {
        const formattedData: any = [{
            "service_id": this.state?.commonData?.services?.id,
            "price": this?.state?.count
        }]
        this.openReviewModal(false);
        this.setState({ loader: true });
        CommonApiRequest.saveProfServiceCategory(formattedData).then((response: any) => {
            this.setState({ loader: false,commonData:undefined });
            this.setState({ loader: true,loaderText:'Please wait while fetching data...' });
            this.getApiData();
        }).catch((error) => {
            this.setState({ loader: false });

        })
    }
    deleteConfirmation(data:any={}){
        Alert.alert(
            'Remove',
            'Are you sure? You want to remove this service?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        this.deleteMyService(data)
                    },
                },
            ],
            { cancelable: false },
        );
    }
    deleteMyService(params:any){
        this.setState({ loader: true,loaderText:'Please wait...'  });
        CommonApiRequest.deleteProfService(params?.id).then((response:any)=>{
            this.getApiData();
            this.setState({ loader: false });
            this.setState({ loader: true,loaderText:'Please wait while fetching data...' });
        }).catch((error:any)=>{
            this.setState({ loader: false,loaderText:'Please wait...' });
        })
    }
    render() {
        return (
            <MainLayout
                onRefresh={() => { this.getApiData() }}
                otherText="My services"
                loader={this.state?.loader}
                navigation={this.props.navigation}
                containerStyle={{ paddingTop: 10 }}
                route={this.props.route}
                showHeaderText={false}
                isSearchBar={true}
                onSearchCallback={(data) => { (data)?this.getApiData({ query: data }):this.getApiData() }}
                loaderText={this.state.loaderText}
            >
                <View style={ThemeStyling.cardContainer}>
                    {this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item: any, index: number) => {
                        return <Pressable key={index} onPress={() => { this.openReviewModal(true, item) }}>
                            <MyServiceCardSingle onDelete={(data:any)=>{this.deleteConfirmation(data)}} textStyle={{ color: Colors.dark_color }} dataObj={item} key={index} navigation={this.props.navigation}></MyServiceCardSingle>
                        </Pressable>
                    })}
                </View>
                <Modal visible={this.state.visible} transparent={true}>
                    <Pressable onPress={() => { this.openReviewModal(false) }} style={{ backgroundColor: '#000', height: '100%', opacity: 0.5 }}></Pressable>
                    <SafeAreaView style={{ zIndex: 999, position: 'absolute', borderRadius: 20, top: (Platform?.OS === 'ios') ? 105 : 75, width: '95%', backgroundColor: Colors.white, opacity: 1, marginLeft: '2.5%' }}>
                        <StatusBar backgroundColor={Colors.primary_color} barStyle="default"></StatusBar>
                        <ScrollView>
                            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'flex-end', marginTop: 10 }}>
                                <Pressable onPress={() => { this.openReviewModal(false) }} style={{ justifyContent: 'center', alignItems: 'flex-end', height: '100%', paddingRight: 10, zIndex: 1, position: 'relative', width: 50 }}>
                                    <Entypo name="cross" size={24} color={Colors.dark_color} />
                                </Pressable>
                            </View>
                            <View>
                                <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 0, paddingTop: 0 }]}>
                                    <View>
                                        <Text style={[ThemeStyling.heading2, { marginBottom: 0, textAlign: 'center' }]}>Manage service price</Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.text1, { color: Colors.secondry_color, marginBottom: 5, textAlign: 'center' }]}>Your selected service are</Text>
                                    </View>
                                    <View style={[ThemeStyling.starRating, { marginBottom: 15, justifyContent: "center" }]}>

                                    </View>
                                    <View style={[{ marginBottom: 20, alignItems: 'center' }]}>
                                        <View style={[{ width: 'auto' }]}>
                                            <ImageComponent style={{ width: 60, height: 60 }} src={{ uri: CommonHelper.replceStringForImage(this.state?.commonData?.icon) }}/>
                                        </View>
                                        <View style={[{ width: 'auto' }]}>
                                            <Text style={[ThemeStyling.heading3, { color: Colors.gray_color, marginBottom: 1 }]}>{this.state?.commonData?.service_name}</Text>
                                        </View>
                                        <View style={[{ width: 'auto' }]}>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>({this.state?.commonData?.services?.service_cat?.name})</Text>
                                        </View>
                                    </View>
                                    <View style={[ThemeStyling.threeColumnLayout, { marginBottom: 10 }]}>
                                        <View style={[ThemeStyling.col2, { alignItems: 'center' }]}>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, marginBottom: 5 }]}>Min.</Text>
                                            <Text style={[ThemeStyling.formLabel, { color: Colors.success_color, marginBottom: 0 }]}>${this.state?.commonData?.services?.min_price}</Text>
                                        </View>
                                        <View style={[ThemeStyling.col7]}>
                                            <TextInput enablesReturnKeyAutomatically inputMode="numeric" keyboardType="decimal-pad" defaultValue={""+this.state.commonData?.services?.savedPrice+""}  onChangeText={(evnt: any) => { this.setPrice(evnt) }} style={[ThemeStyling.formcontrol, { textAlign: "center" }]} placeholder="$345"></TextInput>
                                        </View>
                                        <View style={[ThemeStyling.col2, { alignItems: 'center' }]}>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, marginBottom: 5 }]}>Max.</Text>
                                            <Text style={[ThemeStyling.formLabel, { color: Colors.success_color, marginBottom: 0 }]}>${this.state?.commonData?.services?.max_price}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 20 }}>
                                        {this.state?.msgData &&
                                            <Text style={[ThemeStyling.text2, { color: Colors.primary_color, textAlign: "center" }]}>Enter price between ${this.state?.commonData?.services?.min_price} & ${this.state?.commonData?.services?.max_price}.</Text>
                                        }
                                    </View>
                                    <View>
                                        <Pressable disabled={(this.state?.count > 0) ? false : true} style={[ThemeStyling.btnSuccess, { backgroundColor: Colors.primary_color, justifyContent: 'center', opacity: (this.state?.count > 0) ? 1 : 0.5 }]} onPress={() => { this.saveServicePrice() }}>
                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, paddingTop: 5, paddingBottom: 5 }]}>Save</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
            </MainLayout>
        );
    }
}