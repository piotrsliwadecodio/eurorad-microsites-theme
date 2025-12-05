export interface Results {
    leasingRateTotal: number;
    realNet: number;
    workTypeOfficial: boolean;
    salaryGross: number;
    acceptCostPremiumPlus: string;
    arbeitgeberanteilPremiumPlus: number;
    benefit: number;
    entgeltumwandlungLeasingrate: number;
    entgeltumwandlungVersicherungPremiumPlus: number;
    leasingPeriod: number;
    leasingTotal: number;
    bruttoentgeltNachUmwandlungKauf: number;
    bruttoentgeltNachUmwandlungLeasing: number;
    sozialversicherungsbeitraegeKauf: number;
    sozialversicherungsbeitraegeLeasing: number;
    incomeTaxKauf: number;
    incomeTaxLeasing: number;
    nettogehaltKauf: number;
    nettogehaltLeasing: number;
    leasingRateWithBike: number;
    gesamtratenWaehrendLeasingdauer: number;
    kaufBzwUebernahmepreisKauf: number;
    kaufBzwUebernahmepreisLeasing: number;
    totalCostInclInsuranceKauf: number;
    totalCostInclInsuranceLeasing: number;
    savingsAgainstPurchase: number;
    savingsPercent: number;
}
export default function Result({ results }: {
    results: Results;
}): import("react/jsx-runtime").JSX.Element;
