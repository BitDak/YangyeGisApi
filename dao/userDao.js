var mysql = require('mysql');

var mysqlConf = require('../conf/mysqlConf');
var userSqlMap = require('./userSqlMap');
var pool = mysql.createPool(mysqlConf.mysql);

module.exports = {  //将add，list，getByID等都暴露到被引用的module
    tbFieldSum: function (callback) {
        pool.query(userSqlMap.tbFieldSum, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    tbStationSum: function (callback) {
        pool.query(userSqlMap.tbStationSum, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    tbFieldsArea: function (callback) {
        pool.query(userSqlMap.tbFieldsArea, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    tbFields: function (createUser, createUser, pageStart, pageSize, callback) {
        pool.query(userSqlMap.tbFields, [createUser, createUser, pageStart, pageSize], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    tbField: function (mapLng, mapLat, callback) {
        pool.query(userSqlMap.tbField, [mapLng, mapLat], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    Dept: function (callback) {
        pool.query(userSqlMap.Dept, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    users: function (Dept, callback) {
        pool.query(userSqlMap.users, Dept, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    totalRecord: function (createUser, callback) {
        pool.query(userSqlMap.totalRecord, createUser, function (error, result) {
            if (error) throw error;
            var r = result[0].totalRecord;   //非常重要的是：此处的totalRecord指的是select count(*) as totalRecord中的
            //console.log(r);
            callback(r);
        });
    },
};