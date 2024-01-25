import { Component, ReactNode } from "react";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
export default class ProfIntroSlider extends Component<ScreenInterfcae, CommonScreenStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            dataObj: [
                {
                    key: 'slide1',
                    title: 'How groom me works',
                    text: 'Groom Me connects Salon, Spa and barbershop service providers with customers. It allows customers the ability to see who is live and in their desired area.' +
                        'Simply, submit your application through our partners tab on the website. Download the app, fill out your information, create a profile and upload your amazing work for customers to see. Then click “Live Mobile” or “Live Stationary” and this will make you visible to customers in our database.',
                    image: require('../../../assets/staticimages/slide-1.png'),
                },
                {
                    key: 'slide2',
                    title: 'Location settings',
                    text: "Set your parameters. This will indicate how far you are willing to commute to provide your service and target that specified area. Click on the location tab in the app.",
                    image: require('../../../assets/staticimages/slide-2.png'),
                },
                {
                    key: 'slide3',
                    title: 'Set your own price',
                    text: 'Customize your price for the services you provide. Groom Me has a pre-loaded list of standard services for each industry. If there is a service that you offer and it is not already on the list don’t worry, just click on the “request add service” tab. We will you access to manually add it in.',
                    image: require('../../../assets/staticimages/slide-3.png'),
                },
                {
                    key: 'slide4',
                    title: 'Get paid instantly',
                    text: 'Groom Me will arrange payments from customers and will automatically deposit the money into your bank account. Once the customer hits “The Pay Tab” at the bottom of the screenfunds will instantly be processed through our reliable and safe payment solution provider.',
                    image: require('../../../assets/staticimages/slide-4.png'),
                },
                {
                    key: 'slide5',
                    title: 'Multiple booking methods',
                    text: 'Open the app whenever you have some free time and request a haircut, nails, makeup, or any other of groom me services in the safety and comfort of your own home. Or if you prefer to use the app to locate a live service professional who is available for you to come in to their shop without having to pick up a phone and call to make the appointment. Not a fan of live bookings? No problem, with our app you can still book appointments the conventional way through the “Scheduling” tab. Ease of use and functionality is the target with our Groom Me App. ',
                    image: require('../../../assets/staticimages/slide-4.png'),
                },
            ]
        }
    }
    renderItem({ item }) {
        return (
            <View style={styles.slideContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }
    async componentDidMount() {

    }
    render() {
        return (
            <AppIntroSlider
                data={this.state.dataObj}
                renderItem={this.renderItem}
                showNextButton={false}
                showDoneButton={true}
                showSkipButton={true}
                onDone={() => {
                    this.props.navigation.navigate("AppContainer");
                }}
                renderDoneButton={() => {
                    return <TouchableOpacity style={{ backgroundColor:'#ae1911',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5,borderRadius:5 }}>
                        <Text style={{ color:'white' }}>Done</Text>
                    </TouchableOpacity>
                }}
                activeDotStyle={{ backgroundColor: '#ae1911' }}
            />
        );
    }
}
const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    title: {
        fontSize: 24,
        marginTop: 16,
        fontWeight: "bold"
    },
    text: {
        fontSize: 14,
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        lineHeight: 19
    },
});