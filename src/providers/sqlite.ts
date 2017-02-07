import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

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
export class SQLiteService {

    constructor(public platform: Platform, public storage: Storage, public db: SQLite) {
      console.log("in constructor");
      this.platform.ready().then(() => {
        this.initDB();
      });
    }

    public initDB(){
      this.platform.ready().then(() => {
        this.db.openDatabase({
          name: 'test.db',
          location: 'default' // the location field is required
        }).then(() => {
          this.db.executeSql('CREATE TABLE IF NOT EXISTS tests (id INTEGER PRIMARY KEY AUTOINCREMENT, name Text, user_id Text, date TIMESTAMP)', {}).then((data) =>{
            console.log("TESTS TABLE CREATED", JSON.stringify(data.res));
          }, (error) => {
            console.log("Error creating tests table", JSON.stringify(error.err));
          });

          this.db.executeSql('CREATE TABLE IF NOT EXISTS test_sections (id INTEGER PRIMARY KEY AUTOINCREMENT, section INTEGER, question TEXT, score TEXT, question_id INTEGER, test_id INTEGER, CONSTRAINT composite_id UNIQUE (section, question_id, test_id))', {}).then((data) =>{
            console.log("TEST SECTIONS TABLE CREATED", JSON.stringify(data.res));
          }, (error) => {
            console.log("Error creating tests table", JSON.stringify(error.err));
          });

          }, (err) => {
            console.error('Unable to open database: ', err);
          });
      });
    }

    // Init an empty DB if it does not exist by now!
    public refreshDataSet() {
       this.initDB();
    }

    ////////////////////////// QUERIES FOR TESTS //////////////////////
     public insertCreateTest(createTest: CreateTest) {
        let sql = 'INSERT INTO tests (name, user_id, date) VALUES (?, ?, DATE())';
        return this.db.executeSql(sql, [createTest.name, createTest.user_id]);
     }

     public getCreatedTests(user_id: string) {
        let sql = 'SELECT * FROM tests WHERE user_id = ? ORDER BY id DESC';
        return this.db.executeSql(sql, [user_id]);
     }

     public getAnsweredQuestions(test_id: number) {
        let sql = 'SELECT * FROM test_sections WHERE test_id = ? ORDER BY id ASC';
        return this.db.executeSql(sql, [test_id]);
     }

      public getLast(test_id: number) {
        let sql = 'SELECT * FROM test_sections WHERE id = (SELECT MAX(id) FROM test_sections WHERE test_id = ?);';
        return this.db.executeSql(sql, [test_id]);
     }

     public deleteTest(id: number) {
        let sql = 'DELETE FROM tests WHERE id = ?';
        return this.db.executeSql(sql, [id]);
     }

     public deleteTestByUser(user_id: number) {
        let sql = 'DELETE FROM tests WHERE user_id = ?';
        return this.db.executeSql(sql, [user_id]);
     }

     public deleteData(user_id: number) {
        let sql = 'DELETE FROM test_sections WHERE test_id = (SELECT test_id FROM tests WHERE user_id = ?)';
        return this.db.executeSql(sql, [user_id]);
     }

    ////////////////////////// QUERIES FOR TEST_SECTIONS //////////////////////

    // Get all notes of our DB
    // Possibly change to getSections
    public get(id: number) {
        let sql = 'SELECT * FROM test_sections WHERE test_id = ? GROUP BY section ORDER BY section ASC';
        return this.db.executeSql(sql, [id]);
    }

    // Get score for test, section and question to display on page if already submitted
    public getScore(test_id: number, question_id: number, section: number) {
        let sql = 'SELECT score FROM test_sections WHERE test_id = ? AND question_id = ? AND section = ?';
        return this.db.executeSql(sql, [test_id, question_id, section]);
    }

    // Get results of test to attach to the email
    public getResults(id: number) {
        let sql = 'SELECT * FROM test_sections WHERE test_id = ? ORDER BY section ASC';
        return this.db.executeSql(sql, [id]);
    }

    // Get results by section
    public getResultsBySectionTest(section_id: number, test_id: number) {
       let sql = 'SELECT question_id, COUNT(*) as count FROM test_sections WHERE section = ? AND test_id = ?';
       return this.db.executeSql(sql, [section_id, test_id]);
    }

    // Get tests by section and test id
    public getBySection(section: number, id: number) {
        let sql = 'SELECT * FROM test_sections WHERE section = ? and test_id = ? ORDER BY section ASC';
        return this.db.executeSql(sql, [section, id]);
    }

    // Save a new note to the DB
    public add(test: Test) {
        let sql = 'INSERT OR IGNORE INTO test_sections (section, question, score, question_id, test_id) VALUES (?, ?, ?, ?, ?)';
        return this.db.executeSql(sql, [test.section, test.question, test.score, test.question_id, test.test_id]);
    }

    // Update an existing note with a given ID
    public update(test: Test) {
        let sql = 'UPDATE test_sections SET score = ? WHERE section = ? AND question_id = ? AND test_id = ?';
        return this.db.executeSql(sql, [test.score, test.section, test.question_id, test.test_id]);
    }

    public deleteAnswers(id: number){
        let sql = 'DELETE FROM test_sections WHERE test_id = ?';
        return this.db.executeSql(sql, [id]);
    }
}
