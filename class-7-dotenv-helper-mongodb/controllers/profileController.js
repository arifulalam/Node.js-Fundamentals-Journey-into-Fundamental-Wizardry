let profileController = (req, res) => {
    const {name, email, password} = req.body;

    console.log('profile controller');
}

module.exports = profileController