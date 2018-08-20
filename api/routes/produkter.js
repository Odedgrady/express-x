module.exports = (app) => {
	app.get('/produkter', function (req, res) {
        db.query("select id, navn, beskrivelse, pris, billede from produkter",(err,result)=> {
            if(err) console.log (err)

            // Indlæser ejs filen
            res.render('pages/produkter',{
                data:result
            });
        })
    });
   
    // app.post('/create_product', (req, res) => {
    //     db.quary("") => 
    // })


    // app.put('/update_product', (req, res) => {
    //     db.quary("")  =>
   
    // })


    // app.delete('/delete_product', (req, res) => {
    //     db.quary("")  =>
 
    // })



    //TODO: opret rout der viser et specifik produkt. for eksempel-./produkt/:id
}
