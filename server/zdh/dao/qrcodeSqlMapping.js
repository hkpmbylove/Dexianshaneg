var qrcodeSql={
    insertqrcodeInfo:"insert into distributor_info(sign,imgUrl) values (?,?)",
    selectqrcoseInfo:"select * from distributor_info",
    dellqrcodeInfo:"delete from distributor_info where id=?",
    updateqrcodeInfo:"update distributor_info set sign=?,imgUrl=? where id=?"
};

module.exports=qrcodeSql;