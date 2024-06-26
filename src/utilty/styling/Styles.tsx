import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Colors";
import { Platform } from 'react-native';
export const ThemeStyling = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    padding: 15,
    minHeight: '100%'
  },
  textPrimary: {
    color: Colors.primary_color
  },
  textOrange: {
    color: Colors.orange_color
  },
  textSuccess: {
    color: Colors.success_color
  },
  bgPrimary: {
    backgroundColor: Colors.primary_color,
  },
  bgSuccess: {
    backgroundColor: Colors.success_color,
  },
  bgWarning: {
    backgroundColor: 'rgba(255, 190, 12, 1)',
  },
  bgInfo: {
    backgroundColor: Colors.gray_color,
  },
  bgDanger: {
    backgroundColor: 'rgba(205, 50, 84, .2)',
  },
  bgGray: {
    backgroundColor: Colors.gray200
  },
  bglightPrimary: {
    backgroundColor: 'rgba(3, 154, 217, .3)',
  },
  bglightDanger: {
    backgroundColor: 'rgba(205, 50, 84, .2)',
  },
  bglightSuccess: {
    backgroundColor: 'rgba(75, 174, 79, .2)',
  },
  bglightInfo: {
    backgroundColor: Colors.grayLight,
  },
  bglightWarning: {
    backgroundColor: 'rgba(255, 190, 12, .2)',
  },
  header: {
    backgroundColor: 'rgba(3, 154, 217, 1)',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  imagecontainer: {
    height: 100,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  heading1: {
    fontSize: Colors.FontSize.h1,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: Colors.primary_color,
    textTransform: "capitalize",
    marginBottom: 15,
  },
  heading2: {
    fontSize: Colors.FontSize.h2,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    // color: Colors.darkBlue,
    textTransform: "capitalize",
    marginBottom: 5,
  },
  heading3: {
    fontSize: Colors.FontSize.h3,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: Colors.dark_color,
    marginBottom: 15,
  },
  heading4: {
    fontSize: Colors.FontSize.h4,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: Colors.darkBlue,
    marginBottom: 15,
  },
  heading5: {
    fontSize: Colors.FontSize.h5,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    textTransform: 'capitalize',
    color: Colors.white,
  },
  heading6: {
    fontSize: Colors.FontSize.h6,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    textTransform: 'capitalize',
    color: Colors.white,
  },
  text1: {
    fontSize: Colors.FontSize.p,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.secondry_color,
  },
  formgroup: {
    flex: 1,
    position: "relative",
  },
  inputIcon: {
    color: '#000',
    position: "absolute",
    right: 15,
    zIndex: 99,
    top: 15,
  },
  formcontrol: {
    flex: 1,
    borderRadius: 10,
    // borderColor: Colors.primary_color,
    color: Colors.gray400,
    borderStyle: 'solid',
    borderColor: Colors.gray400,
    padding: 8,
    paddingLeft: 15,
    borderWidth: 1,
    minHeight: 45,
    fontSize: 16
  },
  formcontrol2: {
    flex: 1,
    color: Colors.primary_color,
    borderStyle: 'solid',
    borderBottomColor: Colors.gray400,
    padding: 5,
    paddingLeft: 0,
    borderBottomWidth: 1
  },
  formLabel: {
    color: Colors.dark_color,
    fontSize: Colors.FontSize.h6,
    marginBottom: 0
  },
  inputbtn: {
    position: 'absolute',
    top: 5,
    right: 32,
  },
  textTmc: {
    flex: 1,
    marginBottom: 25
  },
  btnContainer: {
    flex: 1,
    marginBottom: 25,
    textAlign: "center",
    alignItems: 'center'
  },
  btnPrimary: {
    backgroundColor: Colors.primary_color,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "center",
    width: '100%',
    height: 50,
    // minWidth: 200,

  },
  btnOutlinedark: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: "center",
    width: '100%',
    height: 50,
    borderWidth:1,
    borderStyle:'solid',
    borderColor:Colors.dark_color
  },
  btnText: {
    textAlign: "center",
    fontSize: Colors.FontSize.f18,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: Colors.white,
  },
  btnLink: {
    alignItems: 'center',
  },
  btnText2: {
    textAlign: "center",
    fontSize: Colors.FontSize.p,
    textTransform: 'capitalize',
    color: Colors.primary_color,
    marginLeft: 5
  },
  fixedbottom: {
    paddingTop: 35,
    paddingBottom: 10,
    alignItems: "center",
  },
  arcStyled: {
    backgroundColor: Colors.orange_color,
    paddingBottom: 15,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
  },
  btnprimarydisable: {
    backgroundColor: '#898576',
  },
  //Work Order
  card: {
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activeCard: {
    backgroundColor: Colors.primary_color
  },
  deActiveCard: {

  },
  activeTextColor: {
    color: Colors.white,
    marginBottom: 0,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700'
  },
  deActiveTextColor: {
    color: Colors.secondry_color
  },
  cardHeader: {
    padding: 8,
    paddingBottom: 12
  },
  cardBody: {
    padding: 15,
  },
  twoColumnLayout: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  col1: {
    width: '8%'
  },
  col2: {
    width: '18%'
  },
  col3: {
    width: '32%'
  },
  col4: {
    width: '38%'
  },
  col5: {
    width: '48%'
  },
  col6: {
    width: '55%'
  },
  col8: {
    width: '61%',
  },
  col7: {
    width: '56%',
  },
  col10: {
    width: '78%',
  },
  col11: {
    width: '88%',
  },
  text2: {
    fontSize: Colors.FontSize.f12,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.white,
  },
  notification: {
    position: "relative",
    justifyContent: "flex-end",
    textAlign: "center"
  },
  count: {
    position: "absolute",
    right: 3,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: Colors.orange_color,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  workSchedule: {
    justifyContent: "flex-end"
  },
  date: {
    fontSize: Colors.FontSize.f38,
    lineHeight: 43,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.white,
  },
  monthYear: {
    fontSize: Colors.FontSize.f10,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.white,
  },
  duration: {
    fontSize: Colors.FontSize.f5,
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: Colors.white,
  },
  divider: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  text3: {
    fontSize: Colors.FontSize.f8,
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: Colors.white,
  },
  icon: {
    fontSize: Colors.FontSize.f8,
    color: Colors.white,
  },
  btnLink2: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnText_2: {
    fontSize: Colors.FontSize.f8,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.white,
    marginRight: 10,
  },
  icon2: {
    fontSize: Colors.FontSize.f12,
    color: Colors.white,
  },
  textDark: {
    color: Colors.dark_color
  },
  headingIcon: {
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  listItem: {
    marginBottom: 10,
    alignItems: "flex-start",
    flexDirection: "row"
  },
  listIcon: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: Colors.primary_color,
    alignItems: "center",
    color: Colors.white,
    fontSize: Colors.FontSize.f17,
    lineHeight: 35,
    marginRight: 10,
    textAlign: "center",
    display: 'flex',
    justifyContent: 'center',
  },
  listText: {
    fontSize: Colors.FontSize.h6,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: Colors.dark_color
  },

  // Work Summary
  workSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  counter: {
    flex: 1,
    width: '100%',
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  totalCount: {
    fontSize: Colors.FontSize.f56,
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    lineHeight: 62,
    color: Colors.white,
    textAlign: "center",
  },
  counterTxt: {
    fontSize: Colors.FontSize.f10,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: Colors.white,
    textAlign: "center",
    lineHeight: 13
  },
  hours: {
    fontSize: Colors.FontSize.f30,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.primary_color
  },
  text4: {
    fontSize: Colors.FontSize.f12,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: Colors.dark_color,
    textAlign: "center"
  },
  text5: {
    fontSize: Colors.FontSize.f10,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: Colors.dark_color,
    textAlign: "center"
  },
  text6: {
    fontSize: Colors.FontSize.f8,
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: Colors.dark_color,
    textAlign: "center"
  },

  //Team
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.gray400,
  },
  searchBar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray400,
    paddingBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    height: '100%',
    minHeight: Dimensions.get('window').height,
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.5)",
    width: '100%',
    alignItems: 'center',
    left: 0,
    minWidth: Dimensions.get('window').width,
    zIndex: 9999,
    top: 0,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 'auto',
    marginBottom: 0,
  },
  //Work order
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray400,
    paddingBottom: 5,
  },
  filterBox: {
    position: 'relative'
  },
  filterResult: {
    backgroundColor: Colors.dark_color,
    position: "absolute",
    left: -6,
    top: '100%',
    width: '100%',
    minHeight: '100%',
    borderRadius: 10,
    padding: 10
  },
  //Work order details
  threeColumnLayout: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  tabMenu: {
    backgroundColor: Colors.gray_color,
    textAlign: "center",
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 15
  },
  btnCircle: {
    padding: 10,
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: Colors.success_color,
  },
  icon3: {
    position: "relative",
    top: -2
  },
  btnSuccess: {
    backgroundColor: Colors.success_color,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  btnInfo: {
    backgroundColor: Colors.light_crystal_blue_disable,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  formgroup2: {
    flex: 1,
    marginBottom: 15
  },
  btnDark: {
    backgroundColor: Colors.dark_color,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnLightDanger: {
    backgroundColor: Colors.dangerLight,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnOutlinePrimary: {
    backgroundColor: Colors.dangerLight,
    borderRadius: 100,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnIcon: {
    width: 40,
    height: 40,
    borderRadius: 100, shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: Colors.errorColor,
    textAlign: "center",
    lineHeight: 40
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  galleryItem: {
    width: '40%',
    marginTop: 20,
    paddingHorizontal: 20
  },

  /*
  * Dashboard
  */
  scrollX: {
    width: 500,
  },
  cardGroup: {
    display: 'flex',
    flexWrap: "wrap",
    flexDirection: 'row',
    marginRight: -5,
    marginLeft: -5
  },
  cardStyle: {
    width: '47%',
    height: 65,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 20
  },
  cardStyle2: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: Colors.FontSize.f12,
    textAlign: 'center',
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },

  /* 
  * Jobsite Services
  */
  checkboxContainer: {
    alignItems: "center",
    flexDirection: 'row',
    marginBottom: 10
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 10,
  },
  ForBottomOfSCreen: {
    marginTop: 'auto',
    marginBottom: (Platform.OS === 'ios') ? 23 : 23,
  },
  notesBlock: {
    marginBottom: 1
  },
  cardWithBorder: {
    borderWidth: 0,
    borderColor: Colors.primary_color,
    borderStyle: "solid",
    borderRadius: 10,
    minHeight: 150,
    width: '46%',
    margin: 6,
    marginTop: 0,
    marginBottom: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: "white",
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primary_color
  },
  cardImageContaiiner: {
    marginBottom: 15,
  },
  cardImage: {
    width: 50,
    height: 50
  },
  cardImage2: {
    width: 'auto',
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  cardImage3: {
    width: 'auto',
    height: 180,
    borderRadius: 20
  },
  starRating: {
    display: 'flex',
    flexDirection: "row",
  },
  iconStar: {
    marginRight: 5,
    fontSize: Colors.FontSize.f16,
  },
  paymentMethod: {
    width: 120,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12
  },
  paymentSelected: {
    borderWidth: 1,
    borderColor: Colors.primary_color,
    borderStyle: "solid",
    shadowColor: 'transparent',
    shadowOpacity: .1
  },
  tabActive: {
    borderBottomColor: 'white', borderBottomWidth: 2,
  },
  disable: {
    opacity: 0.4
  },
  btnSmall: {
    borderRadius: 6, 
    paddingHorizontal: 10, 
    paddingVertical: 5
  },
  serviceCounter:{
    width:35,
    height:35,
    backgroundColor:Colors.danger100,
    borderRadius:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  bold:{
    fontFamily:'Poppins_700Bold'
  },
  semiBold:{
    fontFamily:'Poppins_600SemiBold'
  },
  medium:{
    fontFamily:'Poppins_500Medium'
  },
  regular:{
    fontFamily:'Poppins_400Regular'
  }
});

