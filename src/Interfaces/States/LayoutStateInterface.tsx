export default interface LayoutStateInterface{
    refresh: boolean,
    visible:boolean,
    top?:number,
    color?:string,
    msgData?:any,
    canGoBack?:boolean,
    userObj?:any,
    showHeaderText?:boolean,
    isSearchBar?:boolean,
    previousScreenName?:string,
    scrollEnabled?:boolean,
    loaderText?:string,
    scrollY?:any,
    barCodeVisible?:boolean
}