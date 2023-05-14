const AssetInfoForcard = ({ assetData }) => {
        const assetList = assetData[0].balances.map((v, k) => {
                return (
                        <div key={k}>
                                <div>
                                        <span>{v.name}</span>
                                        <span>{" (" + v.symbol + ")"}</span>
                                </div>
                                <div>
                                        <span>
                                                {"$ " +
                                                        (
                                                                v.price *
                                                                v.balance
                                                        ).toFixed(2)}
                                        </span>
                                        <span>
                                                {"balance : " +
                                                        parseFloat(
                                                                v.balance
                                                        ).toFixed(2)}
                                        </span>
                                        <span>
                                                {"current price : " + v.price}
                                        </span>
                                </div>
                        </div>
                );
        });

        return <div>{assetList}</div>;
};

export default AssetInfoForcard;
