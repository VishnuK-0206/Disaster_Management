const express=require('express')
const router=express.Router()
const safeplaces=require('../models/safe')
const axios=require('axios')
const geolib=require('geolib')
const geolocation = require('geolocation-utils');
router.post('/add',async(req,res,next)=>
{
    const safe=new safeplaces({
        Name:req.body.Name,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    })
    let object
    try
    {
        object=await safeplaces.create(safe)
    }
    catch(error)
    {
        console.log(error)
    }
    if(object)
    {
        return res.status(200).json({object})
    }
    return res.status(500).json({message:"couldn't add the place"})
})
router.delete('/delete/:name',async(req,res,next)=>
{
    const{name}=req.params
    try
    {
        const object=await safeplaces.findOneAndDelete({name})
    }
    catch(error)
    {
        console.log(error)
    }
    if(!object)
    {
        return res.status(500).json({message:"couldn't delete the requested place"})
    }
    return res.status(200).json({message:"successfully deleted"})

})
router.get('/help', async (req, res, next) => {
    // Get user's latitude and longitude from the query parameters
    const { latitude, longitude } = req.query;
    console.log(latitude);
  
    // Calculate distance function (using geolib)
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const distance = geolib.getDistance(
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 }
      );
      return distance / 1000; // Convert meters to kilometers
    }
  
    try {
      // Fetch all safe places from the MongoDB collection
      const allSafePlaces = await safeplaces.find({});
  
      // Specify the radius in kilometers
      const radius = 5; // 10km radius (you can adjust as needed)
  
      // Filter safe places within the specified radius
      const nearbySafePlaces = allSafePlaces.filter((place) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          place.latitude,
          place.longitude
        );
        return distance <= radius;
      });
  
      // Send the list of nearby safe places as a JSON response
      res.status(200).json({ userLocation: { latitude, longitude }, nearbySafePlaces });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching safe places.' });
    }
  });
  module.exports=router
  