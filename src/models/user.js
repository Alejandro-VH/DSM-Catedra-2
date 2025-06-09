// const {DataTypes, Model} = require("sequelize");
// const db = require("../config/database");

class User extends Model {
    static id;
    static name;
    static last_name;
    static email;
    static password;
}

User.init(
    {
        id: {
            Type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            Type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            Type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            Type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            Type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: "User",
        timestamps: true,
});

User.prototype.toJSON = function () {
    const {password, ...user} = this.get();
    delete user.password;

    return user;
}

module.exports = User;