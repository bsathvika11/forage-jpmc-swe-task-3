import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: Number;
  price_def: Number;
  ratio: Number;
  timestamp: Date;
  upper_bound: Number;
  lower_bound: Number;
  trigger_alert: Number | undefined;
}

export class DataManipulator {
  static generateRow(
    serverRespond: ServerRespond[]
    //historicalData: HistoricalData[]
  ): Row {
    //const averageRatio = calculateAverageRatio(historicalData);
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    const priceABC =
      (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF =
      (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const triggerAlert =
      ratio > upperBound || ratio < lowerBound ? ratio : undefined;
    const latestTimestamp =
      serverRespond[0].timestamp > serverRespond[1].timestamp
        ? serverRespond[0].timestamp
        : serverRespond[1].timestamp;

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: latestTimestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
    };
  }
}
/*function calculateAverageRatio(historicalData: HistoricalData[]): number {
  let sumRatio = 0;
  for (const data of historicalData) {
    sumRatio += data.priceABC / data.priceDEF;
  }
  const averageRatio = sumRatio / historicalData.length;
  return averageRatio;
}*/
