module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "local",
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
