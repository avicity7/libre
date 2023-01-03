import { StyleSheet,Dimensions } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
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
  publishButton:{
    backgroundColor: "black",
  }
});

export default globalStyles;
