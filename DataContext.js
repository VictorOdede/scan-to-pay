import React, {createContext, useState} from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {
    //state for matatu registration plate
    const [newMatatuReg, setNewMatatuReg] = useState(null);
    //state for matatu sacco name
    const [newSacco, setNewSacco] = useState(null);
    //state for amount to send
    const [newAmount, setNewAmount] = useState('');
    //state for users phone number
    //How to cache phone number on users device???
    const [newNumber, setNewNumber] = useState('');
    // 

    return(
       <DataContext.Provider value={[newNumber, setNewNumber]}>
           {props.children}
       </DataContext.Provider> 
    );
}