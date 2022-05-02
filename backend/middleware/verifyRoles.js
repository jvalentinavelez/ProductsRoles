const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401); //the request should have defined roles, if not: unauthorized
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles)
        // verify roles that were passed (req.roles), to assure they are valid roles(allowed Roles)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true); //true or false
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles