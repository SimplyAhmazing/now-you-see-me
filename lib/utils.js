function getUserHome() {
    // FIXME: allow change for dev mode
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    // return __dirname + '/..'
    // // return '/Users/ahmed/Projects/sos';
}

exports.getUserHome = getUserHome;
