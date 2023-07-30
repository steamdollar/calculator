import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { TradingModule } from "./components/tradingModule/index";
import { WalletModule } from "./components/walletModule";
import { BalanceInfo } from "./components/BalanceModule/balanceInfo";
import { CoinRegisterForm } from "./components/coinModule/coinRegisterForm";
import MainContainer from "./globalDesign";

function App() {
        return (
                <div className="App">
                        <MainContainer>
                                <Header />

                                <Routes>
                                        <Route
                                                path="/"
                                                element={<WalletModule />}
                                        ></Route>
                                        <Route
                                                path="/trading"
                                                element={<TradingModule />}
                                        ></Route>
                                        <Route
                                                path="/wallet/:walletId"
                                                element={<BalanceInfo />}
                                        ></Route>
                                        <Route
                                                path="/coin"
                                                element={<CoinRegisterForm />}
                                        ></Route>
                                </Routes>
                        </MainContainer>
                </div>
        );
}

export default App;
