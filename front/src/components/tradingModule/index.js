import { Calculator } from "./calculator/Calculator";
import { TradingRecord } from "./tradingRecord/TradingRecord";

export function TradingModule() {
        return (
                <div>
                        <Calculator />
                        <TradingRecord />
                </div>
        );
}
