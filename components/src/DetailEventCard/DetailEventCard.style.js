import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 3,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  title_adi: {
    fontWeight: "bold",
    fontSize: 25,
  },
  date_container: {
    flexDirection: "row",
    paddingTop: 30,
  },
  startDate: {
    fontSize: 16,
  },
  space: { fontSize: 16, paddingHorizontal: 5 },
  endDate: { fontSize: 16 },
  info_container: { paddingTop: 18 },
  descripTitle: {
    paddingBottom: 5,
    fontSize: 18,
  },
  infoTitle: {
    fontSize: 15,
    fontStyle: "italic",
  },
  map: {
    paddingTop: 20,
    flex: 0.6,
  },
  space_container: {
    flex: 0.1,
  },
  dropDownPicker: {
    width: 200,
    height: 40,
  },
  bottom_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownPicker_container: {
    flex: 1,
  },
  toplam: {
    flex: 1,
    alignItems: "center",
  },
});
