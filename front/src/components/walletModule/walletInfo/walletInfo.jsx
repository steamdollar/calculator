import { React } from "react";
import { useParams } from "react-router-dom";

export const WalletInfo = () => {
        const { walletId } = useParams();
        return <div>wallet id :{walletId}</div>;
};
