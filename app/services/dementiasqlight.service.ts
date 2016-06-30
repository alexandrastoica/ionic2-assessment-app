import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

export class Test {
  question: string;
  question_id: number;
  score: number;
  section: number;
  id: number;
  constructor(section: number, question: string, score: number, question_id: number, id: number) {
    this.section = section;
    this.question = question;
    this.score = score;
    this.question_id = question_id;
    this.id = id;
  }
}

@Injectable()
export class DementiaSqlightService {
  storage: Storage = null;

  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS Tests (id INTEGER PRIMARY KEY AUTOINCREMENT, section Text, question TEXT, score TEXT, question_id INTEGER)');
  }

  // Get all notes of our DB
  public get() {
    return this.storage.query('SELECT * FROM Tests ORDER BY section ASC');
  }

  public getBySection(section: number) {
    let sql = 'SELECT * FROM Tests WHERE section = ? ORDER BY section ASC';
    return this.storage.query(sql, [section]);
  }

  // Save a new note to the DB
  public add(test: Test) {
    let sql = 'INSERT INTO Tests (section, question, score, question_id) VALUES (?, ?, ?, ?)';
    return this.storage.query(sql, [test.section, test.question, test.score, test.question_id]);
  }

  // Update an existing note with a given ID
  public update(test: Test) {
    let sql = 'UPDATE Tests SET score = \"' + test.score + '\"';
    this.storage.query(sql);
  }
}
