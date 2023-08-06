import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const KakaoLogin = () => {
        const code = useLocation();
        console.log(code);

        useEffect(() => {
                const cb = async () => {
                        console.log("asd");
                        const response = await axios.get(
                                `${process.env.REACT_APP_BACKEND_SERVER}` +
                                        `${process.env.REACT_APP_REDIRECT_URI}` +
                                        `?code=`
                        );

                        console.log(response.data);
                };
                cb();
        }, []);

        return <>카카오 로그인 중..</>;
};
