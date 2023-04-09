import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigator = styled.nav`
        border: 1px solid black;
        margin-bottom: 3%;
        display: flex;
        padding: 0px 25%;
        font-size: 20px;
        justify-content: space-between;
`;

export function Header() {
        return (
                <Navigator>
                        <span>
                                <Link to="/">main</Link>
                        </span>
                        <span>
                                <Link to="/trading">Trading</Link>
                        </span>
                </Navigator>
        );
}