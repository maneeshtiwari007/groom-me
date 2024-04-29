export default interface ScreenInterfcae{
    navigation?:any;
    route?:any;
    data?:any;
    location?:any;
    didUpdate?:func;
    onClickResponse?:func
    isOnPressed?:boolean,
    isArchive?:boolean,
    showCount?:boolean,
    remark?:any,
    bookingType?:any,
    onDismiss?:func,
    onLoading?:func
}