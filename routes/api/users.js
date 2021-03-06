const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const passport = require('passport');


router.get("/test", (req, res) => {
    res.json({ msg: "This is the users route" })
});


router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        playthrough: req.user.playthrough,
        progress: req.user.progress,
        sanity: req.user.sanity

    });
})

router.patch('/', (req, res) => {
    const email = req.body.email;
    const saneChange = req.body.sanity;
    
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(408).json({email: 'This user does not exist'});
        }
        user.sanity = user.sanity + saneChange;
        user.progress += 1
        user.save()
        res.json(user)
        
      })
})

router.patch('/resetSanity', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(408).json({ email: 'This user does not exist' });
            }
            user.sanity = 0
            user.playthrough += 1
            user.progress = 0
            user.save()
            res.json(user)
        })
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already taken"})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    playthrough: 0,
                    progress: 0,
                    sanity: 0
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser.save()
                        .then(user => res.json(user))
                        // .catch(err => console.log(err)); brad commented out 10/22
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({email: 'email not found'})
            } 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch){
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            playthrough: user.playthrough,
                            progress: user.progress,
                            sanity: user.sanity
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    } else {
                        res.status(400).json({ password: 'invalid credentials'})
                    }
                })
        })
})

module.exports = router;