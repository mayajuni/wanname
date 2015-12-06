/**
 * Created by 동준 on 2015-04-20.
 */
/**
 * error throw
 *
 * @param status
 * @param msg
 */
exports.throw = function(status, msg){
    var err = new Error(msg);
    err.status = status;
    throw err;
};

