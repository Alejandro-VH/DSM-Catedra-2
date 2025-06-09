// const {DataTypes, Model} = require("sequelize");
// const db = require("../config/database");

class Loan extends Model {
    static id;
    static user_id;
    static book_id;
    static loan_date;
    static return_date;
    static status;
}

Loan.init(
    {

        id: {
            Type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Book',
                key: 'id'
            },
            allowNull: false,
        },
        loan_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        return_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('prestado', 'devuelto', 'con retraso'),
            allowNull: false,
            defaultValue: 'prestado',
        }
    },
    {
        sequelize: db,
        modelName: "Loan",
        timestamps: true,
});

Loan.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
}

module.exports = Loan;