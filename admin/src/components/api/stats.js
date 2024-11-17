import axios from "axios";

// Lấy số liệu booking
export const getBookingStats = async () => {
  try {
    const res = await axios.get("/api/bookings/bookingstats");  // Đảm bảo đường dẫn API đúng với backend
    return res.data;
  } catch (err) {
    console.error("Error fetching booking stats:", err);
    throw err;
  }
};

// Lấy số liệu doanh thu
export const getRevenueStats = async () => {
  try {
    const res = await axios.get("/api/bookings/revenue");  // Đảm bảo đường dẫn API đúng với backend
    return res.data;
  } catch (err) {
    console.error("Error fetching revenue stats:", err);
    throw err;
  }
};
