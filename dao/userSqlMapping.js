var user = {
	insert: 'INSERT INTO adminuser(uid,id,userName,passWord) VALUES(0,0,?,?)',
	queryById: 'select * from adminuser where id=?',
	queryByUserName: 'select * from adminuser where userName=?',
}

module.exports = user;