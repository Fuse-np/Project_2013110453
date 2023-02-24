module.exports = (err, req, res, next) =>  {

    const statusCode = err.statusCode || 500
  if (err.validation){
    
    res.status(statusCode).json({ 
        status_code: statusCode, 
        message: err.message ,
        validation:err.validation
    });
  }
  else{
    res.status(statusCode).json({ 
        status_code: statusCode, 
        message: err.message 
    });
  }
};
