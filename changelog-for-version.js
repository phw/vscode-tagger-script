#!/usr/bin/env node

const path = require('path')
const parseChangelog = require('changelog-parser')


async function extractChanges(version) {
    const changeFile = path.join(__dirname, 'CHANGELOG.md')
    const changelog = await parseChangelog(changeFile)

    for (v of changelog.versions) {
        if (v.version === version) {
            return v.body
        }
    }

    return ''
}


if (process.argv.length < 3) {
    console.log(`Usage: ./${path.basename(__filename)} [VERSION]`)
    process.exit(1)
}

extractChanges(process.argv[2])
    .then(changes => process.stdout.write(changes))
    .catch(reason => {
        console.error(reason)
        process.exit(2)
    })