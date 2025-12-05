import { InputParams, Settings } from '../../../defaultOptions';

interface LeasingPriceParams {
    inputParams: InputParams;
    settings: Settings;
    leasingRateInsurancePerMonth: number;
    leasingRateInsurancePerMonthNet: number;
    bikePriceWithLeasingInsurance: number;
    bikePrice: number;
}
interface LeasingPrice {
    leasingRate: number;
    leasingRateFactor: number;
    leasingRateWithoutInsurance: number;
    leasingRateWithoutInsuranceNet: number;
}
declare function getLeasingPrice({ inputParams, settings, leasingRateInsurancePerMonth, leasingRateInsurancePerMonthNet, bikePrice, bikePriceWithLeasingInsurance, }: LeasingPriceParams): LeasingPrice;
export default getLeasingPrice;
