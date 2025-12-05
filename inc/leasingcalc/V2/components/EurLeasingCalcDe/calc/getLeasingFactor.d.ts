import { InputParams, Settings } from '../../../defaultOptions';

interface LeasingFactorParams {
    settings: Settings;
    inputParams: InputParams;
    bikePrice: number;
    bikePriceWithLeasingInsurance: number;
}
interface LeasingFactor {
    leasingRateFactor: number;
}
declare function getLeasingFactor({ settings, inputParams, bikePrice, bikePriceWithLeasingInsurance, }: LeasingFactorParams): LeasingFactor;
export default getLeasingFactor;
