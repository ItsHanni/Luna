import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getAllHotels,
  getHotelCities,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin,verifyHost} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", verifyHost, updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL
router.get("/cities", getHotelCities);

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/all", getAllHotels);

export default router;