interface SavingsInput {
    bikePrices: {
        bikesPlusRepair: number;
        leasingRate: number;
        leasingRateNormalTotal: number;
    };
    totalCost: number;
    leasingRate: number;
    leasingPriceNormalTotal: number;
    leasingTotal: number;
}
export interface SavingsOutput {
    savingsPercent: number;
    savingsAbsolute: number;
    savingsLeasingPercent: number;
    savingsLeasingAbsolute: number;
}
declare function getSavings({ bikePrices, totalCost, leasingRate, leasingPriceNormalTotal, leasingTotal, }: SavingsInput): SavingsOutput;
export default getSavings;
