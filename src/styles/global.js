import { StyleSheet,Dimensions } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    margin: 'auto',
  },
  articleContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:-30
  },
  accountContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  deviceContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    alignItems: 'center',
  },
  containerUnpressed: {
    opacity: 1,
  },
  containerPressed: {
    opacity: 0.5,
  },
  writeButtonPos:{
    position: 'absolute',
    left: '76%',
    top: '95%',
  },
  imagePickerButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  imagePickerButtonText:{
    fontSize: 16,
    color: 'black',
    alignSelf:'center',
    padding: 10,
    fontFamily: 'NotoSerifRegular'
  },
  publishButton:{
    backgroundColor: 'black',
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  publishButtonText:{
    fontSize: 20,
    color: 'white',
    alignSelf:'center',
    padding: 10,
    fontFamily: 'NotoSerifRegular'
  },
  header: {
    fontSize: 32,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10
  },
  publishSubHeader: {
    fontSize: 20,
    marginLeft: 20,
    margin: 15,
    fontFamily: 'NotoSerifRegular'
  },
  inputBoxArticleStyle:{
    backgroundColor: '#F9F9F9',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
  },
  inputBoxBodyStyle:{
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
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
  articleTitle:{
    fontSize: 26,
    marginBottom: 20,
    marginLeft: 10
  },
  articleBody: { 
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 50,
    lineHeight: 30
  },
  profileName: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 24,
  
  },
  tabHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  tabHeaderText: {
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  shadowProp: {
    shadowColor: '#75757560',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  bioText:{
    fontFamily:"NotoSerifRegular",
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12,
    marginBottom: 30,
    marginTop: 5
  }
});

export default globalStyles;
