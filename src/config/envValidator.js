const prodEnvsInUse = ['JWT_SECRET', 'JWT_EXPIRE', 'FRONTEND_URL', 'ROOT_URL', 'PORT', 'NODE_ENV'];

const devEnvsInUse = ['JWT_SECRET', 'JWT_EXPIRE', 'ROOT_URL', 'PORT', 'NODE_ENV'];

const validateEnvs = () => {
  let missing = [];
  if (process.env.NODE_ENV === 'production') {
    missing = prodEnvsInUse.filter((env) => !process.env[env]);
  } else {
    missing = devEnvsInUse.filter((env) => !process.env[env]);
  }
  console.log('size of missing: ', missing.length);
  if (missing.length > 0) {
    throw new Error(`List of missing env(s): ${missing.join(',')}`);
  } else {
    console.log("All env's present!");
  }
};

module.exports = validateEnvs;
