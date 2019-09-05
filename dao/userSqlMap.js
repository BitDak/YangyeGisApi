var userSqlMap = {
    tbFieldSum: 'select * from tbFieldSum',
    tbStationSum: 'select * from tbStationSum',
    tbFieldsArea: 'select * from tbFieldsArea',
    tbFields: 'select * from tbFields where (creationUserName =? and creationTime<=(select creationTime from tbFields where creationUserName =? order by creationTime desc limit ?,1)) order by creationTime desc limit ?',
    tbField: 'select * from tbField where mapLng=? and mapLat=?',
    Dept: 'select distinct shortName from UserDeptInfo',
    users: 'select userName from UserDeptInfo where shortName=?',
    totalRecord: 'select count(*) as totalRecord from tbFields where creationuserName=?',
};

module.exports = userSqlMap;