#!/usr/bin/env node
const inquirer = require('inquirer');
const { save } = require('./utils')
const { getAllActions, getBoard } = require('./api')

void async function() {
  const { boardId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'boardId',
      message: 'Enter board id'
    }
  ])
  const board = await getBoard(boardId)
  board.actions = await getAllActions(boardId)

  await save(`board-${boardId}`, board)
}()