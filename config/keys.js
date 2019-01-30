if(proccess.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    // faz a requisição do objeto que contem as chaves de dev, e exporta ele imediatamente.
    module.exports = require('./dev');
}