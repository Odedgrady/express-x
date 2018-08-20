module.exports = (app) => {
	app.get('/login', function (req, res) {
		res.render('pages/login');
	});

	
	// ================================================================


	app.post('/login', function (req, res) {
        console.log(req.body)
		var message = '';
		var sess = req.session;

		var post = req.body;
		var name = post.user_name;
		var pass = post.password;

		var sql =`
			SELECT
				id,
				navn,
				email,
				password
			FROM bruger
			WHERE
				email = ? AND password = ?`;

		db.query(sql, [name, pass], function (err, results) {
			if (results.length) {
				req.session.userId = results[0].id;
				req.session.user = results[0];
				// console.log(results[0].id);
				res.redirect('/');
			}
			else {
				message = 'Wrong credentials.';
				res.render('pages/index', { message: message });
			}
		});
	});

	app.get('/logout', function (req, res) {
		req.session.destroy(function(err){
			if (err)console.log(err);
			res.redirect("/login");
		})
	});

}