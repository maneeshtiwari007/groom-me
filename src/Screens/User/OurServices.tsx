import { Component, ReactNode } from "react";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import MainLayout from "../../Layout/MainLayout";
import CardWithImage from "../../Components/Common/CardsWithImage";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
export default class OurServices extends Component<ScreenInterfcae, CommonScreenStateInterface>{
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
    async getApiData(params:any={}){
        const urlParams = (params)?'?' + new URLSearchParams(params).toString():'';
        CommonApiRequest.getServiceCategory(urlParams).then((response:any)=>{
            this.setState({loader:false})
            if(response?.status==200){
                this.setState({dataObj:response?.results})
            }
        }).catch((error)=>{
            this.setState({loader:false})
        })
    }
    searchCategory(text:string){
        this.setState({loader:true});
        this.getApiData({q:text});
    }
    render() {
        return (
            <MainLayout 
                onRefresh={()=>{this.getApiData()}} 
                headerText="" 
                loader={this.state?.loader} 
                navigation={this.props.navigation} 
                containerStyle={{paddingTop:10}} 
                route={this.props.route}
                showHeaderText={true}
                isSearchBar={true}
                onSearchCallback={(data)=>{this.searchCategory(data)}}
                >
                <View style={ThemeStyling.cardContainer}>
                    {this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item:any,index:number)=>{
                        return <CardWithImage data={item} key={index} navigation={this.props.navigation}></CardWithImage>
                    })}
                </View>
            </MainLayout>
        );
    }
}