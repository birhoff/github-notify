var token = 'da41429d3dbf41d7fc0882bcc4d8b780aa8ad120', //process.env.GH_TOKEN,
    repoSlug = 'birhoff/github-notify', //process.env.TRAVIS_REPO_SLUG,
    number = process.env.TRAVIS_PULL_REQUEST,
    message = process.argv[2];

var reporter = require('./index')(token, repoSlug, number);


