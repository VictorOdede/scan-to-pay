import React, {createContext, useState} from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {

    

     // state for users phone number
    const [phone, setPhone] = useState('');
    //state for businessID
    const [ID, setID] = useState('');
    // state for businessName
    const [businessURL, setBusiness] = useState('')

    return(
       <DataContext.Provider value={{mpesaNumber: [phone, setPhone], scannedID: [ID, setID], businessQR: [businessURL, setBusiness]}}>
           {props.children}
       </DataContext.Provider> 
    );
}