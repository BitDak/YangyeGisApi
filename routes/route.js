var express = require('express');
var https = require('https')
var fs = require('fs');
var router = express.Router();

var userDAO = require('../dao/userDao');

var authIs = false;     //初始化鉴权结果为:false

// 初始化已注册在Apikey.json中的Apikey
var Apikey = {};
fs.readFile('./Apikey/Apikey.json', function (err, data, callback) {
    if (err) {
        console.error(err);
    };
    //callback = data;      待删除行
    Apikey = JSON.parse(data.toString());  //Buffer转换成字符串再转换成json
    callback = Apikey;
});

//服务器控制台反馈：Api to use for all requests
router.use(function (req, res, next) {
    authIs = false;
    //鉴权。鉴权结果authIs=trun时将用于实现GET PUT POST DELETE PACTH
    var auth = req.headers.authorization;
    //console.log(auth);   //根据运行需要决定，服务器是否打开此监控
    for (var i = 0; i < Apikey.length; i++) {
        if (Apikey[i].Apikey == auth) {
            authIs = true;
        };
    };
    //监控客户端ip地址
    var get_client_ip = function (req) {
        var ip = req.headers['x-forwarded-for'] ||
            req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress || '';
        if (ip.split(',').length > 0) {
            ip = ip.split(',')[0]
        }
        return ip;
    };
    let ip = get_client_ip(req).match(/\d+.\d+.\d+.\d+/);
    console.log(ip);
    next(); // make sure we go to the next routes and don't stop here
});

//服务器控制台反馈：GET home page
router.get('/', function (req, res, next) {
    res.json({ message: 'Hello! welcome to our api!' });
});

// 接口方法 GET tbFieldSum
router.get('/tbFieldSum', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    console.log('GET tbFieldSum called.');
    userDAO.tbFieldSum(function (data) {
        res.json(data);
    });
});

// 接口方法 GET tbStationSum
router.get('/tbStationSum', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    console.log('GET tbStationSum called.');
    userDAO.tbStationSum(function (data) {
        res.json(data);
    });
});

// 接口方法 GET tbFieldsArea
router.get('/tbFieldsArea', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    console.log('GET tbStationSum called.');
    userDAO.tbFieldsArea(function (data) {
        res.json(data);
    });
});

// 接口方法 GET tbFields
router.get('/tbFields', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    if (req.query.page == undefined | req.query.pageSize == undefined | req.query.createUser == undefined) {
        var result = {};
        result.GET = 'createUser|page|pageSize is undefined.';
        res.json(result);
        return next();
    };
    var page = Number(req.query.page);
    var pageSize = Number(req.query.pageSize);
    var pageStart = (page - 1) * pageSize;
    var createUser = (req.query.createUser);
    //console.log(createUser);
    userDAO.totalRecord(createUser, function (val) {
        var totalRecord = val;
        //console.log(totalRecord);
        console.log('GET tbFields called');
        var totalPage = Math.floor((totalRecord + pageSize - 1) / pageSize);
        userDAO.tbFields(createUser, createUser, pageStart, pageSize, function (data) {
            var result = {};
            //console.log(data);
            result.page = page;
            result.pageSize = pageSize;
            result.totalRecord = totalRecord;
            result.totalPage = totalPage;
            result.data = data;
            res.json(result);
        });
    });
});

// 接口方法 GET tbField
router.get('/tbField', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    if (req.query.mapLng == undefined | req.query.mapLat == undefined) {
        var result = {};
        result.GET = 'mapLng|mapLat is undefined.';
        res.json(result);
        return next();
    };
    console.log('GET tbField called.');
    var mapLng = Number(req.query.mapLng);
    var mapLat = Number(req.query.mapLat);
    userDAO.tbField(mapLng, mapLat, function (data) {
        res.json(data);
    });
});

// 接口方法 GET Dept
router.get('/Dept', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    console.log('GET Dept called.');
    userDAO.Dept(function (data) {
        //console.log(data);
        res.json(data);
    });
});

// 接口方法 GET users
router.get('/users', function (req, res, next) {
    if (authIs == false) {
        console.log('Auth false.');
        var result = {};
        result.GET = 'Auth false';
        res.json(result);
        return next();
    };
    if (req.query.Dept == undefined) {
        var result = {};
        result.GET = 'Dept is undefined.';
        res.json(result);
        return next();
    };
    console.log('GET users called.');
    var Dept=req.query.Dept;
    userDAO.users(Dept,function (data) {
        res.json(data);
    });
});

module.exports = router;