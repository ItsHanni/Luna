import React, { useContext } from "react"; 
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import './hostBookings.css'; 
import useFetch from "../../../hooks/useFetch"; 
import SideBar from "../../../components/sidebar/SideBar"; 
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

const HostBookings = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error, reFetch } = useFetch(`${import.meta.env.PORT}/api/bookings`);

  if (!user) {
    return <p className="no-bookings">Vui lòng đăng nhập để xem danh sách đặt phòng.</p>;
  }

  if (loading) return <p className="loader">Đang tải...</p>;
  if (error) return <p className="no-bookings">Đã xảy ra lỗi: {error.message}</p>;

  const handleApprove = async (bookingId) => {
    try {
      await axios.put(`${import.meta.env.PORT}/api/bookings/${bookingId}/status`, {
        status: 'confirmed',
      });
      toast.success("Đơn đặt phòng đã được xác nhận!");
      reFetch(); // Gọi lại để cập nhật dữ liệu
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.message);
    }
  };
  
  const handleReject = async (bookingId) => {
    try {
      await axios.put(`${import.meta.env.PORT}/api/bookings/${bookingId}/status`, {
        status: 'rejected',
      });
      toast.success("Đơn đặt phòng đã bị từ chối!");
      reFetch(); // Gọi lại để cập nhật dữ liệu
    } catch (error) {
      toast.error("Đã xảy ra lỗi: " + error.message);
    }
  };

  const handleCheckIn = async (bookingId) => {
    // Gọi API để cập nhật trạng thái check-in nếu cần
    // Chưa có logic cụ thể trong yêu cầu này
  };

  const handleCheckOut = async (bookingId) => {
    // Gọi API để cập nhật trạng thái check-out nếu cần
    // Chưa có logic cụ thể trong yêu cầu này
  };

  return (
    <div className="host-bookings-page">
      <SideBar />
      <div className="host-bookings-container">
        <h2>Danh sách đặt phòng của bạn</h2>
        {data.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Khách sạn</th>
                <th>Phòng</th>
                <th>Người đặt</th>
                <th>Ngày nhận phòng</th>
                <th>Ngày trả phòng</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.hotelId ? booking.hotelId.name : 'N/A'}</td>
                  <td>{booking.roomId ? booking.roomId.title : 'N/A'}</td>
                  <td>{booking.userId ? booking.userId.username : 'N/A'}</td>
                  <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className={`status ${booking.status}`}>{booking.status}</td>
                  <td>
                    {booking.status === "waitingConfirmation" && (
                      <>
                        <button className="duyet-button"onClick={() => handleApprove(booking._id)}>Duyệt</button>
                        <button className="rejected-button"onClick={() => handleReject(booking._id)}>Từ chối</button>
                      </>
                    )}
                    {booking.status === "paid" && (
                      <button onClick={() => handleCheckIn(booking._id)}>Check-In</button>
                    )}
                    {booking.status === "checkIn" && (
                      <button onClick={() => handleCheckOut(booking._id)}>Check-Out</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-bookings">Không có đặt phòng nào.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default HostBookings;
