import { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ActivityIndicator,
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import LayoutInterface from "../Interfaces/Common/LayoutInterface";
import Colors from "../utilty/Colors";
import { Snackbar } from "react-native-paper";
import LayoutStateInterface from "../Interfaces/States/LayoutStateInterface";
import { ConstantsVar } from "../utilty/ConstantsVar";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { HeaderStyling } from "../utilty/styling/HeaderStyling";
import { CommonHelper } from "../utilty/CommonHelper";
import InputComponent from "../Components/Common/InputComponent";
import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommonCamera from "../Components/Common/CommmonCamera";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
const Stack = createStackNavigator();
export default class MainLayout extends Component<
  LayoutInterface,
  LayoutStateInterface
> {
  changeTextDebouncer;
  constructor(props: any) {
    super(props);
    this.state = {
      refresh: false,
      visible: false,
      top: 50,
      color: Colors.theme_success_color,
      msgData: { head: null, subject: null },
      canGoBack: false,
      userObj: undefined,
      showHeaderText: false,
      isSearchBar: false,
      scrollEnabled: true,
      scrollY: new Animated.Value(0),
      barCodeVisible: false,
    };
  }
  refreshData() {
    if (this.props?.onRefresh) {
      this.props?.onRefresh({ data: "data" });
    }
  }
  async componentDidMount() {
    this.changeTextDebouncer = debounce(this.changeTextDebounced, 800);
    const checkRoutes = [
      "Wallet",
      "Bookings",
      "Home",
      "Settings",
      "Profile",
      "Help",
      "BookingSuccess",
      "Favorite Professionals",
      "My Services",
      "My Bookings",
      "Professional Profile",
      "ProfSettings"
    ];
    const user = await CommonHelper.getUserData();
    if (this.props.scollEnabled === false) {
      this.setState({ scrollEnabled: this.props.scollEnabled });
    }
    if (this.props.route) {
      const index = this.props.navigation
        .getState()
        ?.routes.findIndex((x) => x.name === this.props.route.name);
      const prevScreenNameObj =
        this.props.navigation.getState()?.routes?.[index - 1];
      this.setState({ previousScreenName: prevScreenNameObj?.name });
    }
    this.setState({
      showHeaderText: this.props?.showHeaderText,
      isSearchBar: this.props?.isSearchBar,
    });
    this.setState({ userObj: user });
    if (this.props?.navigation?.canGoBack()) {
      this.setState({ canGoBack: true });
    } else {
      this.setState({ canGoBack: false });
    }
    this.props?.navigation.addListener("focus", async () => {
      if (this.props?.navigation?.canGoBack()) {
        this.setState({ canGoBack: true });
      } else {
        this.setState({ canGoBack: false });
      }
      if (checkRoutes?.includes(this.props?.route?.name)) {
        this.setState({ canGoBack: false });
      }
    });
    if (checkRoutes?.includes(this.props?.route?.name)) {
      this.setState({ canGoBack: false });
    }
    DeviceEventEmitter.addListener(ConstantsVar.API_ERROR, (data: any) => {
      this.setState({ visible: true });
      this.setState({
        color: data?.color,
        msgData: data?.msgData,
      });
      if (data?.top) {
        this.setState({
          top: data?.top,
        });
      }
    });
    DeviceEventEmitter.addListener(
      ConstantsVar.API_ERROR_LOGOUT,
      (data: any) => {
        CommonHelper.logoutUser();
        this.props.navigation.navigate("LoginScreen");
      }
    );
  }
  changeTextDebounced = (text) => {
    if (this.props?.onSearchCallback) {
      this.props?.onSearchCallback(text);
    }
  };
  tabClickCallBack(data: any) {
    if (this.props?.onClickTab) {
      this.props?.onClickTab(data);
    }
  }
  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  }
  loadMore() {
    if (this.props?.onScroll) {
      this.props.onScroll({ loadMore: true });
    }
  }
  openOrCloseCamera(type: boolean = false) {
    this.setState({ barCodeVisible: type });
  }
  async closeCamera(data: any = undefined) {
    if (data) {
      this.openOrCloseCamera(false);
      const parseData = JSON.parse(data);
      if (parseData?.type === "order") {
        if (this.props?.isLoading) {
          this.props?.isLoading(true);
        }
        const checkDetail = await CommonApiRequest.getProfBookingDetail(
          parseData?.id
        );
        this.props?.isLoading(false);
        if (checkDetail?.status === 201) {
          alert(checkDetail?.msg);
        } else if (checkDetail?.status === 200) {
          if (this.state?.userObj?.type === 4) {
            this.props.navigation?.navigate("Booking Details", {
              data: parseData?.id,
            });
          }
        }
      } else if (parseData?.type === "profile") {
        if (this.state?.userObj?.type === 2) {
          this.props.navigation?.navigate("Professional Detail", {
            data: parseData,
          });
        }
      }
    }
  }
  render() {
    return (
      <>
        <StatusBar
          style="light"
          animated={true}
          networkActivityIndicatorVisible={true}
          backgroundColor={Colors.primary_color}
        ></StatusBar>
        <View style={HeaderStyling.headerContainer}>
          <View style={HeaderStyling.drawerContainer}>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              {!this.state.canGoBack && (
                <Pressable
                  style={{minWidth:40}}
                  onPress={() => {
                    this.props?.navigation?.toggleDrawer();
                  }}
                >
                  <FontAwesome6 name="bars-staggered" size={24} color="white" />
                </Pressable>
              )}
              {this.state.canGoBack && (
                <>
                  <Pressable
                    onPress={() => {
                      this.props?.navigation?.goBack();
                    }}
                  >
                    <Ionicons name="arrow-back" size={24} color="white" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      this.props?.navigation?.goBack();
                    }}
                    style={{marginLeft: 3}}
                  >
                    <View>
                      <Text style={ThemeStyling.heading6}>
                        {this.state?.previousScreenName?.substring(0, 6) + "..."}
                      </Text>
                    </View>
                  </Pressable>
                  <View
                    style={{
                      marginLeft: 20,
                      width: "50%",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[ThemeStyling.heading5, { fontSize: 13 }]}>
                      {this.props.route.name}
                    </Text>
                  </View>
                </>
              )}
              {this.state?.showHeaderText && (
                <View style={{ marginLeft: 10 }}>
                  <Text style={ThemeStyling.heading5}>
                    Hi, {this.state?.userObj?.name}
                  </Text>
                </View>
              )}
              {this.props?.otherText && (
                <View style={{ marginLeft: 10 }}>
                  <Text style={ThemeStyling.heading5}>
                    {this.props?.otherText}
                  </Text>
                </View>
              )}
              {this.props?.needScanner && (
                <View style={{ marginLeft: "auto", marginRight: 0 }}>
                  <Pressable
                    onPress={() => {
                      this.openOrCloseCamera(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="line-scan"
                      size={24}
                      color={Colors.white}
                    />
                  </Pressable>
                </View>
              )}
            </View>
            {this.state.isSearchBar && (
              <View style={{ marginTop: 15 }}>
                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={this.changeTextDebouncer}
                  placeholder="Search ..."
                  style={{
                    height: 40,
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    backgroundColor: "white",
                  }}
                ></TextInput>
              </View>
            )}
          </View>
        </View>
        {this.props?.isTab && this.props?.tabData?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary_color,
            }}
          >
            {this.props?.tabData?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    this.props?.tabDefaultKey === item?.key
                      ? ThemeStyling.tabActive
                      : {},
                    ,
                    {
                      width: "45%",
                      marginRight: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      this.tabClickCallBack(item?.key);
                    }}
                    style={{
                      width: "100%",
                      alignItems: "center",
                      paddingVertical: 15,
                    }}
                  >
                    <Text style={{ color: Colors.white }}>{item?.name}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
        {this.props?.loader && (
          <View style={ThemeStyling.loader}>
            <ActivityIndicator size="large" color={Colors.primary_color} />
            <Text style={{ color: "white" }}>
              {this.props?.loaderText
                ? this.props?.loaderText
                : "Please wait..."}
            </Text>
          </View>
        )}
        <ScrollView
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
          scrollEnabled={this.state.scrollEnabled}
          onScrollEndDrag={(event: any) => {
            console.log(this.isCloseToBottom(event?.nativeEvent));
            if (this.isCloseToBottom(event?.nativeEvent)) {
              this.loadMore();
            }
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              useNativeDriver: false,
              listener: (event: any) => {
                if (this.isCloseToBottom(event?.nativeEvent)) {
                  //this.loadMore();
                }
              },
            }
          )}
          refreshControl={
            this.props?.onRefresh ? (
              <RefreshControl
                refreshing={this.state?.refresh}
                //refresh control used for the Pull to Refresh

                onRefresh={this.refreshData.bind(this)}
              />
            ) : (
              <></>
            )
          }
          style={[ThemeStyling.scrollView, this.props?.style,{width:'100%',minWidth:'100%'}]}
          contentContainerStyle={[
            { minHeight: "100%", width: "100%",minWidth:'100%' },
            this.props.containerStyle,
            {
              paddingTop: this.props.containerStyle?.paddingTop
                ? this.props.containerStyle?.paddingTop
                : 45,
            },
          ]}
        >
          {this.props?.onSearchCallback && (
            <RefreshControl
              refreshing={this.state?.refresh}
              onRefresh={this.refreshData.bind(this)}
            />
          )}
          {this.props?.headerText && (
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 18,
                  marginBottom: 10,
                  paddingLeft: 15,
                },
              ]}
            >
              <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                {this.props?.backButton && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  >
                    <Ionicons
                      name="arrow-back"
                      style={[
                        ThemeStyling.icon2,
                        {
                          fontSize: Colors.FontSize.h3,
                          lineHeight: 30,
                          color: Colors.dark_color,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                )}
                <Text
                  style={[
                    ThemeStyling.heading3,
                    {
                      marginBottom: 0,
                      paddingBottom: 0,
                      textAlign: "center",
                      flex: 1,
                      marginLeft: 0,
                    },
                  ]}
                >
                  {this.props?.headerText}
                </Text>
              </View>
            </View>
          )}
          {this.props?.children}
          {this.props?.loadMore?.status && (
            <View
              style={{
                marginTop: 5,
                marginBottom: 20,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15 }}>
                {this.props?.loadMore?.text
                  ? this.props?.loadMore?.text
                  : "Loading..."}
              </Text>
            </View>
          )}
        </ScrollView>
        <Snackbar
          visible={this.state?.visible ? true : false}
          onDismiss={() => this.setState({ visible: false })}
          duration={5000}
          style={{ backgroundColor: this.state.color, top: 0 }}
          wrapperStyle={{ top: this.state.top }}
        >
          <View>
            {this.state?.msgData?.head && (
              <Text
                style={[
                  ThemeStyling.heading3,
                  { marginBottom: 0, color: Colors.white },
                ]}
              >
                {this.state?.msgData?.head} :{" "}
              </Text>
            )}
            {this.state?.msgData?.subject && (
              <Text
                style={[
                  ThemeStyling.text1,
                  {
                    fontWeight: "400",
                    color: Colors.white,
                    marginBottom: 0,
                    flexWrap: "wrap",
                  },
                ]}
              >
                {this.state?.msgData?.subject}
              </Text>
            )}
          </View>
        </Snackbar>

        <Modal visible={this.state.barCodeVisible} transparent={true}>
          <CommonCamera
            onCloseCamera={(data: any) => {
              this.closeCamera(data);
            }}
          ></CommonCamera>
        </Modal>
      </>
    );
  }
}
