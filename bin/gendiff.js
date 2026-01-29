#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/index.js'

const program = new Command()

program
    .name('gendiff')
    .description('compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2)=>{
        const diff = genDiff(filepath1, filepath2)
        console.log(diff)
    })

program.parse()    