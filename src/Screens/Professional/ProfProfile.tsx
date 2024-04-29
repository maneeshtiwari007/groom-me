import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, StyleSheet, } from "react-native";
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

export default class ProfProfile extends Component<ScreenInterfcae, ProfileScreenInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            photo: null,
            is_photo: 'upload',
            user: null,
            email: '',
            base64Data: null,
            loader: false,
            gender: 'male',
            type:'profile'
        }
    }
    async componentDidMount() {
        const user = await CommonHelper.getUserData();
        this.setState({ fname: (user?.name) ? user?.name : user?.name });
        this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
        this.setState({ email: user?.email });
        this.setState({ user: user });
        this.setState({ location: (user?.location) ? user?.location : user?.location });

        CommonApiRequest.getUserDetail().then((response: any) => {
            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.name) ? user?.name : user?.name });
                this.setState({ phone: (user?.user_customer_details?.phone_no) ? user?.user_customer_details?.phone_no : '' });
                this.setState({ photo: (user?.photo_image !== "") ? user?.photo_image : null });
                this.setState({ email: user?.email });
                this.setState({ location: user?.user_customer_details?.location });
                this.setState({ gender: user?.user_customer_details?.gender });
                this.setState({ is_photo: '' });
                this.setState({ id: user?.id });
                this.setState({ user: user });
            }
        }).catch((err) => {
        });
    }
    changeText(name: any, value: any) {
        this.setState({ [name]: value });
    }
    async updateUserStorage(data: any) {
        let userData: any = await CommonHelper.getUserData();
        userData.name = data?.name;
        userData.phone = data?.user_details?.phone_no;
        userData.gender = data?.user_details?.gender;
        if (data?.user_profile_images?.image) {
            userData.photo = data?.user_profile_images?.image;
        }
        await CommonHelper.saveStorageData(ConstantsVar.USER_STORAGE_KEY, JSON.stringify(userData));
    }
    refreshData() {
        CommonApiRequest.getUserDetail().then((response: any) => {
            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.name) ? user?.name : user?.name });
                this.setState({ phone: (user?.user_customer_details?.phone_no) ? user?.user_customer_details?.phone_no : '' });
                this.setState({ photo: (user?.photo_image !== "") ? user?.photo_image : null });
                this.setState({ email: user?.email });
                this.setState({ location: user?.user_customer_details?.location });
                this.setState({ gender: user?.user_customer_details?.gender });
                this.setState({ is_photo: '' });
                this.setState({ id: user?.id });
            }
        });
    }
    async getCurrentLocation(){
        this.setState({loader:true});
        const location = await Location.getCurrentPositionAsync({});
        const reverGeocode = await Location.reverseGeocodeAsync({ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude });
        this.setState({location:reverGeocode?.[0]?.name + " " + reverGeocode?.[0]?.city + " " + reverGeocode?.[0]?.country+" "+reverGeocode?.[0]?.postalCode})
        this.setState({loader:false});
    }
    isLoading(type:boolean){
        this.setState({loader:type});
    }
    render() {
        return (
            <MainLayout 
                containerStyle={{ paddingTop: 10}} 
                isTopLogo={false} 
                loader={this.state.loader} 
                onRefresh={() => { this.refreshData() }} 
                navigation={this.props?.navigation} 
                otherText="Profile" 
                route={this.props?.route}
                isTab={true}
                tabData={[{ name: 'Profile', key: 'profile' },{ name: 'Document', key: 'doc' }]}
                tabDefaultKey={this.state?.type}
                onClickTab={(changeTab) => { this.setState({ type: changeTab }) }}
                >
                    {this.state?.type==='profile' && 
                        <ProfProfileCard  onLoading={(type:any)=>{this.isLoading(type)}}></ProfProfileCard>
                    }
                    {this.state?.type==='doc' && 
                        <ProfDocumentCard onLoading={(type:any)=>{this.isLoading(type)}}></ProfDocumentCard>
                    }
                
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