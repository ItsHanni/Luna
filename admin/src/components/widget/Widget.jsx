import { useState, useEffect } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

// Import API từ file api/stats.js
import { getUserStats, getBookingStats, getRevenueStats } from "../api/stats";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  const [data, setData] = useState(null); // Thêm state để lưu trữ dữ liệu widget

  // Fetch data khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        let stats;

        switch (type) {
          case "order":
            stats = await getBookingStats();
            setAmount(stats.orders); // Số đơn
            setDiff(stats.percentage); // Phần trăm thay đổi
            setData({
              title: "Đơn",
              isMoney: false,
              link: "View all orders",
              icon: (
                <ShoppingCartOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                  }}
                />
              ),
            });
            break;
          case "earning":
            stats = await getRevenueStats();
            setAmount(stats.totalRevenue); // Doanh thu
            setDiff(stats.percentage); // Phần trăm thay đổi
            setData({
              title: "Tổng tiền",
              isMoney: true,
              link: "View net earnings",
              icon: (
                <MonetizationOnOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    color: "green",
                  }}
                />
              ),
            });
            break;
          default:
            break;
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchData();
  }, [type]); // Khi `type` thay đổi, gọi lại API tương ứng

  if (!data) {
    return <div>Loading...</div>; // Hiển thị loading nếu dữ liệu chưa được lấy xong
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
