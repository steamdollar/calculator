import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { TradingModule } from "./components/tradingModule/index";

function App() {
        return (
                <div className="App">
                        <Header />

                        <Routes>
                                <Route path="/">훠어어</Route>
                                <Route
                                        path="/trading"
                                        element={<TradingModule />}
                                ></Route>
                        </Routes>
                </div>
        );
}

export default App;
