import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { TradingModule } from "./components/tradingModule/index";
import { WalletModule } from "./components/walletModule";
import { WalletInfo } from "./components/walletModule/walletInfo/walletInfo";

function App() {
        return (
                <div className="App">
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
                                        element={<WalletInfo />}
                                ></Route>
                        </Routes>
                </div>
        );
}

export default App;
