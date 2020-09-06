const axios = require('axios')
const chalk = require('chalk')
const { KEY, TOKEN } = require('./envs')

async function requestAPI(path) {
  console.log(chalk.grey('request', path));
  const resp = (await axios.get(`https://api.trello.com${path}&key=${KEY}&token=${TOKEN}`))
  console.log(chalk.grey('request completed'));
  return resp.data
}

async function getActions(boardId, before) {
  return await requestAPI(`/1/boards/${boardId}/actions?${before ? 'before='+before : ''}&limit=1000`)
}

async function getAllActions(boardId) {
  const actions = []

  let last
  do {
    last = await getActions(boardId, last ? last[last.length - 1].date : '')

    console.log('found ', last.length, ' actions')
    actions.push(...last)

  } while (last.length >= 1000)

  console.log('count: ', actions.length)
  console.log('Writing to file...')

  return actions
}

async function getBoard(id) { // actions are limited
  return await requestAPI(`/1/boards/${id}?fields=all&actions=all&action_fields=all&actions_limit=1000&cards=all&card_fields=all&card_attachments=true&labels=all&lists=all&list_fields=all&members=all&member_fields=all&checklists=all&checklist_fields=all&organization=false`)
}

module.exports = {
  getActions,
  getAllActions,
  getBoard
}