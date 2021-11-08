const router = require('express').Router();

const roomService = require('../services/room.server')



router.get("/", (req,res) => {
    res.send("Api worked");
})



router.post("/room", roomService.createRoom);

router.get("/getAllRooms" , roomService.getRoom);

router.post("/bookRoom", roomService.bookRoom);

router.get("/getBookedRooms" , roomService.getBookedRooms);

router.get("/getBookedCustomers" , roomService.getBookedCustomers);

module.exports = router;