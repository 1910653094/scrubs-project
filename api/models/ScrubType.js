"use strict";

const { PreparedStatement: PS } = require('pg-promise')();
const db = require('../helper/elephantSQL');

class ScrubType {
    constructor(id, color, size, description, image) {
        this.id = id;
        this.color = color;
        this.size = size;
        this.description = description;
        this.image = image;
    }

    getScrubType = async id => {
        const stmt = new PS({
            name: "Get Scrub Type",
            text: 'SELECT * FROM scrub_type WHERE scrub_type = $1;',
            values: [id]
        });

        let results;
        await db.any(stmt)
            .then(data => results = data)
            .catch(err => {
                console.log(err);
            });
        return results;
    }
}
