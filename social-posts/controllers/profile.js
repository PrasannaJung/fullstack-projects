async function getUserProfile(req, res) {
  return res.render("userProfile");
  // try {
  //   console.log(user);
  // } catch (e) {
  //   console.log(e.message);
  // }
}

module.exports = {
  getUserProfile,
};
