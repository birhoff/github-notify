var Promise = require('bluebird'),
    GitHubApi = require('github'),

    github = new GitHubApi({
        version: '3.0.0',
        host: 'api.github.com'
    });

module.exports = {
    authenticate: function(token) {
        return github.authenticate({
            type: 'oauth',
            token: token
        });
    },

    pullRequests: {
        get: Promise.promisify(github.pullRequests.get)
    }
};
