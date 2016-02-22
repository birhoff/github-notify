var format = require('util').format;

function Section(id, text) {
    this.id = id;
    this.text = text;
}

Section.prototype.toString = function() {
    return [beginTag(this.id), this.text, endTag(this.id)].join('\n');
};

Section.parseSections = function(str) {
    var idRule = '([a-zA-Z0-9_.-]+)',
        re = new RegExp(beginTag(idRule) + '\n?([\\s\\S]*?)\n?' + endTag(idRule), 'g'),
        match,
        result = [];

    while (match = re.exec(str)) {
        if (match[1] === match[3]) {
            result.push(new Section(match[1], match[2]));
        } else {
            console.log('Warning: skip section. Begin/end tag mismatch.', match[0]);
        }
    }

    return result;
};

module.exports = Section;

function beginTag(id) {
    return format('<!--SECTION_BEGIN:%s-->', id);
}

function endTag(id) {
    return format('<!--SECTION_END:%s-->', id);
}
