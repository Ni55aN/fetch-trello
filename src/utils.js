const fs = require('fs-extra');

async function save(name, data) {
  await fs.ensureDir('./tmp')
  await fs.writeFile(`./tmp/${name}.json`, JSON.stringify(data), 'utf8')
}

module.exports = {
  save
}