import React, { createContext, useState } from 'react';

export const DataStruk = createContext();
export const DataStrukProvider = ({ children }) => {
    const [data, setData] = useState({
        Bank: "",
        Admin: 0,
        JumlahTransfer: 0,
        Nama: "",
        NoRek: "",
        Total: 0
    });
    const value = {data, setData};
    return (
        <DataStruk.Provider value={value}>
            {children}
        </DataStruk.Provider>
    )
}