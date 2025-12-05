import { Row } from './components/common/BikeInputRow';

export interface InputParams {
    totalPrice?: number;
    totalPriceUVP?: number;
    salaryGross?: number;
    insurancePackage?: string;
    employerTaxDeduction?: boolean;
    churchTax?: boolean;
    taxClass?: number;
    taxFactor?: number;
    leasingPeriod?: number;
    benefit?: number;
    benefit2?: number;
    benefitInternet?: number;
    benefitPhone?: number;
    benefitAds?: number;
    benefitAdditional?: {
        name: string;
        value: number;
    }[] | undefined;
    pensionInsurance?: number;
    healthInsurance?: number;
    healthInsuranceFactor?: number;
    region?: string;
    workTypeOfficial?: boolean;
    hasChildren?: boolean;
    childAllowances?: number;
    childrenCount?: number;
    bikeCount?: number;
    bikeRows?: Row[];
}
interface Colors {
    text?: string;
    textRequired?: string;
    textLight?: string;
    headRowBg?: string;
    headBoxBg?: string;
    formBg?: string;
    yes?: string;
    no?: string;
    primary?: string;
    button?: string;
    buttonText?: string;
    buttonLight?: string;
    border?: string;
    input?: string;
    inputDisabled?: string;
    inputRequired?: string;
    resultRowHighlight?: string;
    resultRowAlternate?: string;
    resultRowHead?: string;
    resultRowFoot?: string;
    resultDetailButton?: string;
}
interface Regions {
    short?: string;
    full?: string;
}
interface LeasingFactors {
    upto?: number;
    value?: number;
}
interface LeasingInsurancePrices {
    upto?: number;
    value?: number;
}
interface Features {
    [key: string]: boolean | string;
}
export interface InsurancePackages {
    name?: string;
    title?: string;
    leasingFactors?: LeasingFactors[];
    leasingInsurancePrices?: LeasingInsurancePrices[];
    maxBikePrice?: number;
    features?: Features;
}
export interface Settings {
    language?: string;
    isProduct?: boolean;
    calculateMethod?: string;
    formMode?: string;
    repairCost?: number;
    maxBikes?: number;
    maxBikePrice?: number;
    minBikePrice?: number;
    linkToInsurances?: string;
    benefitType?: number;
    benefitDropdown?: {
        name: string;
        optValue: string;
    }[];
    benefitAdditional?: {
        name: string;
        value: number;
        editable?: boolean;
    }[];
    benefitPerInsurancePackage?: Record<string, number>;
    benefitBikeCount?: number;
    benefitFixed?: boolean;
    subtractTaxAfterEmployerBenefit?: boolean;
    subtractBenefitsInResults?: boolean;
    noTaxOnInsurance?: boolean;
    useFullBikeUvpPrice?: boolean;
    includeInsuranceForFactorComparison?: boolean;
    hasReverseCalculator?: boolean;
    regions?: Regions[];
    insurancePackages?: InsurancePackages[];
    initialBikePrice?: number;
    initialBikePriceUvp?: number;
}
interface Texts {
    [key: string]: {
        [key: string]: string;
    };
}
export interface Options {
    initialParams?: InputParams;
    hiddenInputs?: string[];
    colors?: Colors;
    settings?: Settings;
    texts?: Texts;
}
export declare const defaultOptionsDE: Options;
export declare const defaultOptionsAT: Options;
export {};
