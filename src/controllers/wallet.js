const modWallet = require("../models/modWalet");
const connection = require("../configurasi/connectDB");
const helpers = require("../helper/help")



//POST
const createData = async (req, res, next) => {
    try {
      const { name, user_id, ballance } = req.body;
      const data = {
        name,
        user_id,
        ballance
      };
      const result = await modWallet.createData(data);
      res.json({
        result: result,
      });
    } catch (error) {
      console.log(error);
      const err = new createError.InternalServerError()
      next(err)
    }
  };

//GET
const findData = async (req, res, next) => {
    try {
      const result = await modWallet.findData()
      helpers.response(res,result,200)
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }
  };

//PUT atau Upadate data
const updateData = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, user_id, ballance } = req.body;
      const data = {
        name,
        user_id,
        ballance
      };
      const result = await modWallet.updateData(data, id);
      res.json({
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }
  };

//DELETE
const deleteData = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const result = await modWallet.deleteData(id);
      res.json({
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }
  };

//GET DETAIL
const detailData = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const result = await modWallet.detailData(id);
      res.json({
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }
  };
  

module.exports={
    createData,
    findData,
    updateData,
    deleteData,
    detailData
}