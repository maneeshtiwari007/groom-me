import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";


export default class Workorder extends Component<{}, WorkorderStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            objWorkorder: {},
            loader: false,
            serachText: '',
        }
    }
    async componentDidMount() {
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        this.setState({ loader: true });
        await this.getApiData()
    }
    async getApiData(params: any = "") {
        await CommonApiRequest.getUserWorkOrder(params).then((response: any) => {
            this.setState({ objWorkorder: response?.results?.data });//response?.results?.data
            this.setState({ loader: false });
        }).catch(() => {
            this.setState({ loader: false });
        });
    }
    async refreshPage() {
        await this.getApiData();
    }
    async serachingData() {
        const serahcText = "?q=" + this.state?.serachText;
        this.setState({ loader: true });
        await this.getApiData(serahcText);
    }
    retirectToDetail(data: any) {
        this.props.navigation?.navigate("WorkOrderDetail", { data: data });
    }
    render() {
        return (
            <MainLayout isTopLogo={false} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader}>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 0 }]}>
                        <View>
                            <Text style={[ThemeStyling.heading3, { marginBottom: 20, lineHeight: 25 }]}>Select Date</Text>
                        </View>
                        <View style={ThemeStyling.card}>
                           <View style={ThemeStyling.cardBody}>
                            <View>
                                <Text style={ThemeStyling.heading3}>
                                    Calender area
                                </Text>
                            </View>
                           </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 20, lineHeight: 25 }]}>Available Slots</Text>
                            </View>
                        </View>
                        <View>
                            <View style={[ThemeStyling.cardGroup]}>
                                <View style={[ThemeStyling.cardStyle, ThemeStyling.card, { backgroundColor: Colors.primary_color }]}>
                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.white }]}>7:30-8:30 AM</Text>
                                </View>
                                <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>9:00-10:00 AM</Text>
                                </View>
                                <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>10:30-12:30 AM</Text>
                                </View>
                                <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>1:30-2:30 PM</Text>
                                </View>
                                <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>3:30-4:30 PM</Text>
                                </View>
                                <View style={[ThemeStyling.cardStyle, ThemeStyling.card]}>
                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.dark_color }]}>5:00-6:30 PM</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <TouchableOpacity  style={[ThemeStyling.btnSuccess, { justifyContent: 'center' }]}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color:Colors.white }]}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}