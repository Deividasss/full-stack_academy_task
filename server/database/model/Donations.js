import { DataTypes } from "sequelize";
import { crowdFunder } from "./CrowdFunder.js";

export const donations = (sequelize) => {
  const schema = {
    name: { type: DataTypes.STRING, allowNull: false },
    donation: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT },
  };

  return sequelize.define("Donations", schema);

};
