const {DataTypes, Model} = require("sequelize");
const db = require("../config/database");

class Book extends Model {
    static id;
    static title;
    static author;
    static genre;
    static publication_date;
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publication_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
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