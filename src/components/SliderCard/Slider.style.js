import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    margin: 10,
    paddingTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    flex: 1,
    paddingBottom:1
  },
  topTitle: {
    fontSize: 18,
    paddingLeft: 10,
  },
  slider_container: {
    flex: 0.4,
    backgroundColor: "white",
    marginHorizontal: 7,
    borderRadius: 10,
  },
  upper_container: {
    padding: 10,
    backgroundColor:"white"
   
  },
  banner_image: {
    height: windowHeight / 5.1,
    width: windowWidth / 1.09,
    borderRadius: 10,
    alignSelf: "center",
  },
  bottom_container: {
    backgroundColor: "#f2f2f2",
    paddingTop: 12,
    paddingLeft: 14,
    justifyContent: "space-between", // Dikeyde eşit aralıklı düzen
    flex: 1,
    
  },
  time_container: {
    flexDirection: "row",
  },
  startDate: {
    color: "#262627",
  },
  iconContainer: {
    paddingBottom:15,
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  icon: {
    marginHorizontal: 5,
  },
  nameTitle:{
    fontSize:25,
    fontStyle:"normal",
    fontWeight:"bold",
  },
  lokasyonTitle:{
    fontSize:16,
    fontStyle:"normal",
  }

});
