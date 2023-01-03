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
  publishButton:{
    backgroundColor: "black",
    borderRadius: "15%"
  },
  publishButtonText:{
    fontSize: 20,
    color: "white",
    alignSelf:"center",
    padding: 10,
  },
  header: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 10
  },
  publishSubHeader: {
    fontSize: 20,
    marginLeft: 20,
    margin: 15,
  },
  inputBoxArticleStyle:{
    backgroundColor: "#F9F9F9",
    borderRadius: "50%",
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
  },
  inputBoxBodyStyle:{
    backgroundColor: "#F9F9F9",
    borderRadius: "20%",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 10,
    padding:10,
    height:180,
  },
  articleDetails: { 
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 50
  },
  articleBody: { 
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 50,
    lineHeight: 30
  }
});

export default globalStyles;
