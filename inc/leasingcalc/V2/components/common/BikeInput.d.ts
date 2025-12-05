import { Row } from './BikeInputRow';
import { InputParams } from '../../defaultOptions';

interface BikeInputProps {
    initialValueUvp: number;
    initialValue: number;
    onChange?: (params: {
        totalPrice: number;
        totalPriceUVP: number;
        bikeCount: number;
        bikeRows: Row[];
    }) => void;
    maxBikes: number;
    extended: boolean;
    sendParams: InputParams;
    maxBikePrice?: number;
}
declare const BikeInput: import('react').MemoExoticComponent<({ initialValueUvp, initialValue, onChange, maxBikes, extended, maxBikePrice, }: BikeInputProps) => import("react/jsx-runtime").JSX.Element | null>;
export default BikeInput;
