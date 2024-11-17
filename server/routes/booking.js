import express from "express";
import { 
  bookRoom, 
  updateBookingStatus, 
  getAllBookings, 
  getUserBookingHistory, 
  getHostBookings, 
  deleteBooking, 
  cancelBooking,
} from "../controllers/booking.js";
import { verifyToken, verifyHost } from "../utils/verifyToken.js";

const router = express.Router();

// Đặt phòng
router.post("/", verifyToken, bookRoom); // Kiểm tra quyền token

// Lấy lịch sử đặt phòng của người dùng
router.get("/history", verifyToken, getUserBookingHistory); // Kiểm tra quyền token

// Lấy danh sách đặt phòng của host
router.get("/host", verifyHost, getHostBookings); // Kiểm tra quyền host

// Xóa đặt phòng
router.delete("/:id", verifyToken, deleteBooking); // Kiểm tra quyền token

// Hủy đặt phòng
router.put("/cancel/:id", verifyToken, cancelBooking); // Kiểm tra quyền token

// Cập nhật trạng thái đặt phòng
router.put("/:id/status", verifyToken, updateBookingStatus); // Kiểm tra quyền token

// Lấy tất cả thông tin đặt phòng
router.get("/", verifyToken, getAllBookings); // Kiểm tra quyền token

export default router;
