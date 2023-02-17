const getDataString = (dt) => {
    const tdt = dt.toISOString().split("T")[0].split("-");
    return tdt[2] + "/" + tdt[1] + "/" + tdt[0];
}

module.exports.getDataString = getDataString;