var api = require('./github-api');

function _getRepoInfo(slug) {
    var parts = slug.split('/'),
        owner = parts.shift(),
        name = parts.join('/');

    return {
        owner: owner,
        name: name
    }
}

module.exports = function(token, repoSlug, pullRequest) {
    var repo = _getRepoInfo(repoSlug),
        prNumber = parseInt(pullRequest);

    api.authenticate(token);

    return {
        /**
         * Get pull request info form GH
         * @returns {Promise}
         */
        getPullRequest: function() {
            return api.pullRequests.get({
                user: repo.owner,
                repo: repo.name,
                number: prNumber
            });
        },

        /**
         *
         * @returns {Promise}
         */
        updatePullRequest: function(pull) {
            return api.pullRequests.update({
                user: repo.owner,
                repo: repo.name,
                number: prNumber,
                title: pull.title,
                body: pull.body
            });
        }
    }
};
