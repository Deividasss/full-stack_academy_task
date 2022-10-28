import { DataTypes } from "sequelize";
import { users } from "./users.js";

export const crowdFunder = (sequelize) => {
  const schema = {
    title: { type: DataTypes.STRING, allowNull: false },
    collection: { type: DataTypes.STRING, allowNull: false },
    starting_bid: { type: DataTypes.STRING, allowNull: false },
    cf_image: { type: DataTypes.STRING, allowNull: false },
    network: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    approved: { type: DataTypes.INTEGER },
    success: { type: DataTypes.INTEGER },
  };

  const CrowdFunder = sequelize.define("Nfts", schema);
  const Users = users(sequelize);

  Users.hasOne(CrowdFunder);
  CrowdFunder.belongsTo(Users);

  return CrowdFunder;
};
