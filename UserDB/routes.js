import * as dao from './dao.js';

export default function UserRoutes(app) {
    const createUser = async (req, res) => { 
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const updateUser = async (req, res) => { 
        const userID  = req.params.userId;
        const status = await dao.updateUser(userID, req.body);
        const currentUser = await dao.findUserById(userID);
        res.json(status);
    };
    const signup = async (req, res) => { 
        const user = await dao.findUserByUsername(req.body.username);
        //console.log(user);
        if (user) {
          res.status(400).json(
            { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => { 
        const {username, password} = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        } else {
            res.sendStatus(401);
        }
    };
    const signout = async (req, res) => { 
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => { 
        const currentUser = req.session['currentUser'];
        if (!currentUser) {
            res.sendStatus(401);
            return
        } else {
            res.json(currentUser);
        }
    };
    const findUserByUsername = async (req, res) => {
        const user = await dao.findUserByUsername(req.params.username);
        res.json(user);
      };
    
    app.post('/api/users', createUser);
    app.put('/api/users/:userId', updateUser);    
    app.post('/api/users/signup', signup);
    app.post('/api/users/signin', signin);
    app.post('/api/users/signout', signout);
    app.post('/api/users/profile', profile);
    app.get('/api/users/:username', findUserByUsername);

}
