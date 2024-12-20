export default () => ({
  port: parseInt(process.env.PORT_HTTP_API, 10) || 3000,
});