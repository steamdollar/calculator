import styled from "styled-components";
import { firstLetterUpper } from "../../util/checkValue";

const AssetInfoWrap = styled.div`
        width: 40%;
        margin: 0 auto;
`;

const TokenName = styled.div`
        font-style: bold;
        font-size: 17px;
        margin: 0 0 2% 0;
`;

const AssetInfoForcard = ({ assetData }) => {
        const total = assetData[0].balances.reduce((acc, token) => {
                return acc + parseFloat(token.balance) * token.price;
        }, 0);

        const assetList = assetData[0].balances.map((v, k) => {
                return (
                        <>
                                <div key={k} style={{ marginBottom: "5%" }}>
                                        <TokenName>
                                                <span>
                                                        {`- ${firstLetterUpper(
                                                                v.name
                                                        )}`}
                                                        <span
                                                                style={{
                                                                        fontSize: "11px",
                                                                }}
                                                        >{`(${v.symbol})`}</span>
                                                </span>
                                        </TokenName>
                                        <div style={{ fontSize: "13px" }}>
                                                <span>
                                                        {" $ " +
                                                                (
                                                                        v.price *
                                                                        v.balance
                                                                ).toFixed(2)}

                                                        {" = " +
                                                                parseFloat(
                                                                        v.balance
                                                                ).toFixed(4) +
                                                                " * "}

                                                        {"$" +
                                                                parseFloat(
                                                                        v.price
                                                                ).toFixed(2)}
                                                </span>
                                        </div>
                                </div>
                        </>
                );
        });

        return (
                <>
                        <AssetInfoWrap>{assetList}</AssetInfoWrap>
                        <div>{"$" + total.toFixed(2)}</div>
                </>
        );
};

export default AssetInfoForcard;
