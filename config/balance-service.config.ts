export default () => ({
  port: parseInt(process.env.PORT_BALANCE_SERVICE, 10) || 3001,
});