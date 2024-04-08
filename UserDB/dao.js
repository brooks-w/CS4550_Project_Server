import model from './model.js';

export const createUser = (user) => {
    delete user._id;
    return model.create(user);
}
export const findAllUsers = () => model.find();
export const findUserById = (userID) => model.findById(userID);
export const findUserByUsername = (username) => model.findOne({username: username});
export const findUserByCredentials = (username, password) => model.findOne({username, password});
export const updateUser = (userID, user) => model.updateOne({_id: userID}, {$set: user});
export const deleteUser = (userID) => model.deleteOne({_id: userID});
