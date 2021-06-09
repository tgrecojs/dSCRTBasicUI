import { useEffect, useState } from "react";

const MINUTE_MS = 60000;

export const useOracle = () => {
  const [scrtPrice, setScrtPrice] = useState(undefined);

  useEffect(() => {
    const getBalance = async () => {
      // fallback to binance prices
      const scrtbtc = await fetch(
        "https://api.binance.com/api/v1/ticker/24hr?symbol=SCRTBTC"
      );
      const btcusdt = await fetch(
        "https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT"
      );

      let scrtRate =
        Number((await scrtbtc.json()).lastPrice) *
        Number((await btcusdt.json()).lastPrice);

      if (!isNaN(scrtRate)) {
        return setScrtPrice(scrtRate.toFixed(5));
      }
    };

    getBalance();
    const interval = setInterval(getBalance, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  return [scrtPrice];
};
