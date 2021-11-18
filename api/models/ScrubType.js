"use strict";

const query = require("../helper/query");

class ScrubType {
    constructor(id, color, size, description, gender, image) {
        this.id = id;
        this.color = color;
        this.size = size;
        this.description = description;
        this.gender = gender;
        this.image = image;
    };

    getScrubType = async id => await query(
        'Get Scrub Type',
        'SELECT * FROM scrub_type WHERE scrub_type = $1;',
        [id]
    );
}

module.exports = ScrubType;
