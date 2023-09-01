import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 18,
    flexDirection: "row",
    backgroundColor:"#ffffff"
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#ffffff"
  },
  inner_container: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
  },
  startDate: {
    color: "#262627",
  },
  space: {
    color: "#262627",
    paddingLeft: 5,
  },
  endDate: {
    color: "#262627",
    paddingLeft: 5,
  },
  eventName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  location_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: "#262627",
    fontSize: 14,
    marginLeft: 2,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 5,
  },
  place_container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  placeText: {
    fontSize: 14,
  },
  mapo_icon: {
    marginHorizontal: 3,
  },
});
