export default interface LayoutInterface {
    style?:any;
    children?:any;
    isTopLogo?:boolean;
    onRefresh?:any;
    loader?:boolean;
    headerText?:string;
    backButton?:boolean;
    navigation?:any;
    containerStyle?:any,
    route?:any,
    showHeaderText?:boolean,
    isSearchBar?:boolean,
    scollEnabled?:boolean,
    onSearchCallback?:any
}