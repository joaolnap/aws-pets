const { findAll, findById, saveOrUpdate, remove } = require('../repositories/pets-repository');
const { v4: uuidv4 } = require('uuid');

const list = async () => {
    return await findAll();
};

const retrieve = async (id) => {
    return await findById(id);
};

const create = async (pet) => {
    const currentDateTime = new Date().toISOString();

    pet.id = uuidv4();
    pet.activate = true;
    pet.createdAt = currentDateTime;
    pet.updatedAt = currentDateTime;
    
    console.log("I arrived in service");
    return await saveOrUpdate(pet);
};

const updatePet  = async (pet) => {
    pet.updatedAt = new Date().toISOString();

    return await saveOrUpdate(pet);
};

const removePet = async (pet) => {
    pet.activate = false;
    pet.updatedAt = new Date().toISOString();

    return await saveOrUpdate(pet);
};


module.exports = {
    list,
    retrieve,
    create,
    updatePet,
    removePet
}