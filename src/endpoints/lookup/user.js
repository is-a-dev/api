module.exports = async (req, res) => {
    const axios = require("axios");

    const username = req.query.username;
    const email = req.query.email;

    if(!username && !email) return res.status(400).json({ "error": "NO_IDENTIFIER" });

    let data;

    try {
        const result = await axios.get("https://raw-api.is-a.dev");

        data = result.data;
    } catch(err) {
        return res.status(500);
    }

    if(username) {
        const userDomains = data.filter(item => item.owner.username.toLowerCase() === username.toLowerCase());

        if(!userDomains.length) return res.status(404).json({ "error": "USER_NOT_FOUND" });

        let subdomains = [];

        userDomains.forEach(item => {
            subdomains.push(item.domain.replace(".is-a.dev", ""));
        })

        return res.status(200).json({
            "count": userDomains.length,
            "subdomains": subdomains
        })
    }

    if(email) {
        const userDomains = data.filter(item => item.owner.email.replace(" (at) ", "@").toLowerCase() === email.toLowerCase());

        if(!userDomains.length) return res.status(404).json({ "error": "USER_NOT_FOUND" });

        let subdomains = [];

        userDomains.forEach(item => {
            subdomains.push(item.subdomain);
        })

        return res.status(200).json({
            "count": userDomains.length,
            "subdomains": subdomains
        })
    }
}