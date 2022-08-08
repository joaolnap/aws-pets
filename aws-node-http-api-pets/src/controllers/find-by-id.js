const { retrieve } = require('../services/pets-service');
const { formatError, formatResponse, serialize } = require('../helpers/format-utils');

module.exports.handler = async (event, context) => {
    try {
        console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
        console.log('## CONTEXT: ' + serialize(context));
        console.log('## EVENT: ' + serialize(event));

        const fetchedPet = await retrieve(event.pathParameters.id);

        if(!fetchedPet) {
            const message = `Couldn't fetch this id '${event.pathParameters.id}' from ` + process.env.TABLE_NAME;
            
            return formatResponse(404, serialize( { message } ));
        };

        console.log('## FETCHED PET: ' + serialize(fetchedPet));

        return formatResponse(200, serialize(fetchedPet));

    } catch (error) {
        console.error(`[PET-CONTROLLER][FIND-BY-ID][ERROR]`, error);

        return formatError(500, error);
    }
}