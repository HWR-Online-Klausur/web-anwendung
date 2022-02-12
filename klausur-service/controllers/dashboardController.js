const Student = require("../db/models/student.model");
const apiError = require("../errorHandl/apiError");

class DashboardController {
    async findAllStudents(req, res, next){
        await Student.find({}, (err, data) =>{
            if(err){
                return next(apiError.internalServerError('Unerwarteter Fehler'));
            }
            res.status(200).send(data);
        });
    }
}
