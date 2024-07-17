let messageController = (req, res) => {
    const {name, email, password} = req.body;

    console.log('message controller');
}

module.exports = messageController