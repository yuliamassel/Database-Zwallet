const myConsole = (req, res, next) => {
    console.log('ini middleware');
    next()
  }
  
  module.exports = {
    myConsole
  }