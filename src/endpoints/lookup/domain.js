module.exports = async (req, res) => {
    const axios = require("axios");

    const domain = req.query.domain;

    if(!domain) return res.status(400).json({ "error": "NO_DOMAIN" });

    let data;

    try {
        const result = await axios.get("https://raw-api.is-a.dev");

        data = result.data;
    } catch(err) {
        return res.status(500);
    }

    data = data.filter(item => item.subdomain === domain);

    if(!data[0]) return res.status(404).json({ "error": "DOMAIN_NOT_FOUND" });

    delete data[0].domain;
    delete data[0].subdomain;

    data = data[0];

    return res.status(200).json(data);
}