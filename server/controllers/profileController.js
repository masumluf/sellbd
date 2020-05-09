const User = require('../model/userModel')


// get user profile
const getProfile = async (req, res, next) => {
    try {
      const {id} = req.cookies.mycookie.user
      const user = await User.findById({ _id: id }).select('-password').select('-verificationCode')
      res.json(user)
    } catch (err) {
      console.log(err.message)
    }
}

// update user phone
const updatePhone = async(req, res) => {
    try {
        const {id} = req.cookies.mycookie.user
        const {phone} = req.body
        if(!phone){
            return res.json({
                 msg: 'please provide a phone number'
             })
         }
         
         const user = await User.findById({_id: id})
         user.phone = phone;
         await user.save();
         res.json({
             msg: 'Phone updated'
         })
    } catch (err) {
        console.log(err.message)
    }
}

// update user profile



  module.exports = {getProfile, updatePhone}