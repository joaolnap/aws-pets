const { retrieve, removePet } = require('../services/pets-service');
const { formatError, formatResponse, serialize } = require('../helpers/format-utils');

module.exports.handler = async (event, context, callback) => {
    try {
        console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
        console.log('## CONTEXT: ' + serialize(context));
        console.log('## EVENT: ' + serialize(event));

        const fetchedPet = await retrieve(event.pathParameters.id);

        if (Array.isArray(fetchedPet) && !fetchedPet.length) {
            const message = `The '${process.env.TABLE_NAME}' resource is empty `;

            return formatResponse(404, serialize({ message }));
        };
        console.log("Pet to be deleted:", fetchedPet);

        await removePet(fetchedPet);

        console.log('## FETCHED PET: ' + serialize(fetchedPet));

        return formatResponse(200, serialize(fetchedPet));

    } catch (error) {
        console.error(`[PET-CONTROLLER][FIND-ALL][ERROR]`, error);

        return formatError(500, error);
    }
}