import { Component, ReactNode } from "react";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
export default class ProfLists extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            
            loader:false
        }
    }
    async componentDidMount() {
        this.setState({loader:true})
        await this.getApiData()
    }
    async getApiData(){
        CommonApiRequest.getServiceCategory({}).then((response:any)=>{
            this.setState({loader:false})
            if(response?.status==200){
                this.setState({dataObj:response?.results})
            }
        }).catch((error)=>{
            this.setState({loader:false})
            console.log(error);
        })
    }
    render() {
        return (
            <MainLayout onRefresh={()=>{}} headerText="" loader={this.state?.loader}>
                
            </MainLayout>
        );
    }
}