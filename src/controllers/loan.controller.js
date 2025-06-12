const Loan = require('../models/loan');

const registerLoan = async (req = request, res = response) => {
    try {
        const { user_id, book_id } = req.body;

        if (!user_id || !book_id) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar los campos obligatorios",
            });
        }

         const loan_date = new Date();
        // Caclular la fecha de devolución, agregandole 7 días a la fecha de préstamo
        const return_date = new Date();
        return_date.setDate(return_date.getDate() + 7);

        const loanData = {user_id, book_id, loan_date, return_date};

        const newLoan = await Loan.create(loanData);
        
        return res.status(201).json({
            success: true,
            error: false,
            data: newLoan,
            message: "Prestamo registrado exitosamente",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al registrar el préstamo",
        });  
    }
}

const markLoanAsReturned = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar los campos obligatorios",
            });        
        }

        // Buscar prestamo
        const loan = await Loan.findByPk(id);
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el préstamo indicado",
            });          
        }

        loan.returnDate = new Date();

        // Revisar si esta atrasado
        if (loan.returnDate > loan.loanDate) {
            loan.status = 'con retraso';
            await loan.save();
            return res.status(200).json({
                success: true,
                message: "Prestamo marcado como devuelto correctamente",
                data: loan
            });
        }

        // Marcar como devuelto
        loan.status = 'devuelto';
        await loan.save();
        return res.status(200).json({
            success: true,
            message: "Prestamo marcado como devuelto correctamente",
            data: loan
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al marcar el préstamo como devuelto",
        });
    }
}

const getLoans = async (req = request, res = response) => {
    try {
        const loans = await Loan.findAll();

        if (!loans) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron préstamos",
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Préstamos encontrados",
            data: loans
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al conseguir los préstamos",
        });
    }
}

const getUserLoans = async (req = request, res = response) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar los campos obligatorios",
            });           
        }

        const userLoans = await Loan.findAll({
            where: { user_id },
        });

        if (userLoans.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron préstamos para este usuario",
            });        }

        return res.status(200).json({
            success: true,
            message: "Prestamos del usuario encontrados",
            data: userLoans
        });    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al conseguir los préstamos del usuario indicado",
        });
    }
}

module.exports = {
    registerLoan,
    markLoanAsReturned,
    getLoans,
    getUserLoans,
};