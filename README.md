# Lipa app - Scan QR Code to pay
This is a React Native android app that allows the user to scan a QR code to pay for goods/services using M-PESA.

# Why?
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

# How it works
This app scans a merchant QR-Code containing their till number and amount. This data is then sent to the server which returns a payment prompt to the user.
The user then enters their M-PESA PIN and confirms the transaction.

# Languages
* React Native(Expo)
* JavaScript
