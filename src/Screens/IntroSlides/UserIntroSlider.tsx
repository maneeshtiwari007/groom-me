import { Component, ReactNode } from "react";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import CommonScreenStateInterface from "../../Interfaces/States/CommonScreenStateInterface";
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommonHelper } from "../../utilty/CommonHelper";
export default class UserIntroSlider extends Component<ScreenInterfcae, CommonScreenStateInterface>{
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
        const user = await CommonHelper.getUserData();
        if (!user?.email) {
            this.props?.navigation.navigate("LoginScreen");
        }
        this.props?.navigation.addListener("focus", async () => {
            const user = await CommonHelper.getUserData();
            if (!user?.email) {
                this.props?.navigation.navigate("LoginScreen");
            }
            this.setState({ user: user });
        });
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
                    return <TouchableOpacity style={{ backgroundColor: '#ae1911', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Done</Text>
                    </TouchableOpacity>
                }}
                renderSkipButton={() => {
                    return <TouchableOpacity style={{ backgroundColor: '#ae1911', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Skip</Text>
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