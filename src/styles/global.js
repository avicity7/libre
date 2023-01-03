import { StyleSheet,Dimensions } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    margin: "auto",
  },
  deviceContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    alignItems: "center",
  },
  containerUnpressed: {
    opacity: 1,
  },
  containerPressed: {
    opacity: 0.5,
  },
  likeButton:{
    position: 'absolute',
    left : "85%",
    bottom: "90%",

  },
  backButton:{
    position: 'absolute',
    right: "85%",
    bottom: "90%",
  },
  writeButtonPos:{
    position: "absolute",
    left: "80%",
    top: "85%",
  },
  header: {
    fontSize: 32,
    marginTop: 75,
    marginBottom: 100,
    marginLeft: 10

  }
});

export default globalStyles;
