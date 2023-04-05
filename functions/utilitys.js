const getDataString = (dt) => {
    const tdt = dt.toISOString().split("T")[0].split("-");
    return tdt[2] + "/" + tdt[1] + "/" + tdt[0];
}

const getTimeString = (dt) => {
    const tdt = dt.toLocaleTimeString().split(":");
    return tdt[0] + ":" + tdt[1];
};


module.exports.getDataString = getDataString;
module.exports.getTimeString = getTimeString;