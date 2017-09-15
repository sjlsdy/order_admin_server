var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			var cm = 0;
			// 查询重名
			connection.query($sql.queryByUserName, [param.userName], function(err, result) {
				if(result)
					if(result.length > 0)
						cm++;
				// 新增数据
				if(cm == 0) {
					connection.query($sql.insert, [param.userName, param.passWord], function(err, result) {
						if(result) {
							result = {
								code: 200,
								msg: '新增系统用户增加成功'
							};
						}
						jsonWrite(res, result);
						connection.release();
					});
				} else {
					result = {
						code: 1,
						msg: '系统用户重名'
					};
					jsonWrite(res, result);
					connection.release();
				}
			});
		});
	}
};