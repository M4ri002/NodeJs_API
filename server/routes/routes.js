const path = require('path');

const VueLoad = (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
};

module.exports = {
    VueLoad
};
