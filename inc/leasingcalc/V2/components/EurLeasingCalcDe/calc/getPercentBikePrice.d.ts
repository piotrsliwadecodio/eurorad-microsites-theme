import { InputParams, Settings } from '../../../defaultOptions';

export interface PercentBikePrice {
    bikePricePercent: number;
    bikePriceQuarterUvp: number;
    bikesPriceFractionUvp: number;
    bikePricePercentFull: number;
}
declare function getPercentBikePrice({ inputParams, settings, }: {
    inputParams: InputParams;
    settings: Settings;
}): PercentBikePrice | null;
export default getPercentBikePrice;
