const bcrypt = require('bcrypt');
const { authdetail , userdetail } = require("../constant/constant");
const User = require("../models/users");
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
try {
   const { email , password }  = req.body;
   
   let user = await User.findOne({
    where: {
        email: email
    }
   });

   if(!user){
    return res.status(400).json({message: authdetail.AUTH_FAIL})
   }

 const passwordMatch = await bcrypt.compare(password, user.password);

 const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

 if(!token){
    return res.status(400).json({message: authdetail.TOKEN_FAILED});
 }
  
 delete user.dataValues['password'];
 delete user.dataValues['age'];
 delete user.dataValues['address'];
 return res.status(200).json({ token, user }); 

} catch (error) {
  console.log("error in signin function", error) 
  return res.status(500).json({ error: authdetail.LOGIN_FAILED });
}
};

const signUp = async (req, res) => {
    try {
        console.log('signup function', req.body);
        const { username, password, email } = req.body;

        if (!password || !username || !email) {
            return res.status(401).json({ message: authdetail.MISSING_SIGNUP_DETAILS });
        }

        const hasspassword = await bcrypt.hash(password, 10);

        if (!hasspassword) {
            return res.status(401).json({
                "message": authdetail.HASSING_INCOMPLETE
            });
        }
        //check user already exist 
        const ifuserexist =await User.findOne({
            where: {
                email: email,
                name: username
            },
        });

        if(ifuserexist){
          return res.status(409).json({message: userdetail.USER_EXISTS});
        }

        const user = await User.create({ name: username, email: email, password: hasspassword });

        return user ? res.status(201).json({ message: userdetail.USER_CREATED }) : res.status(400).json({ message: userdetail.USER_NOTCREATED });
    } catch (error) {
        console.log('error in signup function', error);
        return  res.status(500).json({ error: authdetail.FAILED_SIGNUP });

    }
}

module.exports = {
    signIn,
    signUp
}