import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, StyleSheet, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import * as Location from 'expo-location';
import { CommonHelper } from "../utilty/CommonHelper";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { ConstantsVar } from "../utilty/ConstantsVar";
import Colors from "../utilty/Colors";
import { ThemeStyling } from "../utilty/styling/Styles";
import ButtonComponent from "./Common/ButtonComponent";
import ProfileScreenInterface from "../Interfaces/States/ProfileScreenInterface";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";

export default class ProfProfileCard extends Component<ScreenInterfcae, ProfileScreenInterface>{
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
            type: 'profile'
        }
    }
    async componentDidMount() {
        const user = await CommonHelper.getUserData();
        this.setState({ fname: (user?.name) ? user?.name : user?.name });
        this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
        this.setState({ email: user?.email });
        this.setState({ user: user });
        this.setState({ location: (user?.location) ? user?.location : user?.location });

        CommonApiRequest.getProfDetail(user?.id).then((response: any) => {

            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.users?.name) ? user?.users?.name : user?.name });
                this.setState({ phone: (user?.users?.user_customer_details?.phone_no) ? user?.users?.user_customer_details?.phone_no : '' });
                this.setState({ photo: (user?.users?.photo_image !== "") ? user?.users?.photo_image : null });
                this.setState({ email: user?.users?.email });
                this.setState({ location: user?.users?.user_professional_details?.location });
                this.setState({ gender: user?.users?.user_professional_details?.gender });
                this.setState({ latitude: user?.users?.user_professional_details?.latitude });
                this.setState({ longitude: user?.users?.user_professional_details?.longitude });
                this.setState({ is_photo: '' });
                this.setState({ id: user?.id });
                this.setState({ user: user });
            }
        }).catch((err) => {
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
            quality: 0,
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
            name: this.state.fname,
            image: (this.state.base64Data) ? "image/png;base64," + this.state.base64Data : null,
            phone: this.state.phone,
            location: this.state.location,
            gender: this.state.gender,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
        if (this.props.onLoading) {
            this.props.onLoading(true)
        }
        CommonApiRequest.updateProfessionalProfile(userProfileData).then((response) => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
            if (response?.status == 200) {
                this.updateUserStorage(response?.results);
                setTimeout(() => {
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Profile updated successfully!!', top: 20 } });
                }, 1000);
            } else {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
            }
        }).catch(() => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
        })
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
    async getCurrentLocation() {
        if (this.props.onLoading) {
            this.props.onLoading(true)
        }
        const location = await Location.getCurrentPositionAsync({});
        const reverGeocode = await Location.reverseGeocodeAsync({ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude });
        this.setState({ location: reverGeocode?.[0]?.name + " " + reverGeocode?.[0]?.city + " " + reverGeocode?.[0]?.country + " " + reverGeocode?.[0]?.postalCode, latitude: location?.coords?.latitude, longitude: location?.coords?.longitude })
        if (this.props.onLoading) {
            this.props.onLoading(false)
        }
    }
    render() {
        return (
            <>
                <View style={{ flex:1 }}>
                    <View style={{ marginVertical:20,alignItems:'center' }}>
                        <Image source={{uri:this.state?.user?.users?.qr_code}} style={{width:80,height:80}}/>
                    </View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto', paddingTop: 0 }]}>
                        <View style={[ThemeStyling.profileContainer, { justifyContent: "flex-start", marginBottom: 15 }]}>
                            <View style={{ position: "relative" }}>
                                <Image progressiveRenderingEnabled={true} style={[ThemeStyling.profileImage, { width: 100, height: 100 }]} source={(this.state.photo) ? { uri: this.state.photo } : require('../../assets/staticimages/avatar.png')} />
                                <View>
                                    <TouchableOpacity onPress={() => { this.pickImage() }} style={[ThemeStyling.btnInfo, {
                                        width: 30, height: 30, paddingHorizontal: 0, margin: 0, position: "absolute", right: 0,
                                        top: -35
                                    }]}>
                                        <Text style={[ThemeStyling.btnText, { margin: 0 }]}>
                                            <Feather name="upload" style={[ThemeStyling.icon2, { fontSize: 12, lineHeight: 18, marginBottom: 0 }]} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <View style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}>
                                    <Text style={[ThemeStyling.heading4, { marginBottom: 0, paddingBottom: 0, color: Colors.dark_color }]}>{this.state?.fname} </Text>
                                    <TouchableOpacity style={{ marginLeft: 5 }}><AntDesign name="edit" style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h6, lineHeight: 23, color: Colors.darkBlue, }]} /></TouchableOpacity>
                                </View>
                                <Text style={[ThemeStyling.text5, {
                                    color: Colors.success_color
                                }]}>Upload max 2 MB</Text>
                            </View>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Full Name</Text>
                            <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={[ThemeStyling.formcontrol]} secureTextEntry={false} placeholder="Full Name" value={this.state?.fname}></TextInput>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Phone Number</Text>
                            <TextInput keyboardType="number-pad" maxLength={13} onChangeText={(evnt) => { this.changeText('phone', evnt) }} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="+91 8765 4321 98" value={this.state?.phone}></TextInput>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>E-mail</Text>
                            <TextInput editable={false} style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="example@example.com" value={this.state?.email}></TextInput>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Gender</Text>
                            <View style={styles.radioGroup}>
                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                        value="male"
                                        color={Colors.primary_color}
                                        onPress={() => this.setState({ gender: 'male' })}
                                        status={(this.state?.gender === 'male' ? 'checked' : 'unchecked')}
                                    />
                                    <Text style={styles.radioLabel}>
                                        Male
                                    </Text>
                                </View>

                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                        value="female"
                                        color={Colors.primary_color}
                                        onPress={() => this.setState({ gender: 'female' })}
                                        status={(this.state?.gender === 'female' ? 'checked' : 'unchecked')}
                                    />
                                    <Text style={styles.radioLabel}>
                                        Female
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Address</Text>
                            <TextInput style={ThemeStyling.formcontrol} secureTextEntry={false} placeholder="Address .. " value={this.state?.location}></TextInput>
                            <View style={{ marginVertical: 10 }}>
                                <TouchableOpacity onPress={() => { this.getCurrentLocation() }}>
                                    <Text style={{ fontSize: 12, backgroundColor: Colors.gray200, width: 160, justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: Colors.gray200 }}>Get My Current Location</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => { this.updateUserProfile() }} style={[ThemeStyling.btnSuccess, { justifyContent: 'center', paddingVertical: 12, borderRadius: 13 }]}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f18, color: Colors.white }]}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        <View style={{ justifyContent: 'center' }}>
                            <ButtonComponent textStyle={{ color: Colors.white }} type={'buttonDanger'} style={{ height: 50, width: '50%', marginLeft: 'auto', marginRight: 'auto' }} title="Logout" onPressCall={() => { this.onPressLogout() }}></ButtonComponent>
                        </View>
                    </View>
                </View>
            </>
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