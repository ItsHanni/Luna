import paymentService from "../service/paymentService.js";

const paymentController = {
  createPayment: async (req, res) => {
    try {
      const rs = await paymentService.createPayment(req.body);
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;
