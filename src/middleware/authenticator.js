const errors = require('../errors');
function authenticate(role) {
  return (req, res, next) => {
    const userRole = req.user.role || [];
    const findRole = userRole.some((ur) => role.includes(ur));
    if (findRole) {
      next();
    } else {
      throw new errors.ForbiddenError('ACCESS DENIED!');
    }
  };
}
module.exports = { authenticate };
