import { BikeLeasingInsurancesPerBike } from './getLeasingInsurance';
import { InputParams, Settings } from '../../../defaultOptions';

export interface BikePrices {
    bikePrice: number;
    bikesPlusRepair: number;
    bikePriceVatToSubtract: number;
    bikePricePercent: number;
    bikePriceQuarterUvp: number;
    bikePricePercentFull: number;
    bikesPriceFractionUvp: number;
    leasingRate: number;
    leasingRateWithoutInsurance: number;
    leasingRateWithoutInsuranceNet: number;
    leasingRateFactor: number;
    leasingRateNormalTotal: number;
    leasingRateInsuranceTotal: number;
    leasingRateInsuranceTotalNet: number;
    leasingRateInsurancePerMonth: number;
    leasingRateInsurancePerMonthNet: number;
    bikePriceWithLeasingInsurance: number;
    leasingRateInsurancesPerBike: BikeLeasingInsurancesPerBike[];
}
declare function getBikePrices({ inputParams, settings, }: {
    inputParams: InputParams;
    settings: Settings;
}): BikePrices | null;
export default getBikePrices;
