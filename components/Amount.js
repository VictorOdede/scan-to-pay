import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from './DataContext';
import axios from 'axios'; 

export default function Amount ({ navigation }) {

    // set validation schema for  
    const amountSchema = Yup.object().shape({
        sentAmount: Yup.string()
        .max(7, 'Reduce the amount')
        .required('This is required'),
        phoneNumber: Yup.string()
        .length(10, 'Number must have 10 digits')
        .required('This is required')
    })

   
  

    // initiate new states
    const [amount, setAmount] = useState('');

    const [checked, setChecked] = useState(false);

    const {mpesaNumber, scannedID, businessName} = useContext(DataContext);

    const [phone, setPhone] = mpesaNumber;
    const [ID, setID] = scannedID;
    const [business] = businessName;
    
    






    // add phone number to local storage when pay button is clicked and 'remember me' is checked
    const storeNumber = async (value) => {
        try{
            await AsyncStorage.setItem('@PHONE_NUMBER', value)
        }catch(err){
            console.log(err);
        }
    }

    const myKey = '@PHONE_NUMBER';


    // check if number is already in local storage 
    const readNumber = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
            
        } catch (err) {
            console.log(error)
        }
    }


    //Read stored number when component mounts
    useEffect(async ()=>{
        try {
           await readNumber(myKey); 

        } catch (err) {
            console.log(err)
        } 
    }, [])




    

    const url = "https://lipa-api-ro6xg.ondigitalocean.app/api/transaction"

    

    //send payment request to REST API 
    const startPay = async(amt, myPhone) =>{
        const validPhone = "254" + myPhone.slice(1);

        const paymentData = {
            amountSent: amt,
            businessName: business,
            businessID:ID,
            sender: validPhone
        }

        try{
            const response = await axios.post(url, paymentData ); 
            console.log(response.data);

        } catch(error){
            console.log(error);

        }
    }

    return(
        <Formik 
        initialValues = {{sentAmount: amount, phoneNumber: phone}}
        validationSchema = {amountSchema}
        onSubmit = {async (values) => {
            setAmount(values.sentAmount);
            setPhone(values.phoneNumber)
            navigation.navigate('Success');
            await storeNumber(values.phoneNumber);
            await startPay(values.sentAmount, values.phoneNumber);
        }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.text_2}>SEND TO {business}</Text>
                    <Text style={styles.text}>ENTER YOUR M-PESA NUMBER</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        onChangeText={handleChange('phoneNumber')} 
                        value={values.phoneNumber}
                        onBlur = {handleBlur('phoneNumber')}  
                        placeholder={'07XX XXXXXX'}
                        label='MPESA Number'
                        mode='outlined'/>
                        {errors.phoneNumber && touched.phoneNumber ? <Text style={{color: 'red', textAlign: 'center' }}>{errors.phoneNumber}</Text>: null}
                </View>


                <View style={{marginBottom: 20}}>
                    <Text style={styles.text}>ENTER AMOUNT</Text>
                    <TextInput 
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        placeHolder='Amount'
                        label='Enter Amount' 
                        onChangeText={handleChange('sentAmount')} 
                        onBlur={handleBlur('sentAmount')}
                        value={values.sentAmount}/>
                    {errors.sentAmount && touched.sentAmount ? <Text style={{color: 'red', textAlign: 'center'}}>{errors.sentAmount}</Text>: null}
                </View>

                <View style={{marginLeft: 100, marginRight: 100, marginTop: 20}}>

                    <Button style={styles.button} title="SEND" onPress={handleSubmit} color='#2EA44F'/>

                </View>


            </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
        marginTop: 20

    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',    
        marginLeft: 20,
    },
    text_2: {
        fontWeight: 'bold',
        textAlign: 'center',    
        marginLeft: 20,
        marginBottom: 20,
        textDecorationLine: 'underline'
    },
    textInput: {
        fontWeight: 'bold',
        textAlign: 'center',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2EA44F',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5
    },
    
});
