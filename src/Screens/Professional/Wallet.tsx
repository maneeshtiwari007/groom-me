import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, StyleSheet, Pressable } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import MainLayout from "../../Layout/MainLayout";
import TopUserNotification from "../../Components/Common/TopUserNotificationCard";
import ButtonComponent from "../../Components/Common/ButtonComponent";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import { CommonHelper } from "../../utilty/CommonHelper";
import { ConstantsVar } from "../../utilty/ConstantsVar";
import ProfileScreenInterface from "../../Interfaces/States/ProfileScreenInterface";
import * as ImagePicker from 'expo-image-picker';
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import InputComponent from "../../Components/Common/InputComponent";
import FormGroup from "../../Components/Common/FormGroup";
import { RadioButton } from 'react-native-paper';
import * as Location from 'expo-location';
import ProfBookingCard from "../../Components/Common/ProfBookingCard";
import ProfProfileCard from "../../Components/ProfProfileCard";
import ProfDocumentCard from "../../Components/ProfDocumentCard";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";

export default class Wallet extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader: false,
            totalamount:'$0'
        }
    }
    async componentDidMount() {
        this.setState({ loader: true });
        await this.getApiData();
    }
    async getApiData() {
        CommonApiRequest.getProfWallet({}).then((response: any) => {
            this.setState({ loader: false });
            if (response?.status === 200) {
                this.setState({ dataObj: response?.result });
                this.setState({ totalamount: response?.totalamount });
            }
        }).catch(() => {
            this.setState({ loader: false })
        })
    }
    refreshData() {

    }
    render() {
        return (
            <MainLayout
                containerStyle={{ paddingTop: 10 }}
                isTopLogo={false}
                loader={this.state.loader}
                onRefresh={() => { this.refreshData() }}
                navigation={this.props?.navigation}
                otherText="Wallet"
                route={this.props?.route}
            >
                <View style={[ThemeStyling.container]}>
                    <View style={[ThemeStyling.card, { backgroundColor: Colors.circleColor }]}>
                        <View style={[ThemeStyling.cardBody]}>
                            <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                <View style={{ width: '70%' }}>
                                    <Text style={[ThemeStyling.heading3, { marginBottom: 0, color: Colors.white }]}>{this.state?.totalamount}</Text>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Pressable style={[ThemeStyling.btnSuccess, ThemeStyling.btnSmall]}>
                                        <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Withdraw</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[ThemeStyling.heading4, { color: Colors.dark_color }]}>History</Text>
                    </View>
                    <View>
                        {this.state?.dataObj && this.state?.dataObj?.map((item: any, index: number) => {
                            return <View key={index} style={[ThemeStyling.card, { backgroundColor: Colors.gray200 }]}>
                                <View style={[ThemeStyling.cardBody]}>
                                    <View style={[ThemeStyling.twoColumnLayout, { justifyContent: "space-between" }]}>
                                        <View style={{ width: '75%' }}>
                                            <Text style={[ThemeStyling.text1, { color: Colors.gray_color }]}>Order: #{item?.order_id} - {item?.clause}</Text>
                                            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, fontSize: Colors.FontSize.f11 }]}>{item?.order_date?.date} | {item?.order_date?.time}</Text>
                                        </View>
                                        <View style={{ width: '20%' }}>
                                            <Text style={[ThemeStyling.heading5, { fontWeight: "bold", color: Colors.dark_color, textAlign: "right" }]}>{item?.payment}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        })
                        }
                    </View>
                </View>
            </MainLayout>
        );
    }
}
const styles = StyleSheet.create({
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 15
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
}); 