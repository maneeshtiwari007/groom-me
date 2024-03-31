import { Component } from "react"
import { Text, View, ScrollView, TouchableOpacity, Pressable, Platform, StatusBar, SafeAreaView } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import MainLayout from "../Layout/MainLayout";
import CalendarPicker from "react-native-calendar-picker";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { add, format } from "date-fns";
export default class Schedule extends Component<ScreenInterfcae, WorkorderStateInterface>{
    constructor(props: any) {
        super(props);
        const today = new Date().toString();
        this.state = {
            objWorkorder: {},
            loader: false,
            serachText: '',
            minDate: new Date().toString(),
            selectedStartDate: new Date().toString(),
            maxDate:add(today, {days: 7})
        }
        this.onDateChange = this.onDateChange.bind(this);
    }
    async componentDidMount() {
        this.getApiData()
    }
    async refreshPage() {

    }
    async serachingData() {

    }
    async getApiData() {
        CommonApiRequest.getProfSlot({ "userId": this.props?.data?.id }).then((response) => {
            if (response?.status === 200) {
                this.setState({ objData: response?.DateWithTime });
                const slotData = response?.DateWithTime.find(item => item?.slot_date === format(new Date(this.state.selectedStartDate), "yyyy-MM-dd"));
                this.setState({ objSlot: (slotData?.slot_time) ? slotData : undefined, objSlotKey: (Object.keys(slotData?.slot_time)) ? Object.keys(slotData?.slot_time) : undefined });
            }
        }).catch(() => {

        })
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
        const slotData = this.state.objData?.find(item => item?.slot_date === format(new Date(date), "yyyy-MM-dd"));
        this.setState({ objSlot: (slotData?.slot_time) ? slotData : undefined, objSlotKey: (slotData?.slot_time) ? Object.keys(slotData?.slot_time) : undefined,selectedSlot:undefined });
    }
    dismissModal() {
        if (this.props.onDismiss) {
            this.props.onDismiss({ selectedDate: this.state.selectedStartDate,slot:this.state.selectedSlot })
        }
    }
    render() {
        return (
            // <MainLayout navigation={this?.props?.navigation} isTopLogo={false} loader={this.state?.loader}>
            <SafeAreaView>
                <StatusBar backgroundColor={Colors.primary_color} barStyle="default"></StatusBar>
                <ScrollView>
                    <View style={{ flex: 1, height: 45, width: '100%', zIndex: 99 }}>
                        <Pressable onPress={() => { this.dismissModal() }} style={{ width: 150, justifyContent: 'center', height: '100%', paddingLeft: 10, zIndex: 1, position: 'relative' }}>
                            <Ionicons name="arrow-back" size={24} color={Colors.primary_color} />
                        </Pressable>
                    </View>
                    <View>
                        <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 0 }]}>
                            <View>
                                <Text style={[ThemeStyling.heading3, { marginBottom: 20, lineHeight: 25 }]}>Select Date</Text>
                            </View>
                            <View style={ThemeStyling.card}>
                                <View style={ThemeStyling.cardBody}>
                                    <View>
                                        <CalendarPicker
                                            selectedStartDate={this.state.selectedStartDate}
                                            onDateChange={this.onDateChange}
                                            minDate={this.state.minDate}
                                            selectedDayTextColor={Colors.white}
                                            selectedDayStyle={{ backgroundColor: Colors.primary_color, color: Colors.white }}
                                            navigation={{ backgroundColor: '#000' }}
                                            maxDate={this.state.maxDate}
                                        />
                                    </View>
                                </View>
                            </View>
                            {this.state.objSlot &&
                                <>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <View>
                                            <Text style={[ThemeStyling.heading3, { marginBottom: 20, lineHeight: 25 }]}>Available Slots</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={[ThemeStyling.cardGroup]}>
                                            {this.state.objSlotKey && this.state.objSlotKey?.map((data: any, index: number) => {
                                                return <TouchableOpacity onPress={() => {
                                                    this.setState({ selectedSlot: this?.state?.objSlot?.slot_time?.[data] });
                                                }} key={index} style={[ThemeStyling.cardStyle, ThemeStyling.card, { backgroundColor: (this.state.selectedSlot === this?.state?.objSlot?.slot_time?.[data]) ? Colors.primary_color : Colors.gray400 }]}>
                                                    <Text style={[ThemeStyling.text1, { fontWeight: '600', fontFamily: 'Poppins_600SemiBold', color: Colors.white }]}>{this?.state?.objSlot?.slot_time?.[data]}</Text>
                                                </TouchableOpacity>
                                            })}
                                        </View>
                                    </View>
                                </>
                            }
                            <View style={{ marginBottom: 20 }}>
                                <TouchableOpacity disabled={(this.state.selectedSlot)?false:true} style={[ThemeStyling.btnSuccess, { justifyContent: 'center',opacity:(this.state.selectedSlot)?1:0.4 }]} onPress={() => { this.dismissModal() }}>
                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16, color: Colors.white, paddingTop: 5, paddingBottom: 5 }]}>Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            // </MainLayout>
        );
    }
}