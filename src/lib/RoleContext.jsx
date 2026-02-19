import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const roles = {
    ADMIN: 'Admin',
    OPS_MANAGER: 'Operations Manager',
    TEAM_MEMBER: 'Team Member',
    MD: 'Managing Director'
};

export function RoleProvider({ children }) {
    const [activeRole, setActiveRole] = useState(roles.ADMIN);

    return (
        <RoleContext.Provider value={{ activeRole, setActiveRole, roles }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
