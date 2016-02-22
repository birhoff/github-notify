var DELIMITER = '<!--TECHNICAL_SECTION_DO_NOT_EDIT-->',
    LINE = '---';

// getPull()
//     .then(updateBody)
//     .then(postBody)
//     .catch(function(err) {
//         console.log(err);
//     });

function postBody(pull) {
    var updatePull = Promise.promisify(github.pullRequests.update);
    return updatePull({
        user: user,
        repo: repo,
        number: number,
        title: pull.title,
        body: pull.body
    });
}

function updateBody(pull) {
    var body = pull.body,
        pieces = body.split(DELIMITER),
        originalBody;

    if (pieces.length === 1) {
        originalBody = body.trim();
    } else {
        originalBody = pieces[0].trim();
    }

    pull.body = [originalBody, DELIMITER, LINE, message].join('\r\n');
    return pull;
}

module.exports = function(token, repoSlug, pullRequest) {
    var agent = require('./github-agent')(token, repoSlug, pullRequest);

    return {
        report: function(id, message) {
            agent.getPullRequest()
                .then(function(pull) {
                    console.log(pull);
                })
                .catch();
        }
    }
};
