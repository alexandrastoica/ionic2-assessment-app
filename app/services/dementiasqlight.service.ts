import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

export class Test {
  question: string;
  question_id: number;
  score: number;
  section: number;
  test_id: number;

  constructor(section: number, question: string, score: number, question_id: number, test_id: number) {
    this.section = section;
    this.question = question;
    this.score = score;
    this.question_id = question_id;
    this.test_id = test_id;
  }
}


export class CreateTest {
  id: number;
  name: string;
  user_id: string;
  date: string;
  percentage: string;

  constructor(id: number, name: string, user_id: string, date: string, percentage: string) {
    this.id = id;
    this.name = name;
    this.user_id = user_id;
    this.date = date;
    this.percentage = percentage;
  }
}

@Injectable()
export class DementiaSqlightService {
  storage: Storage = null;

  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS tests (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text, user_id Text, date TIMESTAMP)');
    this.storage.query('CREATE TABLE IF NOT EXISTS test_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, section INTEGER, question TEXT, score TEXT, question_id INTEGER, test_id INTEGER, CONSTRAINT composite_id UNIQUE (section, question_id, test_id))');

  }

  public refreshDataSet() {
    this.storage = new Storage(SqlStorage);
  }

   ////////////////////////// QUERIES FOR TESTS //////////////////////

   public insertCreateTest(createTest: CreateTest) {
       let sql = 'INSERT INTO tests (name, user_id, date) VALUES (?, ?, DATE())';
       return this.storage.query(sql, [createTest.name, createTest.user_id]);
   }

   public getCreatedTests(user_id: string) {
     let sql = 'SELECT * FROM tests WHERE user_id = ? ORDER BY id DESC';
     return this.storage.query(sql, [user_id]);
   }

   public getAnsweredQuestions(test_id: number) {
     let sql = 'SELECT * FROM test_sections WHERE test_id = ?';
     return this.storage.query(sql, [test_id]);
   }

   public deleteTest(id: number) {
     let sql = 'DELETE FROM tests WHERE id = ?';
     return this.storage.query(sql, [id]);
   }

  ////////////////////////// QUERIES FOR TEST_SECTIONS //////////////////////

  // Get all notes of our DB
  // Possibly change to getSections
  public get(id: number) {
    let sql = 'SELECT * FROM test_sections WHERE test_id = ? GROUP BY section ORDER BY section ASC';
    return this.storage.query(sql, [id]);
  }

  // Get tests by section and test id
  public getBySection(section: number, id: number) {
    let sql = 'SELECT * FROM test_sections WHERE section = ? and test_id = ? ORDER BY section ASC';
    return this.storage.query(sql, [section, id]);
  }

  // Save a new note to the DB
  public add(test: Test) {
    let sql = 'INSERT OR IGNORE INTO test_sections (section, question, score, question_id, test_id) VALUES (?, ?, ?, ?, ?)';
    return this.storage.query(sql, [test.section, test.question, test.score, test.question_id, test.test_id]);
  }

  // Update an existing note with a given ID
  public update(test: Test) {
    let sql = 'UPDATE test_sections SET score = ? WHERE section = ? AND question_id = ? AND test_id = ?';
    return this.storage.query(sql, [test.score, test.section, test.question_id, test.test_id]);
  }

  public deleteAnswers(id: number){
    let sql = 'DELETE FROM test_sections WHERE test_id = ?';
    return this.storage.query(sql, [id]);
  }
}
