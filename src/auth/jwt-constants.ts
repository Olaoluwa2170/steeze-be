export const StrategyConstants = {
  secret_access: process.env.ACCESS_CONSTANT,
  secret_refresh: process.env.REFRESH_CONSTANT,
};

export const AccessSign = {
  secret: StrategyConstants.secret_access,
  expiresIn: process.env.EXPIRE_ACCESS,
};
export const RefreshSign = {
  secret: StrategyConstants.secret_refresh,
  expiresIn: process.env.EXPIRE_REFRESH,
};
