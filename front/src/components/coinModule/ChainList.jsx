import { useDispatch, useSelector } from "react-redux";
import { networkList } from "../../util/network";
import { setChain } from "./coinRegisterSlice";

export const ChainList = () => {
        const dispatch = useDispatch();
        const chooseChain = (e) => {
                dispatch(setChain(e.target.value));
        };

        const selector = networkList.map((v, k) => {
                return (
                        <option key={k} value={v}>
                                {v}
                        </option>
                );
        });

        return <select onChange={chooseChain}>{selector}</select>;
};
