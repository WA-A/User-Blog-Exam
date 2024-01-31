const express = require('express');
const app = express();
const mysql = require('mysql2');
app.use(express.json());

const connection =  mysql.createConnection({  // Connect to DataBase
    host:'localhost',
    user:'root',
    password:'',
    database:'user_blog_exam',
  });

  //Insert User for table user
  app.post('/InsertUser',(req,res)=>{
    const {email,password,bio} = req.body;
    connection.execute(`INSERT INTO user(email,password,bio) VALUES('${email}','${password}','${bio}')`,    // Sentence SQL this is Preparation stage (التحضير)
    (err,result)=>{    // Sentence SQL this is execute stage (التنفيذ)
        if(err){
          if (err.errno==1062) 
          return res.json({message:"Email Aleady is Used"}); // dublicate
        
        else 
          return res.json({message:"Email While Creating User"});  // another error
    }
      return res.json({message:"Success Insert For Table user"});
    });   
  });
 

  // Read Table for table user
app.get('/ShowUser',(req,res)=>{       // localhost:4000/SHOWuser  =====> When I run it in the browser, it shows that I have an API, which means it worked API
    connection.execute(`SELECT * FROM user`,(err,result)=>{          // (err,result)==> callback function === the execute replay to her is result
        if(err){
            return res.json({message:"Error"});
           }
       return res.json({message:"Success Show for Table user",users:result});
     });  
  });

  // Update User  for table user
  app.patch('/UpdateUser',(req,res)=>{   // patch is chanch on part from obj
    const {id,email}= req.body;
    connection.execute(`UPDATE user SET email ='${email}' where id = '${id}'`,(err,result)=>{
      if(result.affectedRows == 0){  // means no update
        return res.json({message:"User Not Found"});
    }
    return res.json({message:"Success Updated For Table user"});
    });
    
    });  

    // Delete User  for table user
app.delete('/DeleteUser',(req,res)=>{    
    const {id}= req.body;
    connection.execute(`DELETE FROM user WHERE id = '${id}'`,(err,result)=>{
      if(result.affectedRows==0){ // means no update
        return res.json({message:"user not found"});
    }
    return res.json({message:"Success Delete For Table user"});
    });
    
    });


//============================================================================================


//Insert Blog for table Blog
app.post('/InsertBlog',(req,res)=>{
    const {title,description,user_name} = req.body;
    connection.execute(`INSERT INTO Blog(title,description,user_name) VALUES('${title}','${description}','${user_name}')`,    
    (err,result)=>{    
        if(err){
          if (err.errno==1062) 
          return res.json({message:"user_name Aleady is Used"}); 
        
        else 
          return res.json({message:"user_name While Creating Blog"});  
    }
      return res.json({message:"Success Insert For Table Blog"});
    });   
  });


// Read Table for table Blog
app.get('/ShowBlog',(req,res)=>{       
    connection.execute(`SELECT * FROM Blog`,(err,result)=>{          
        if(err){
            return res.json({message:"Error"});
           }
       return res.json({message:"Success Show For Table Blog",Blogs:result});
     });  
  });


  // Update Blog for table Blog
  app.patch('/UpdateBlog/:user_name',(req,res)=>{   
    const {title}= req.body;
    const {user_name}=req.params;
    connection.execute(`UPDATE Blog SET title ='${title}' where user_name = '${user_name}'`,(err,result)=>{
        if(err){
            if(!user_name){  
                return res.json({message:" Not Allowed To Edit the Blog"});
            }
        }
      
    return res.json({message:"Success Updated For Table Blog"});
    });
    
    }); 


// Delete Blog for table Blog
app.delete('/DeleteBlog/:user_name',(req,res)=>{    
    const {user_name}=req.params;
    connection.execute(`DELETE FROM Blog WHERE user_name = '${user_name}'`,(err,result)=>{
        
        if(err){
            if(!user_name){  
                return res.json({message:" Not Allowed To Delete the Blog"});
            }
        }
        
        
    return res.json({message:"Success Delete For Table Blog"});
    });
    
    });


 // Port Server
  app.listen(4000,()=>{
    console.log('server is running ..... 4000');
    });