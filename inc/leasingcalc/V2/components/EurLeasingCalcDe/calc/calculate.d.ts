import { InputParams, Settings } from '../../../defaultOptions';
import { Results } from '../Result';

export interface BMFCalculator {
    PKV: number;
    KRV: number;
    [key: string]: number | boolean | number[];
}
declare const calculate: ({ settings, inputParams, }: {
    settings: Settings;
    inputParams: InputParams;
}) => Results | null;
export default calculate;
