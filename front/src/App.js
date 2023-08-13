import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { TradingModule } from "./components/tradingModule/index";
import { WalletModule } from "./components/walletModule";
import { BalanceInfo } from "./components/BalanceModule/BalanceInfo";
import { CoinRegisterForm } from "./components/coinModule/coinRegisterForm";
import MainContainer from "./globalDesign";
import { Login } from "./components/loginModule/Login";
import { KakaoLogin } from "./components/loginModule/KakaoLogin";

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
                                        <Route
                                                path="/login"
                                                element={<Login />}
                                        ></Route>
                                        <Route
                                                path="/kakaologin"
                                                element={<KakaoLogin />}
                                        ></Route>
                                </Routes>
                        </MainContainer>
                </div>
        );
}

export default App;
