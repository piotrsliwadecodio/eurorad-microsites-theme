import { InputParams, Settings } from '../../../defaultOptions';

declare function getInsurancePackage({ inputParams, settings, }: {
    inputParams: InputParams;
    settings: Settings;
}): import('../../../defaultOptions').InsurancePackages;
export default getInsurancePackage;
