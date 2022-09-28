exports.userCreateValidate = (req, res, next) => {
    const {Name, Email} = req.body;
    if(!Name || !Email) return res.status(400).json({message: 'Name, Email is required'});
    next();
}

exports.userSignInValidate = (req, res, next) => {
    const {Password, Email} = req.body;
    if(!Password || !Email) return res.status(400).json({message: 'Email, Password is required'});
    next();
}