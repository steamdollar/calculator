import styled from "styled-components";

const AssetInfoWrap = styled.div`
        width: 40%;
        margin: 0 auto;
`;

const TokenName = styled.div`
        font-style: bold;
        font-size: 20px;
        margin: 0 0 2% 0;
`;

const AssetInfoForcard = ({ assetData }) => {
        const assetList = assetData[0].balances.map((v, k) => {
                return (
                        <div key={k} style={{ marginBottom: "3%" }}>
                                <TokenName>
                                        <span>
                                                - {v.name}{" "}
                                                {" (" + v.symbol + ")"}
                                        </span>
                                </TokenName>
                                <div style={{ fontSize: "16px" }}>
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
                );
        });

        return <AssetInfoWrap>{assetList}</AssetInfoWrap>;
};

export default AssetInfoForcard;
