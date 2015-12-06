/**
 * Created by 동준 on 2014-06-23.
 */
var moment = require('moment');

/**
 * 현재 날짜 가져오기.
 * @returns
 */
exports.nowDate = function(format){
	return moment().format(format);
};

/**
 * change format
 *
 * @param date : string
 * @param format : string
 */
exports.changeFormat = function(date, format){
	return moment(date).format(format);
};

/**
 * addMonth
 *
 * @param date String
 * @param index index
 * @returns {*|Object|ServerResponse}
 */
exports.addMonth = function(date, index, format){
	return moment(date).add(index, 'M').format(format);
};

/**
 * add day
 *
 * @param date
 * @param index
 * @returns {*|Object|ServerResponse}
 */
exports.addDay = function(date, index, format){
	return Moment(date).add(index, 'd').format(format);
};