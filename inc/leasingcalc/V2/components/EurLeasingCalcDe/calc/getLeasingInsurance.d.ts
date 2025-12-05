import { InputParams, Settings } from '../../../defaultOptions';

export interface BikeLeasingInsurancesPerBike {
    leasinginsurancePerMonth: number;
    leasinginsurancePerMonthNet: number;
    leasingInsurance: number;
    leasingInsuranceNet: number;
    bikeWithInsurance: number;
}
interface LeasingInsurance {
    leasingRateInsuranceTotal: number;
    leasingRateInsuranceTotalNet: number;
    leasingRateInsurancePerMonth: number;
    leasingRateInsurancePerMonthNet: number;
    bikePriceWithLeasingInsurance: number;
    leasingRateInsurancesPerBike: BikeLeasingInsurancesPerBike[];
}
declare function getLeasingInsurance({ inputParams, settings, }: {
    inputParams: InputParams;
    settings: Settings;
}): LeasingInsurance | null;
export default getLeasingInsurance;
