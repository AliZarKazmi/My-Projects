/** */

//check username and password in post(login) request
//if both exist then create new JWT
//send back to front-end

//setup authentication so only the request with JWT can be access the dashboard

/** */

/** */
    // 3 ways for server side validation
    // Mongoose validaiton
    // Joi package
    // checks in the controller
/** */

//"Payload" basically contains the data of the user i.e id, name , email etc



const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken")



const login = async (req, res) => {
  const { username, password } = req.body;

  //check in the controller
  if (!username || password) {
    throw new CustomAPIError("Please provide email and password",400)
  }
//creating JWT tokken

//just for demo , normally provided by DB!!!!
const id = new Date().getDate()

//try to keep your payload small, better experience for user
//first parameter is payload where we pass anything except the confidential data like password etc, 
//second parameter is "jwt secrect"
// Note in production your "JWT_SECURITY" value should be long, complex and unguessable string value!!
const token = jwt.sign({id, username},process.env.JWT_SECURITY, {expiresIn:'30d'}) 

res.status(200).json({msg:'user created',token})


//   console.log(username, password);
//   res.send("Fake Login/Register/SignUp Route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, Ali Zar Kazmi`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
