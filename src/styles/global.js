import { StyleSheet } from "react-native";

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
    width: 30,
    height: 30,
    left: 140,
    bottom: 290,
    shadowColor: "grey",
    
  },
});

export default globalStyles;
