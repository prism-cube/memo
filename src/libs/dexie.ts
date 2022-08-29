import Dexie, { Table } from 'dexie'
import { Memo } from '../types'

export class MySubClassedDexie extends Dexie {
  memos!: Table<Memo>

  constructor() {
    super('playgroundDatabase')
    this.version(1).stores({
      memos: '++id, content, createdAt, updatedAt',
    })
  }
}

export const db = new MySubClassedDexie()

db.on('populate', populate)

async function populate() {
  await db.memos.bulkAdd([
    {
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
}