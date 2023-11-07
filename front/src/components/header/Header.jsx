import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigator = styled.nav`
        border: 1px solid black;
        margin-bottom: 3%;
        display: flex;
        padding: 0px 25%;
        font-size: 20px;
        justify-content: space-between;
        height: 50px;
        align-items: center;
`;

export function Header() {
        const [userInfo, setUserInfo] = useCookies(["userInfo"]);

        const as = () => {
                console.log(userInfo);
        };

        return (
                <Navigator>
                        <span>
                                <Link to="/">main</Link>
                        </span>
                        <span>
                                <Link to="/trading">Trading</Link>
                        </span>
                        <span>
                                <Link to="/wallet/:walletId">Wallet</Link>
                        </span>
                        <span>
                                <Link to="/coin">Coin</Link>
                        </span>
                        <span>
                                <Link to="/login">Login</Link>
                        </span>
                        <span onClick={as}>asdasdads</span>
                </Navigator>
        );
}
