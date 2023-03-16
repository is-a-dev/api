module.exports = {
    "check": require("../endpoints/check"),
    "count": require("../endpoints/count"),
    "index": require("../endpoints/index"),
    "lookup": {
        "domain": require("../endpoints/lookup/domain"),
        "user": require("../endpoints/lookup/user")
    },
    "raw": require("../endpoints/raw")
}