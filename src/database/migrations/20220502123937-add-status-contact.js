module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("contacts", "status", {
      type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("contacts", "status", { transaction });
      await queryInterface.sequelize.query("DROP TYPE enum_contacts_status", {
        transaction,
      });
    });
  },
};
