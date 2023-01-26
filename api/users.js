const db = require('./firebaseConfig')

//Connect to specific collection
const usersDb = db.collection('users')

const createUser = async(userID,firstName,lastName,username) => {
    await usersDb.doc(userID).set({
      firstName: firstName, 
      lastName: lastName,
      username: username
    });
}

const getLatestUserID = async() => {
    let userCount = 0
    let users = await usersDb.get(); 
    users.forEach(doc => {
        userCount += 1;
    });
    return userCount
}

const createUserWithDetails = async (firstName,lastName,username) => {
    let assignedId = 0;
    let latestUserID = getLatestUserID();
    latestUserID.then((result)=>{ 
        assignedId = parseInt(result) + 1;
        createUser(assignedId.toString(),firstName,lastName,username);
        console.log(assignedId);
    })
}

//Creating a User with First Name, Last Name and Username. 
createUserWithDetails("The","fourth","thefourth")

module.exports = createUserWithDetails