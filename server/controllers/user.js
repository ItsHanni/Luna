import { Error } from "mongoose";
import User from "../models/User.js";
import crypto from "crypto";
import asyncHandler from "express-async-handler"; 
import { createError } from "../utils/error.js";  // Đảm bảo đường dẫn đúng


export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export const getRole = async (req, res, next) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}


///////lấy mã
// client gửi email
//server check email có hợp lệ không => gửi mail kèm link
//client check mail => clieck link
//client gửi api kèm token
//server check token

// export const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body; // Kiểm tra xem bạn đang lấy email từ đâu
//   if (!email) throw new Error('Missing email');
  
//   const user = await User.findOne({ email });
//   if (!user) throw new Error('User not found');
  
//   const resetToken = user.createPasswordChangedToken();
//   await user.save();

//   const html = Xin hãy Click vào link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 2 phút: 
//     <a href="${process.env.URL_SERVER}/api/users/reset-password/${resetToken}">Click vào đây</a>;
  
//   const data = {
//     email,
//     html,
//     subject: 'Forgot password',
//   };

//   const rs = await sendMail(data);
//   return res.status(200).json({
//     success: true,
//     mes: rs.response?.includes('OK') ? 'Hãy check mail của bạn' : 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
//   });
// });



// export const resetPassword = asyncHandler(async (req,res) => {
//   const {password,token}= req.body
//   console.log({ password, token });
//   if (!password || !token)throw new Error ('Missing inputs')
//   const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
//   const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now}})
//   if (!user) throw new Error('Invalid reset token')
//   user.password = password
//   user.passwordResetToken=undefined
//   user.passwordChangedAt=Date.now()
//   user.passwordResetExpires=undefined
//   await user.save()
//   return res.status(200).json({
//     success: user ? true : false,
//     mes: user ? 'Updated password' : 'Something went wrong'
//   })
// })


// Thêm khách sạn vào wishlist
export const addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid); // Lấy thông tin người dùng
    const hotelId = req.params.hotelId;

    // Khởi tạo wishlist nếu chưa có
    if (!user.wishlist) {
      user.wishlist = []; // Khởi tạo wishlist rỗng nếu không tồn tại
    }

    // Thêm khách sạn vào danh sách yêu thích nếu chưa có
    if (!user.wishlist.includes(hotelId)) {
      user.wishlist.push(hotelId);
      await user.save();
      res.status(200).json("Hotel added to wishlist");
    } else {
      return next(createError(400, "Hotel already in wishlist"));
    }
  } catch (err) {
    return next(createError(500, err.message)); // Lỗi server
  }
};

// Xóa khách sạn khỏi wishlist
export const removeFromWishlist = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const hotelId = req.params.hotelId;

        const user = await User.findById(userId);
        user.wishlist = user.wishlist.filter(id => id.toString() !== hotelId);
        await user.save();

        res.status(200).json({ message: "Hotel removed from wishlist successfully" });
    } catch (err) {
        next(err);
    }
};

// Lấy danh sách wishlist của user
export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate("wishlist");
        res.status(200).json(user.wishlist);
    } catch (err) {
        next(err);
    }
};


//////////
export const userStats = async (req, res, next) => {
  try {
    // Lấy tổng số người dùng trong cơ sở dữ liệu
    const users = await User.countDocuments();

    // Trả về kết quả tổng số người dùng dưới dạng JSON mà không cần xác nhận
    res.status(200).json({
      success: true,
      users, // Tổng số người dùng
    });
  } catch (err) {
    next(err); // Xử lý lỗi nếu có
  }
};
