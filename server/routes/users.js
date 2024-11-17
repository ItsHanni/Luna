import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getRole,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  userStats // Thống kê người dùng
} from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);
router.get("/role/:role", verifyToken, getRole); // Kiểm tra quyền token thay vì admin

//GET ALL
router.get("/", verifyToken, getUsers); // Kiểm tra quyền token thay vì admin

// Thêm khách sạn vào wishlist
router.put("/wishlist/:userid/:hotelId", addToWishlist);

// Xóa khách sạn khỏi wishlist
router.delete("/wishlist/:hotelId", removeFromWishlist);

// Lấy danh sách wishlist của user
router.get("/wishlist", getWishlist);


export default router;
