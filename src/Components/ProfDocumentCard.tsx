import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, StyleSheet, FlatList, Pressable, } from "react-native";
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
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as DocumentPicker from 'expo-document-picker';
import Badge from "./Common/Badge";

export default class ProfDocumentCard extends Component<ScreenInterfcae, ProfileScreenInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            photo: null,
            is_photo: 'upload',
            user: null,
            base64Data: null,
            loader: false,
            commonData: []
        }
    }
    async componentDidMount() {
        if (this.props.onLoading) {
            this.props.onLoading(true)
        }
        const user = await CommonHelper.getUserData();
        this.setState({ user: user });
        this.getProfIdentification();
        this.getProfDocuments();
    }
    getProfIdentification() {
        CommonApiRequest.getProfIdentification({}).then((response: any) => {
            if (response?.status === 200) {
                this.setState({ commonData: response?.data })
            }
        })
    }
    getProfDocuments() {
        CommonApiRequest.getProfDocuments({}).then((response: any) => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
            if (response?.status === 200) {
                this.setState({ objData: response?.data })
            }
        }).catch(() => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
        })
    }
    saveProfDocument() {
        if (this.props.onLoading) {
            this.props.onLoading(true);
        }
        const objData = {
            type: this.state.type,
            image: this.state?.mimeType + ";base64," + this.state.base64Data,
            docType: this.state?.docType
        }
        CommonApiRequest.saveProfDocuments(objData).then((response: any) => {
            // console.log(response)
            if (response?.status === 200) {
                this.getProfDocuments();
                this.getProfIdentification();
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Your document saved successfully our staff will review it and will get back to you shortly!!', top: 20 } });
            } else {
                if (this.props.onLoading) {
                    this.props.onLoading(false);
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: 'Something went wrong please try after some time!!', top: 20 } });
                }
            }
        }).catch(() => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
        })
    }
    async pickImage() {
        if (this.state?.type) {
            let result: any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
                base64: true
            });
            if (result?.assets) {
                const fileSize: any = CommonHelper.formatBytes(result?.assets[0]?.fileSize)
                if (fileSize < 4) {
                    this.setState({ photo: result?.assets?.[0]?.fileName });
                    this.setState({ base64Data: result?.assets[0].base64 });
                    this.setState({ mimeType: result?.assets[0].mimeType });
                    this.setState({ docType: result?.assets[0].type });
                    this.setState({ is_photo: 'upload' });
                } else {
                    alert('File must be less than 4Mb')
                }
            }
        } else {
            alert('Please select document type')
        }

    }
    changeText(name: any, value: any) {
        this.setState({ [name]: value });
    }
    onPressRemoveDoc(data: any = {}) {
        Alert.alert(
            'Confirmation',
            'Are you sure? You want to remove this document?',
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
                        this.removeDocument(data)
                    },
                },
            ],
            { cancelable: false },
        );
    }
    removeDocument(data: any) {
        if (this.props.onLoading) {
            this.props.onLoading(true)
        }
        CommonApiRequest.removeProfDocuments(data?.id).then((response: any) => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
            if (response?.status === 200) {
                if (this.props.onLoading) {
                    this.props.onLoading(true)
                }
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Document removed successfully !!', top: 20 } });
            }
            this.getProfDocuments()

        }).catch(() => {
            if (this.props.onLoading) {
                this.props.onLoading(false)
            }
        })
    }
    render() {
        return (
            <>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto', paddingTop: 0 }]}>
                        <View>
                            <Text style={[ThemeStyling.heading2, { marginBottom: 10 }]}>
                                Upload your document
                            </Text>
                            <View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{`\u2022 `} </Text>
                                    <Text>All documents should be uploaded either as a PDF file or as a JPG or PNG image files. </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{`\u2022 `} </Text>
                                    <Text>Each document should not be less than 100 KB and larger than 4MB.  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{`\u2022 `} </Text>
                                    <Text>Ensure that all information on the document is readable.  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{`\u2022 `} </Text>
                                    <Text>All documents must be saved in an unsecured PDF format before they can be uploaded. Your PDF document must not be password protected. </Text>
                                </View>
                            </View>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Document type</Text>
                            <SelectDropdown
                                data={this.state.commonData}
                                onSelect={(selectedItem, index) => {
                                    this.setState({ type: selectedItem?.id })
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.type) || 'Select document type'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, height: 60, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.type}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Select your document</Text>
                            <Pressable onPress={() => { this.pickImage() }} style={{ zIndex: 99, flex: 1, width: '100%', height: 50, justifyContent: 'center', padding: 5, borderColor: Colors.gray_color, borderWidth: 1, borderRadius: 5 }}>
                                <Text>{(this.state?.photo) ? this.state?.photo : 'Click here for pick a document'}</Text>
                            </Pressable>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity disabled={(this.state.type && this.state.base64Data) ? false : true} onPress={() => { this.saveProfDocument() }} style={[ThemeStyling.btnSuccess, { justifyContent: 'center', paddingVertical: 12, borderRadius: 13, opacity: (this.state.type && this.state.base64Data) ? 1 : 0.5 }]}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f18, color: Colors.white }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={[ThemeStyling.gallery, { justifyContent: "flex-start" }]}>
                                {this.state?.objData?.length > 0 && this.state?.objData?.map((item: any, index: number) => {
                                    return <View key={index} style={[ThemeStyling.galleryItem, { width: '45%', marginRight: 10, paddingHorizontal: 0 }]}>
                                        <Pressable>
                                            <Image style={[ThemeStyling.profileImage, { borderRadius: 10, width: '100%', height: 100, borderColor: Colors.gray200 }]} source={{ uri: item?.image }} />
                                        </Pressable>
                                        <View style={{ width: '100%', alignItems: 'center', marginTop: 5 }}>
                                            <Text style={{ fontSize: 14, textAlign: 'auto' }}>Type: {item?.type_name}</Text>
                                        </View>
                                        <View style={{ width: '60%', marginHorizontal: '20%', marginTop: '5%' }}>
                                            <Badge badgeStyle={{ backgroundColor: item?.identification_status?.iconcolor, color: Colors.white, borderRadius: 5 }} title={item?.identification_status?.status}></Badge>
                                        </View>
                                        <Pressable onPress={() => { this.onPressRemoveDoc(item) }} style={{ width: '80%', marginHorizontal: '10%', marginTop: '5%' }}>
                                            <Badge badgeStyle={{ backgroundColor: Colors.primary_color, color: Colors.white, borderRadius: 5 }} title={'Remove'}></Badge>
                                        </Pressable>
                                    </View>
                                })}
                            </View>
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
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
}); 