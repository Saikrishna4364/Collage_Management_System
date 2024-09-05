import express from "express";
import path from "path";
import con from "../utils/db.js";
import mysql from 'mysql';
import PDFDocument from 'pdfkit';

const adminRouter=express.Router();
adminRouter.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        return res.json({ loginStatus: true,Email:email });
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  adminRouter.post("/Managestudents", (req, res) => {
    const sql = `INSERT INTO students 
     (studentName,studentRollno,studentEmail,studentSection) 
    VALUES (?,?,?,?)`;
      
        con.query(sql, [req.body.studentName,req.body.studentRollno,req.body.studentEmail,req.body.studentSection], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            console.log("inserted successfully");
            return res.json({Status: true})
            

        })
    })
    adminRouter.get("/Markattendence/:section", (req, res) => {
      const section = req.params.section;
       console.log(section);
      const sql = "SELECT studentRollno FROM students  WHERE studentSection= ?";
      con.query(sql,[section], (err, result) => {
          if(err) return res.json({Status: false, Error: "Query Error"})
          console.log(result);
          return res.json({Status: true, Result: result})
      })
  })
  adminRouter.post("/Attendencesheet/:section", (req, res) => {
    
    const { presentees, absentees,hours,dates } = req.body;
    console.log(Array.isArray(presentees));
    console.log(presentees);

    const presenteeQuery = `INSERT INTO attendence_record (studentRollno,attendence_flag,posted_time,posted_hour) VALUES ?`;
    const presenteeValues = presentees.map(rollNumber => [rollNumber, 'present',dates,hours]);
    console.log(presenteeValues);
  
    const absenteeQuery = `INSERT INTO attendence_record(studentRollno,attendence_flag,posted_time,posted_hour) VALUES ?`;
    const absenteeValues = absentees.map(rollNumber => [rollNumber, 'absent',dates,hours]);
    console.log(absenteeValues);
  
    con.query(presenteeQuery, [presenteeValues], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      con.query(absenteeQuery, [absenteeValues], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Attendance saved successfully'});
        
      });
      
    });

    })
    adminRouter.get("/Getattendence", (req, res) => {
    const rollno = req.query.rollno;
  const date = req.query.date; 
  console.log(rollno);

  const query = `SELECT * FROM attendence_record WHERE StudentRollno = ? AND DATE_FORMAT(posted_time, '%Y-%m-%d') LIKE ?`;
  const formattedQuery = mysql.format(query, [rollno, `%${date}%`]);

  con.query(formattedQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    return res.json(results);
    
      })
  })

  adminRouter.get('/api/generate-pdf', (req, res) => {
    const { section, date } = req.query;
    console.log(typeof section);
    console.log(date)
  
    // Query to fetch attendance data based on section and date
    
  const query = `SELECT st.studentRollno, st.studentName, st.studentSection, ar.posted_time, ar.posted_hour,ar.attendence_flag
  FROM students AS st
  JOIN attendence_record AS ar ON st.studentRollno = ar.studentRollno
  WHERE st.studentSection = ? AND DATE_FORMAT(posted_time, '%Y-%m-%d') LIKE  ?`;
  const formattedQuery = mysql.format(query, [section, `%${date}%`]);

    con.query( formattedQuery, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=attendance_${section}_${date}.pdf`,
          })
          .end(pdfData);
      });
  
     
      doc.fontSize(18).text(`Attendance Report`, { align: 'center' });
      doc.fontSize(14).text(`Section: ${section}`, { align: 'left' });
      doc.fontSize(14).text(`Date: ${date}`, { align: 'left' });
      doc.moveDown();
  
      results.forEach((student) => {

        doc.fontSize(12).text(`Roll Number: ${student.studentRollno}`);
        doc.fontSize(12).text(`student name: ${student.studentName}`);
        doc.fontSize(12).text(`section: ${student.studentSection}`);
        doc.fontSize(12).text(`date: ${student.posted_time}`);
        doc.fontSize(12).text(`hour: ${student.posted_hour}`);
        doc.fontSize(12).text(`status: ${student.attendence_flag}`);
        doc.moveDown();
      });
  
      doc.end();
      console.log(results);
    });
  });
  adminRouter.get('/presentees/count', (req, res) => {
    // Get the current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const status='present';

    // Query to fetch presentees based on the current date
    //const query = `SELECT count(distinct(studentRollno)) as presentee_count  FROM attendence_record WHERE attendence_flag = ? and DATE_FORMAT(posted_time, '%Y-%m-%d') LIKE  ?`;
    const query=`SELECT count(distinct(studentRollno))as presentees_count from attendence_record where attendence_flag='present' and posted_time like  ?`;
    // const formattedQuery = mysql.format(query, [status,`%${formattedDate}%`]);
    
    con.query(query,`%${formattedDate}%`, (err, results) => {
        if (err) {
            console.error('Error fetching presentees:', err);
            res.status(500).send('Error fetching presentees');
            return;
        }
        res.json(results);
        console.log(results);
    });
});

adminRouter.get('/absentees/count', (req, res) => {
  // Get the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const status='absent';
  console.log( typeof formattedDate);

  // Query to fetch presentees based on the current date
  // const query = `SELECT count(distinct(studentRollno)) as absentee_count FROM attendence_record WHERE attendence_flag = ? and DATE_FORMAT(posted_time, '%Y-%m-%d') LIKE  ? `;
  // const formattedQuery = mysql.format(query, [status,`%${formattedDate}%`]);
  const query=`SELECT count(distinct(studentRollno))as absentees_count from attendence_record where attendence_flag='absent' and posted_time like  ?`;

  con.query(query,[`%${formattedDate}%`] , (err, results) => {
      if (err) {
          console.error('Error fetching presentees:', err);
          res.status(500).send('Error fetching presentees');
          return;
      }
      res.json(results);
  });
});

adminRouter.get('/staff/count', (req, res) => {
  
  const query=`SELECT count(staff_id) as staff_count from staff`;

  con.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching presentees:', err);
          res.status(500).send('Error fetching presentees');
          return;
      }
      res.json(results);
  });
});

adminRouter.get("/hod", (req, res) => {
  
const query = `SELECT * from hod`;
con.query(query, (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error executing query');
    return;
  }
  return res.json(results);
  
    })
})
adminRouter.get("/staff", (req, res) => {
  
  const query = `SELECT * from staff`;
  con.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    console.log(results);
    return res.json(results);
    
      })
  })
  adminRouter.post("/Notification", (req, res) => {
    const sql = `INSERT INTO notifications
     (Notification_id,notification_department,notification_description,posted_staff_id,posted_date) 
    VALUES (?,?,?,?,?)`;
      
        con.query(sql, [req.body.nid,req.body.branch,req.body.text,req.body.cid,req.body.date], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            console.log("inserted successfully");
            return res.json({Status: true})
            

        })
    })

    adminRouter.get("/Notification", (req, res) => {
  
      const query = `SELECT * from notifications`;
      con.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Error executing query');
          return;
        }
        console.log(results);
        return res.json(results);
        
          })
      })
      adminRouter.post('/RegSubjects', (req, res) => {
        const { sectionName, subjectName, dataType,testType} = req.body;
      
      
        const selectQuery = 'SELECT StudentRollno,StudentSection FROM students WHERE StudentSection = ?';
      
        con.query(selectQuery, [sectionName], (err, results) => {
          if (err) {
            console.error('Error fetching roll numbers:', err);
            res.status(500).send('Error fetching roll numbers');
            return;
          }
         console.log(results);
         for(let i=0;i<results.length;i++)
          {
               results[i].testType=`${testType}`;
          }
          console.log(results);
          const insertQuery1 = 'INSERT INTO student_marks (student_rollno,student_section,test_type) VALUES ?';
          const rollNumbers = results.map(row => [row.StudentRollno,row.StudentSection,row.testType]);
      
          con.query(insertQuery1, [rollNumbers], (err, result) => {
            if (err) {
              console.error('Error inserting roll numbers:', err);
              res.status(500).send('Error inserting roll numbers');
              return;
            }
            console.log(result);

      
            // Add a new column to the student_marks table
            const alterQuery = `ALTER TABLE student_marks ADD COLUMN ${mysql.escapeId(subjectName)} ${dataType}`;
      
            con.query(alterQuery, (err, result) => {
              if (err) {
                console.error('Error altering table:', err);
                res.status(500).send('Error altering table');
                return;
              }
      
              res.send('Subject added successfully');
            });
          });
        });
        });
      

        adminRouter.get("/PostMarks", (req, res) => {
          const  section= req.query.section;
        const  examType= req.query.examType; 
      
        const query = `SELECT * FROM student_marks WHERE student_section=? AND test_type=?`;
        const formattedQuery = mysql.format(query, [section,examType]);
      
        con.query(formattedQuery, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
          }
          console.log(results);
          return res.json(results);
          
            })
        })

        adminRouter.post('/UpdateMarks', (req, res) => {
          const data = req.body; // Make sure to parse JSON body
          console.log(data);
      
          // Assuming you have fields like roll_number, section, exam_type, subject1, subject2 in your data
          const query = `
              UPDATE student_marks
              SET AI=?, CNN=?
              WHERE student_rollno = ? AND student_section = ? AND test_type = ?;
          `;
      
          data.forEach(row => {
              con.query(query, [row.AI, row.CNN, row.student_rollno, row.student_section, row.test_type], (error, results) => {
                  if (error) {
                      console.error('Error updating data:', error);
                      res.status(500).send(error);
                  }
              });
          });
      
          res.send('Data updated successfully');
      });
    
  
 
  

export default adminRouter ;
