import React, { createContext, useContext, useState } from 'react';

import defaultProfileImage from '../../../assets/images/Icono_perfil.png'; // Corrected import

type UserContextType = {
    profileImage: string;
    setProfileImage: (uri: string) => void;
};

export const UserContext = createContext<UserContextType>({
    profileImage: '',
    setProfileImage: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [profileImage, setProfileImage] = useState<any>(defaultProfileImage);

    return (
        <UserContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);