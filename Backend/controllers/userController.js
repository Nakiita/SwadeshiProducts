const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middleware/sendMail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  // step 1 : Check if data is coming or not
  console.log(req.body);

  // step 2 : Destructure the data
  const { UserName, email, phoneNumber, password, confirmPassword } = req.body;

  // step 3 : validate the incomming data
  if (!UserName || !email || !phoneNumber || !password || !confirmPassword) {
    return res.json({
      success: false,
      message: "Please enter all the fields.",
    });
  }

  // step 4 : try catch block
  try {
    // step 5 : Check existing user
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    // password encryption
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    // step 6 : create new user
    const newUser = new Users({
      // fieldname : incomming data name
      UserName: UserName,
      email: email,
      phoneNumber: phoneNumber,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });

    // step 7 : save user and response
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};
// const verifyMail = async (req, res) => {
//   try {
//     console.log("Verify Mail Request Params:", req.params); // Check the request parameters
//     const updateInfo = await Users.updateOne(
//       {
//         _id: req.params.id,
//       },
//       {
//         $set: { is_verified: 1 },
//       }
//     );
//     console.log("Update Info:", updateInfo); // Check the update info
//     res.status(200).json({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Verify Mail Error:", error); // Check the error message
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
const loginUser = async (req, res) => {
  // step 1: Check incomming data
  console.log(req.body);

  // destructuring
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }
  // try catch block
  try {
    // finding user
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists.",
      });
    }
    // Comparing password
    const databasePassword = user.password;
    const isMatched = await bcrypt.compare(password, databasePassword);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    // generate token token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // response
    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email not found.",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    // Assuming you have a configuration variable for the frontend URL
    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetUrl = `${frontendBaseUrl}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    const newPassword = await securePassword(req.body.password);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
}