# Scan QR Code to pay
This is a React Native android app that allows the user to scan a QR code to pay for goods/services using M-PESA.

# Overview
This app scans a merchant QR-Code embedded with the payment amount. Once the QR code is scanned, the transaction data is then sent to the server which returns a payment prompt to the user. The user then enters their PIN to complete the transaction. This app automates away all the repetitive steps making the checkout process faster.

# Installation
If you do not want to run the project locally, I have deployed this app on the Google Play store and it can be accessed publicly at https://play.google.com/store/apps/details?id=com.slickvik99.lipa

This app can also be ran locally by following these steps:

- Clone the repository on to your local PC
- Run npm install to set up the node modules
- Run npm run dev to start the app
- Connect to the same Wi-Fi newtwork as your PC and open the Expo app on your mobile phone. You will see the app running in Expo.

# Approach
Paying for goods/services directly using M-PESA SIM service is a long process involving the following steps: 
1. Open SIM service app
2. Click M-PESA
3. Click Lipa na M-PESA
4. Click Buy Goods and Services
5. Enter merchant's till number
6. Enter Amount
7. Enter M-PESA PIN
8. Confirm transaction

By automatically storing repeated information in a QR Code, we can reduce the number of steps to: 
1. Scan QR Code
2. Enter M-PESA PIN
3. Confirm transaction

In order to send encoded QR data to the server, we need to use a client QR-scanner app.

# Languages
* React Native(Expo)
* JavaScript
