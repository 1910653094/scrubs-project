"use strict";

const query = require("../helper/query");

class Preference {
    constructor(id_preference, id_employee, id_scrub_type) {
        this.id_preference = id_preference;
        this.id_employee = id_employee;
        this.id_scrub_type = id_scrub_type;
    };

    insertPreference = async () => await query(
        'Insert a preference',
        'INSERT INTO preference(id_preference, id_employee, id_scrub_type, id_reported_by) VALUES ($1, $2, $3)',
        [this.id_preference, this.id_employee, this.id_scrub_type]
    );
    
    

}

module.exports = Report;
