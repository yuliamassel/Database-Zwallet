const handleUrl = (req, res, next) => {
    res.status(404)
    res.json({
      message: 'url not found'
    })
  }

  const response = (res,result,status,error)=>{
    res.status(status).json({
      status : 'Succes',
      code : status,
      data: result,
      message : 'Data berhasil ditambahakan'
    })
  }


  module.exports= {
      handleUrl,
      response
  }