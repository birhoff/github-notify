var _ = require('lodash'),
    Section = require('./section');

var DELIMITER = '<!--TECHNICAL_SECTION_DO_NOT_EDIT-->',
    LINE = '---';

function updateBody(body, id, message) {
    var pieces = body.split(DELIMITER),
        originalBody = '',
        appendix = '',
        sections = [];

    if (pieces.length === 1) {
        originalBody = body.trim();
    } else {
        originalBody = pieces[0].trim();
        sections = Section.parseSections(pieces[1]);
        appendix = (pieces[2] || '').trim()
    }

    if (!message) {
        _.remove(sections, { id: id });
    } else {
        var section = _.find(sections, { id: id });
        if (section) {
            section.text = message;
        } else {
            sections.push(new Section(id, message));
        }
    }

    var result = [originalBody];
    if (sections.length > 0) {
        result = result.concat('', DELIMITER, LINE, sections, DELIMITER, '');
    }
    if (appendix) {
        result.push(appendix);
    }

    return result.join('\n');
}

function clearBody(body) {
    var pieces = body.split(DELIMITER),
        originalBody = '',
        appendix = '';

    if (pieces.length === 1) {
        originalBody = body.trim();
    } else {
        originalBody = pieces[0].trim();
        appendix = (pieces[2] || '').trim()
    }

    var result = [originalBody];
    if (appendix) {
        result.push(appendix);
    }

    return result.join('\n');
}

module.exports = function(token, repoSlug, pullRequest) {
    var agent = require('./github-agent')(token, repoSlug, pullRequest);

    return {
        /**
         *
         * @param id
         * @param message
         * @returns {Promise}
         */
        report: function(id, message) {
            return agent.getPullRequest()
                .then(function(pull) {
                    pull.body = updateBody(pull.body, id, message);
                    return pull;
                })
                .then(agent.updatePullRequest)
                .catch(function(err) {
                    console.log(err);
                });
        },

        clear: function() {
            return agent.getPullRequest()
                .then(function(pull) {
                    pull.body = clearBody(pull.body);
                    return pull;
                })
                .then(agent.updatePullRequest)
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
};
