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
export default class OurServices extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            dataObj: [
                {
                    key: 'slide1',
                    title: 'How groom me works',
                    text: 'Groom Me connects Salon, Spa and barbershop service providers with customers.' +
                        'Customers will be able to see who is live and in their desired area.' +
                        'Simply download our app, create a profile by putting in your standard information such as name, address,phone number and email address. Then you will go through the verification process. Once you are all set up click the “Live Mobile” tab ‘’live Stationary” tab or the “Scheduling” tab and start browsing a list of our partners that are live and in your area.',
                    image: require('../../../assets/staticimages/slide-1.png'),
                },
                {
                    key: 'slide2',
                    title: 'Multiple booking methods',
                    text: "Open the app whenever you have some free time and request a haircut, nails, makeup, or any other of groom me services in the safety and comfort of your own home. Or if you prefer to use the app to locate a live service professional who is available for you to come in to their shop without having to pick up a phone and call to make the appointment. Not a fan of live bookings? No problem, with our app you can still book appointments the conventional way through the “Scheduling” tab. Ease of use and functionality is the target with our Groom Me App.",
                    image: require('../../../assets/staticimages/slide-2.png'),
                },
                {
                    key: 'slide3',
                    title: 'Location settings',
                    text: 'Set your parameters. This will indicate how long you are willing to wait based on the distance of the available service provider. Click on the location tab in the app and set your desired distance that you wish to hire one of our partners. Also, this will indicate how far you are willing to travel to a stationary service provider if you choose.',
                    image: require('../../../assets/staticimages/slide-3.png'),
                },
                {
                    key: 'slide4',
                    title: 'Payment',
                    text: 'Instantly pay for you service in advance through the Groom Me app. Payments are automatically processed through our reliable and safe payment solution provider. Customers must click complete when prompted to verify the completion of the job and to complete the transaction. We allow a 12hr window for disputes.',
                    image: require('../../../assets/staticimages/slide-3.png'),
                },
            ],
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
                <View style={ThemeStyling.cardContainer}>
                    {this.state?.dataObj?.length > 0 && this.state?.dataObj?.map((item:any,index:number)=>{
                        return <CardWithImage data={item} key={index}></CardWithImage>
                    })}
                </View>
            </MainLayout>
        );
    }
}