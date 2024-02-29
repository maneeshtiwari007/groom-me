import {
    BillingDetails,
    confirmSetupIntent,
    useConfirmPayment,
} from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
const API_URL = 'https://glory-fir-sloth.glitch.me'

const usePaymentHook = () => {
    const { loading, confirmPayment } = useConfirmPayment();
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [isSupported, setIsSupported] = useState<boolean>(true);

    useEffect(() => {
        setPaymentLoading(loading);
    }, [loading]);

    const onSuccess = (message: string) => {
        setPaymentLoading(false);
        alert(message)
    };

    const showErrorMessage = (message: string, amount: number) => {
        setPaymentLoading(false);
        alert(message)
    };

    const fetchPaymentIntentClientSecret = async ({ amount, gateway }) => {
        const res = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                amount: (amount * 100).toString(),
                currency: 'EUR',
                gateway: gateway,
            }),
        }).then((response) => response.json())
            .then((data) => data)
            .catch((error) => {
                console.log(error)
            });
        return res?.client_secret;
    };



    const fetchSetUpIntentClientSecret = async () => {
        const res = await fetch(`${API_URL}/create-setup-intent`, {
            method: 'POST'
        }).then((response) => response.json())
            .then((data) => data)
            .catch((error) => {
                console.log(error)
            });
        return res?.setupIntent;
    }

    const addCardToWallet = async () => {
        if (paymentLoading) return;
        setPaymentLoading(true);
        const clientSecret = await fetchSetUpIntentClientSecret();
        console.log('clientsecret', clientSecret)
        if (clientSecret) {
            const billingDetails: BillingDetails = {
                email: 'test@gmail.com',
                name: 'Test'
            };
            const { setupIntent, error } = await confirmSetupIntent(
                clientSecret,
                {
                    paymentMethodType: 'Card',
                    paymentMethodData: { billingDetails: billingDetails }
                },
                { setupFutureUsage: 'OnSession' }
            );
            if (setupIntent) {
                alert('Card added succesfull!')
            }
            if (error) {
                alert('Error adding card. Please try again later.')
            }
            setPaymentLoading(false);
        }
    };

    return {
        paymentLoading,
        isSupported,
        addCardToWallet
    };
};

export default usePaymentHook;
