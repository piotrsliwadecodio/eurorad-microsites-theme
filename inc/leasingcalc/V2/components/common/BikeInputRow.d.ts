export interface Row {
    price: number;
    uvp: number;
    uid: number;
}
interface BikeInputRowProps {
    onChange: (params: {
        index: number;
        row: Row;
    }) => void;
    onRemove: (index: number) => void;
    index: number;
    price: number;
    uvp: number;
    uid: number;
    removeAvailable: boolean;
    isProduct: boolean;
    maxBikePrice: number;
    minBikePrice: number;
    extended: boolean;
}
declare const BikeInputRow: ({ onChange, onRemove, index, price, uvp, uid, removeAvailable, isProduct, maxBikePrice, minBikePrice, extended, }: BikeInputRowProps) => import("react/jsx-runtime").JSX.Element;
export default BikeInputRow;
