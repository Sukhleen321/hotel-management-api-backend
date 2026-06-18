const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem')

router.post('/', async (req,res)=>{
    try{
        const data = req.body 
        const newMenu = new MenuItem(data);

        const response = await newMenu.save(); 
     
        console.log('Menu data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})
router.get('/', async (req, res) => {
   try {
      const menuitems = await MenuItem.find();

      res.json(menuitems);
   } 
   catch (error) {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});
router.get('/:taste', async (req,res) =>{
    try{

        
    }catch(err){
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id; 
        const updatedMenuData = req.body; 

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;