const uniqid = require('uniqid');
let rooms = [];
let roomNo = 100;
let bookings = [];
let customers = [];
let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
let time_regex = /^(0[0-9]|1\d|2[0-3])\:(00)/;


const service = {

    createRoom(req,res){
        console.log("post method called");
        let room = {}
        room.id = uniqid();
        room.roomNo = roomNo;
        room.bookings = [];
        room.noOfSeats = req.body.noOfSeats;
        room.amenties = req.body.amenties;
        room.price = req.body.price;
        rooms.push(room);
        roomNo = roomNo + 1;
        res.send(rooms);
    },


    getRoom(req,res){
        console.log("Get Room Method Called")
        res.send(rooms);

    },

    bookRoom(req,res){
        console.log("Book Room Method Called");
        let booking = {};
        booking.id = uniqid();
        booking.roomNo = req.body.roomNo;
        booking.custName = req.body.custName;
        if(req.body.date){
            if (date_regex.test(req.body.date)) {
                booking.date = req.body.date
            } else{
                res.status(400).json({ output: 'Please specify date in MM/DD/YYYY'})
            }
        } else{
            res.status(400).json({ output: 'Please specify date for booking.'})
        }
    
        booking.startTime = req.body.startTime;
        booking.endTime = req.body.endTime;
        
       
    //     const availableRooms = rooms.filter(room => {
    //     if(room.bookings.length == 0){
    //         return true;
    //     } else{
    //         room.bookings.filter(book =>{
    //             if((book.date == req.body.date) ){
    //                 if((parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.startTime).substring(0, 1)) ) && 
    //                 (parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.endTime).substring(0, 1)) ) ){ 
    //                     if((parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.startTime).substring(0, 1)) ) && 
    //                       (parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.endTime).substring(0, 1)) ) ){ 
    //                         return true;
    //                     }
    //                 }
    //             }
    //             else{
    //                 return true;
    //             }
    //         })

    //     }
    // });
        let previsAvailable = 0;
        const availableRooms = rooms.filter(room => {
            if(room.bookings.length==0){
                console.log(room.bookings.length)
                return room;
            }
            else{
                console.log("else Part" , room.bookings.length , room)
                const isAvailable = room.bookings.filter(book => {
                    if((book.date == req.body.date)){
                        console.log("Same Date");
                        if((parseInt((book.startTime).substring(0, 2)) === parseInt((req.body.startTime).substring(0, 2)) ) && 
                            (parseInt((book.endTime).substring(0, 2)) === parseInt((req.body.endTime).substring(0, 2)) ))  {
                                        console.log(" All condition satisfied");  
                                        return true;                                              
                                    }
                            }
                    })
                    console.log(isAvailable);
                    if(isAvailable.length === 0){
                        return true;
                    }
                
            }
        })

        console.log("Available Rooms " , availableRooms);

  

        if(availableRooms.length === 0){
            res.status(400).json({output: "No Available Rooms on Selected Date and Time"})
        }
        else{
            booking.status = "Booked";
            bookings.push(booking);
            // const l = rooms.filter(room => room.roomNo === 100);
            // console.log(l);

            roomRec = availableRooms[0];
            let count = 0;
            //console.log(roomRec);
            rooms.forEach(ele => {
                if(ele.roomNo === roomRec.roomNo){
                    rooms[count].bookings.push({
                        custName : req.body.custName,
                        date: req.body.date,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,  
                    })
                }
                count = count + 1
            })
            res.status(200).json({output: "Room Booked Sucessfully"})
        }

        let customer = {
            "custorName" : booking.custName,
            "RoomName"   : booking.roomNo,
            "Date"       : booking.date,
            "Start Time" : booking.startTime,
            "End Time"   : booking.endTime
        }
        customers.push(customer);

    },

    getBookedRooms(req,res){
        console.log("Get Booked Room Method Called")
        res.send(bookings);

    },

    getBookedCustomers(req,res){

        console.log("Get Booked Customers Method Called")
        res.send(rooms[0].bookings);

    },



    //res.send(bookings);
   


}
module.exports = service;




// const availableRooms = rooms.filter(room => {
//     if(room.bookings.length == 0){
//         return true;
//     } else{
//         room.bookings.filter(book =>{
//             if((book.date == req.body.date) ){
//                 if((parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.startTime).substring(0, 1)) ) && 
//                 (parseInt((book.startTime).substring(0, 1)) > parseInt((req.body.endTime).substring(0, 1)) ) ){ 
//                     if((parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.startTime).substring(0, 1)) ) && 
//                       (parseInt((book.startTime).substring(0, 1)) < parseInt((req.body.endTime).substring(0, 1)) ) ){ 
//                         return true;
//                     }
//                 }
//             }
//             else{
//                 return true;
//             }
//         })

//     }
// });