

const {
    check,
    validationResult

} = require('express-validator/check')

module.exports = function (app) {

    app.get('/kontakt', (req, res) => {
        res.render('pages/kontakt', {
            fejlbeskeder: [],
            navn:"",
            email:"",
            mobil:"",
            titel:"",
            besked:""


            
          
         });
    });
    
    app.post('/kontaktinfo', [

    // check- indholder express-validator/check.
        check("email").isEmail().withMessage("Indtast gyldig email"),

        check("navn").isLength({
            min:2, max:50
        }).withMessage("indtast venligst dit navn"),

        check('mobil').isFloat().withMessage('et telefon nummer kan kun indeholde tal.'),
        check('mobil').isMobilePhone('da-DK').withMessage('indtast venligst et gyldigt nummer'),

        check("titel").not().isEmpty().withMessage("write something of value")

    ], (req, res) => {
        // Errors indholder fejl beskeden der kommer fra validering 
        const errors = validationResult(req);

        // udfører et tjek på errors om errors er tom.
        if (!errors.isEmpty()) {
            // hvis errors ikke er tom render siden med fejl beskeden.
            // return res.status(422).json({
            //     errors: errors.array()
            // });

            console.log(errors.array());

            let errorMessages = [];
            errors.array().forEach (errorItem => {
                errorMessages.push (errorItem.msg);
            });

            console.log(errorMessages);

            res.render('pages/kontakt', {
               fejlbeskeder: errorMessages,
               navn: req.body.navn,
               email: req.body.email,
               mobil: req.body.mobil,
               titel: req.body.titel,
               besked: req.body.besked
            });
        } else {
            // TODO: Mangler validering
            let values = [];
            values.push(req.body.navn);
            values.push(req.body.email);
            values.push(req.body.mobil);
            values.push(req.body.titel);
            values.push(req.body.besked);
            console.log(values);

            // TODO: db.execute må kun køre, hvis valideringen er ok
            db.execute('insert into kontaktinfo set navn = ?, email = ?, mobil = ?, titel = ?, besked = ?', values, (err, rows) => {
                if (err) {
                    console.log("fejl")
                    console.log(err);
                    res.json(500, {
                        "message": "Internal Server Error",
                        "error": err
                    })
                } else {
                    console.log("ingen fejl i insert kontaktinfo")
                    res.json(200, {
                        "message": "Data indsat"
                    })
                }
            })
        }
    }); // afslutter route



}