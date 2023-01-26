const db = require('./firebaseConfig')

//Connect to specific collection
const postsDb = db.collection('posts')

const getPosts = async() => {
  const posts = await postsDb.get();
  return posts 
}

const getLatestPostID = async() => {
  let postCount = 0;
  let posts = await postsDb.get(); 
  posts.forEach(doc => {
    postCount += 1;
  });
  return postCount + 1
}

const createPost = async(header,body,author) => {
  let postID = getLatestPostID()
  postID.then(async(result) => {
    await postsDb.doc(result.toString()).set({
      header: header,
      body: body,
      author: author
    });
  })
}

//Writing a Post

//createPost("Looking beyond borders","Product management breakout fastworks upstream selling, for we need to dialog around your choice of work attire, so this is not the hill i want to die on, but back to the drawing-board. Productize. Optimize the fireball cloud native container based, but a better understanding of usage can aid in prioritizing future efforts. Screw the pooch pull in ten extra bodies to help roll the tortoise organic growth, for we need to aspirationalise our offerings. Prairie dogging gage [sic] where the industry is heading and give back to the community what weâ€™ve learned we need more paper vertical integration please advise soonest call in the air support. Agile slipstream, for we have put the apim bol, temporarily so that we can later put the monitors on. Draw a line in the sand. Back of the net pass the mayo, appeal to the client, sue the vice president . Who's responsible for the ask for this request? hit the ground running, or throughput knowledge is power, for game-plan, nor reach out. This is not a video game, this is a meeting! optimize for search let's prioritize the low-hanging fruit wiggle room. That ipo will be a game-changer turd polishing i called the it department about that ransomware because of the old antivirus, but he said that we were using avast 2021 where do we stand on the latest client ask, for sorry i didn't get your email feed the algorithm. That ipo will be a game-changer future-proof we need to leverage our synergies we have to leverage up the messaging. Cannibalize level the playing field radical candor nail it down out of scope. Ultimate measure of success even dead cats bounce, for code, upsell this is our north star design.",1)

//Getting Posts 
const posts = getPosts();
posts.then((result) => {
  console.log(result._docs)
})



module.exports = {
  createPost,
  getLatestPostID
}

