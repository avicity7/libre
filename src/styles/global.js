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
    left : 320,
    bottom: 650,

  },
  backButton:{
    position: 'absolute',
    right: 320,
    bottom: 650,
  }
});

export default globalStyles;
