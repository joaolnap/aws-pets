const { list } = require('../services/pets-service');
const { formatError, formatResponse, serialize } = require('../helpers/format-utils');

module.exports.handler = async (event, context, callback) => {
    try {
        console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
        console.log('## CONTEXT: ' + serialize(context));
        console.log('## EVENT: ' + serialize(event));

        const pets = await list();

        if (Array.isArray(pets) && !pets.length) {
            const message = `The '${process.env.TABLE_NAME}' resource is empty `;

            return formatResponse(404, serialize({ message }));
        };
        
        console.log('## PETS: ' + serialize(pets));

        return formatResponse(200, serialize(pets));

    } catch (error) {
        console.error(`[PET-CONTROLLER][FIND-ALL][ERROR]`, error);

        return formatError(500, error);
    }
}