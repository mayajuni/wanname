/**
 * Created by 동준 on 2015-06-30.
 */
var errorMsg = require("../../property");

exports.setAndValdate = function(req, next, objectVO, errStatus){
    var params = req.query;
    var method = req.method;
    if(method == "POST" || method == 'PUT'){
        params = req.body;
    }

    for(var key in objectVO) {
        if(!!objectVO[key].validate) {
            var notCheck = false;

            if((!objectVO[key].method || !!objectVO[key].method && (objectVO[key].method.toUpperCase().indexOf(method.toUpperCase()) > -1))){
                if(!!objectVO[key].checkURL){
                    for(var i=0;i<objectVO[key].checkURL.length;i++){
                        if(objectVO[key].checkURL[i].substr(0,1) == '!') {
                            if(req.originalUrl == objectVO[key].checkURL[i].replace('!', '') || req.originalUrl == objectVO[key].checkURL[i].replace('!', '') + '/') {
                                notCheck = true;
                                break;
                            }
                        }else  if(objectVO[key].checkURL[i].substr(0,1) != '!') {
                            if(!(req.originalUrl == objectVO[key].checkURL[i] || req.originalUrl == objectVO[key].checkURL[i] + '/')) {
                                notCheck = true;
                                break;
                            }
                        }
                    }
                }

                if(!notCheck && (!params[key] && !req.params[key])){
                    var msg = !errorMsg[key] ? "Check " + key : errorMsg[key];
                    var err = new Error(msg);
                    err.status = !errStatus ? 409 : errStatus;
                    throw err;
                }
            }
        }

        if(!!params[key] || !!req.params[key]){
            objectVO[key] = !params[key] ? req.params[key] : params[key];
        }else if(!!objectVO[key].default && !params[key] && !req.params[key] && method != 'GET'){
            objectVO[key] = objectVO[key].default;
        }else{
            delete objectVO[key];
        }
    }
    next();
};