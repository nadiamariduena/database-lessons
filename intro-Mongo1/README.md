#### To initialize Mongo

<ul>

<li>type : sudo mongod</li>
<li>open another tab and type: mongo</li>
<li>ctrl+L  to clean the window</li>

</ul>

#### Once you are inside the shell type the following:

### create DATABASE

<ul>
<li>type the following to know where you are at:   show dbs</li>
<li>type the following to create a database, dont forget that Test is the name i give to it, 'use' is the command: use Test</li>
<li>result: switched to db Test</li>
<li>type the following again to know where you are at: db </li>
<li>type the following: show dbs</li>
</ul>

<p>Repeat the steps</p>

### to remove

<ul>
<li>type 'dbs' to know what databases you have, if it show 0.000GB for all the three options is that its empty</li>
<li>type the following to remove:   db.dropDatabase();</li>
<li>result: {'ok': 1}</li>
</ul>

![image2](./images/img-exp1.jpg)

### create a New DATABASE

<ul>
<li>type the following to create a new db:  use newTest</li>
<li>result: switched to db newTest</li>
<li>type 'db' to know where you are at</li>
<li>type the following to create a new Collection of data:  db.createcollection('users')</li>
<li>type: show collections </li>
<li>result:  users</li>
</ul>
<p>users is the db you just created, if you have more dbs it will show all you have</p>

### Now go to the VS (visual studio) and type the following like in the image: then copy and paste it in the terminal, this is the vs way of doing it otherwise you have the super easy way in MONGO.

- VS version
  ![image1](./images/imageZero.jpg)

* MONGO version
  ![image2](./images/imageTwo.jpg)

<ul>

<li>db.users.insert</li>
<li>db.users.insertMany</li>

</ul>

![image2](./images/img-exp2.jpg)
