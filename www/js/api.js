// var message = required("./utils")
// import message from './utils';

var ApiService = {
    
    fetchApi (url, options) {
        var message = require("./utils")
        
        let headers= {};
        // if content type is not defined
        if(!options['Content-Type'] && !(options['body'] instanceof FormData) ){
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
        
        return fetch(url,{
            ...options,
            headers
        })
        .then(message.checkStatus)
        .then((response) => response.json())

    }
}