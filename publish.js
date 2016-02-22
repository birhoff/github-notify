var argv = require('minimist')(process.argv.slice(2));

var token = process.env.GH_TOKEN,
    repoSlug = process.env.TRAVIS_REPO_SLUG,
    number = process.env.TRAVIS_PULL_REQUEST,
    message = process.argv[2];

var reporter = require('./index')(token, repoSlug, number);

reporter.report(argv.id, argv.message);


