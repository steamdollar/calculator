import React from "react";
import { WalletRegisterForm } from "./registerForm/WalletregisterForm";
import { WalletList } from "./walletListModule/walletList";

export const WalletModule = () => {
        return (
                <div>
                        <WalletRegisterForm />
                        <WalletList />
                </div>
        );
};
