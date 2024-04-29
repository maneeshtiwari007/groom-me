import { Component, ReactNode } from "react";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native';
import MainLayout from "../../Layout/MainLayout";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import CardWithImageProf from "../../Components/Common/CardWithImageProf";
import CommonCamera from "../../Components/Common/CommmonCamera";
export default class ProfessionalCategory extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            loader:false,
            visible:false
        }
    }
    async componentDidMount() {
        this.setState({loader:true})
        await this.getApiData()
    }
    async getApiData(params:any={}){
        const urlParams = (params)?'?' + new URLSearchParams(params).toString():'';
        CommonApiRequest.getProfServiceCategory(urlParams).then((response:any)=>{
            this.setState({loader:false});
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
    openOrCloseCamera(type?:boolean){
        this.setState({visible:type})
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
                openScanner={()=>{
                    this.openOrCloseCamera(true)
                }}
                needScanner={false}
                isLoading={(type:any)=>{
                    this.setState({loader:type})
                }}
                >
                <View style={ThemeStyling.cardContainer}>
                    {this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item:any,index:number)=>{
                        return <CardWithImageProf showCount={true} data={item} key={index} navigation={this.props.navigation}></CardWithImageProf>
                    })}
                </View>
            </MainLayout>
        );
    }
}