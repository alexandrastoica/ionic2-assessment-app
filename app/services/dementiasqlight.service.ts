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


export class CreateTest {
  name: string;
  date: string;
  id: number;
  constructor(id: number, name: string, date: string ) {
    this.id = id;
    this.name = name;
    this.date = date;
  }
}

@Injectable()
export class DementiaSqlightService {
  storage: Storage = null;

  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS test_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, section Text, question TEXT, score TEXT, question_id INTEGER, test_id INTEGER)');
    this.storage.query('CREATE TABLE IF NOT EXISTS tests (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text, date TIMESTAMP)');
  }

   ////////////////////////// QUERIES FOR TESTS //////////////////////

   public insertCreateTest(createTest: CreateTest) {
       let sql = 'INSERT INTO tests (name, date) VALUES (?, DATE())';
       return this.storage.query(sql, [createTest.name]);
   }

   public getCreatedTests(){
     return this.storage.query('SELECT * FROM tests ORDER BY date ASC');
   }

  ////////////////////////// QUERIES FOR TEST_SECTIONS //////////////////////

  // Get all notes of our DB
  public get() {
    return this.storage.query('SELECT * FROM test_sections GROUP BY section ORDER BY section ASC');
  }

  public getBySection(section: number) {
    let sql = 'SELECT * FROM test_sections WHERE section = ? ORDER BY section ASC';
    return this.storage.query(sql, [section]);
  }

  // Save a new note to the DB
  public add(test: Test) {
   // let sql = 'INSERT INTO test_sections (section, question, score, question_id) VALUES (?, ?, ?, ?)';
   // return this.storage.query(sql, [test.section, test.question, test.score, test.question_id]);
       let sql = 'INSERT INTO test_sections (section, question, score, question_id) VALUES (?, ?, ?, ?)';
    return this.storage.query(sql, [test.section, test.question, test.score, test.question_id]);

  }

  // Update an existing note with a given ID
  public update(score: number, section: number) {
    let sql = 'UPDATE test_sections SET score = ? WHERE section = ?';
    return this.storage.query(sql, [score, section]);
     //let sql = 'UPDATE test_sections SET score = \"' + test.score + '\"';
     // this.storage.query(sql);
  }
}
