// const {DataTypes, Model} = require("sequelize");
// const db = require("../config/database");

class Book extends Model {
    static id;
    static title;
    static author;
    static genre;
    static publish_date;
    static available;
    static deleted;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            Type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            Type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            Type: DataTypes.STRING,
            allowNull: false,
        },
        publish_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        available: {
            type: DataTypes.Boolean,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.Boolean,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        modelName: "Book",
        timestamps: true,
});

Book.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
}

module.exports = Book;