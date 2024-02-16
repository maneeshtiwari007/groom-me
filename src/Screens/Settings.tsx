import React from 'react';
//import react in our code.
import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, Pressable, Switch } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import TopUserNotification from "../Components/Common/TopUserNotificationCard";
import ButtonComponent from "../Components/Common/ButtonComponent";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import { ConstantsVar } from "../utilty/ConstantsVar";
import ProfileScreenInterface from "../Interfaces/States/ProfileScreenInterface";
import * as ImagePicker from 'expo-image-picker';
import { CommonApiRequest } from "../utilty/api/commonApiRequest";

export default class Profile extends Component<ScreenInterfcae, ProfileScreenInterface>{
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
            loader: false
        }
    }
    async componentDidMount() {
        const user = await CommonHelper.getUserData();
        this.setState({ fname: (user?.fname) ? user?.fname : user?.name });
        this.setState({ lname: (user?.lname) ? user?.lname : user?.name });
        this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
        this.setState({ email: user?.email });
        this.setState({ user: user });

        CommonApiRequest.getAnyUserDetail(user?.id).then((response: any) => {
            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.fname) ? user?.fname : user?.name });
                this.setState({ lname: (user?.lname) ? user?.lname : user?.name });
                this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
                this.setState({ photo: (user?.photo !== "") ? user?.photo : null });
                this.setState({ email: user?.email });
                this.setState({ is_photo: '' });
            }
        });
    }
    onPressLogout() {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
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
                        CommonHelper.removeData(ConstantsVar.USER_STORAGE_KEY);
                        this?.props?.navigation?.navigate("Auth");
                    },
                },
            ],
            { cancelable: false },
        );
    }
    async pickImage() {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (result?.assets) {
            this.setState({ photo: result?.assets[0].uri });
            this.setState({ base64Data: result?.assets[0].base64 });
            this.setState({ is_photo: 'upload' });
        }

    }
    async removePicture() {
        Alert.alert(
            'Remove Picture',
            'Are you sure? You want to remove picture?',
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
                        this.setState({ photo: null })
                        this.setState({ base64Data: null });
                        this.setState({ is_photo: 'remove' });
                    },
                },
            ],
            { cancelable: false },
        );
    }
    async updateUserProfile() {
        const userProfileData: any = {
            fname: this.state.fname,
            lname: this.state.lname,
            photo: "image/png;base64," + this.state.base64Data,
            phone: this.state.phone,
            is_photo: this.state.is_photo
        }
        this.setState({ loader: true });
        CommonApiRequest.upDateUserProfile(userProfileData, this.state.user.id).then((response) => {
            this.setState({ loader: false });
            if (response?.status == 200) {
                this.updateUserStorage(response?.results);
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Profile updated successfully!!', top: 20 } })
            } else {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
            }
        }).catch(() => {
            this.setState({ loader: false });
        })
    }
    changeText(name: any, value: any) {
        this.setState({ [name]: value });
    }
    async updateUserStorage(data: any) {
        let userData: any = await CommonHelper.getUserData();
        userData.lname = data?.lname;
        userData.fname = data?.fname;
        userData.phone = data?.phone;
        if (data.photo) {
            userData.photo = data?.photo;
        }
        await CommonHelper.saveStorageData(ConstantsVar.USER_STORAGE_KEY, JSON.stringify(userData));
    }
    refreshData() {
        CommonApiRequest.getAnyUserDetail(this.state.user?.id).then((response: any) => {
            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.fname) ? user?.fname : user?.name });
                this.setState({ lname: (user?.lname) ? user?.lname : user?.name });
                this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
                this.setState({ photo: (user?.photo !== "") ? user?.photo : null });
                this.setState({ email: user?.email });
                this.setState({ is_photo: '' });
                this.updateUserStorage(response?.results);
            }
        });
    }
    //Initial state false for the switch. You can change it to true just to see.
    state = { switchValue: false };
    state2 = { switchValue2: false };

    toggleSwitch = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value });
        //state changes according to switch
        //which will result in re-render the text
    };

    toggleSwitch2 = value => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue2: value });
        //state changes according to switch
        //which will result in re-render the text
    };
    render() {
        return (
            <MainLayout isTopLogo={false} loader={this.state.loader} onRefresh={() => { this.refreshData() }}>
                <View style={ThemeStyling.container}>
                    <Text>Hello</Text>
                </View>
            </MainLayout>
        );
    }
}