"use strict";

const bcrypt = require("bcrypt");
const query = require("../helper/query");

class Employee {
    constructor(id, email, password, name, profession, gender) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.profession = profession;
        this.gender = gender;
    };

    getAllEmployees = async () => await query(
            'Get * employees',
            'SELECT * FROM employee',
            []
        );

    getEmployee = async () => await query(
            'Get specified employee',
            'SELECT email, password, "name", profession, gender FROM employee WHERE id_employee = $1',
            [this.id]
        );

    getEmployeeWithBorrowings = async () => {
        const obj = await this.getEmployee();
        if (obj.status !== 200) return obj;

        let res = await query(
            'Get * borrowings from distinct employee',
            'SELECT description, "size", color, quantity, borrowed_date, return_date, returned FROM borrow_history ' +
            'JOIN scrub_type USING(id_scrub_type) WHERE id_employee = $1',
            [this.id]
        );
        if (res.status !== 200) return res

        const employee = obj.response;
        delete employee.password;
        employee.borrowings = res.response.map(borrow => {
            const today = new Date();
            if (!borrow.returned && today > borrow.return_date) borrow.status = 'Overdue';
            else if (!borrow.returned) borrow.status = 'Borrowing';
            else borrow.status = 'Returned';
            delete borrow.returned;
        });

        return {
            status: 200,
            response: employee
        };
    };

    insertEmployee = async () => {
        const password = bcrypt.hashSync(this.password, 10);
        return await query(
            'Insert employee',
            'INSERT INTO employee (email, password, "name", profession, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [this.email, password, this.name, this.profession, this.gender]
        );
    };

    login = async () => {
        const allObj = await this.getAllEmployees();
        if (allObj.status !== 200) {
            return allObj;
        }
        const employee = allObj.response
            .map(e => new Employee(e.id_employee, e.email, e.password, e.name, e.profession))
            .find(e => e.email === this.email);

        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(this.password, employee.password, (error, res) => {
                if (error) reject(error);
                resolve(res);
            })
        });
        delete employee.password;
        return {
            status: match ? 200 : 400,
            response: match ? employee : { res: 'Passwords do not match' }
        };
    };
}

module.exports = Employee;
