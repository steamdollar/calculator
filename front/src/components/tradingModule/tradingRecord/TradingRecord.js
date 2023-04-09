import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export function TradingRecord() {
        const dispatch = useDispatch();
        const varis = useSelector((state) => state);

        useEffect(() => {
                dispatch();
        });

        return <div>훠어어어</div>;
}
