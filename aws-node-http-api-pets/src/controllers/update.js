const { bodyValidator } = require('../helpers/body-validator')
const { updatePet, retrieve } = require('../services/pets-service')
const { formatError, formatResponse, serialize } = require('../helpers/format-utils')

module.exports.handler = async (event, context, callback) => {
    try {
        console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
        console.log('## CONTEXT: ' + serialize(context));
        console.log('## EVENT: ' + serialize(event));

        if (!event.body) {
            const message = 'Please include a JSON valid';

            return formatResponse(406, serialize({ message }));
        };

        const canonical = JSON.parse(event.body);

        const errors = bodyValidator(canonical);

        if (errors.length > 0) {
            console.log('## ERRORS: ' + serialize(errors));
            return formatResponse(422, serialize(errors));
        };

        console.log('## PET AS CANONICAL: ' + serialize(canonical));

        const fetchedPet = await retrieve(event.pathParameters.id);

        if (!fetchedPet) {
            const message = `Couldn't fetch this id '${event.pathParameters.id}' from ` + process.env.TABLE_NAME;
            return formatResponse(404, serialize({ message }));
        };

        fetchedPet.name = canonical.name;
        fetchedPet.breed = canonical.breed;
        fetchedPet.weigth = canonical.weigth;
        fetchedPet.year = canonical.year;
        fetchedPet.month = canonical.month;
        fetchedPet.day = canonical.day;

        await updatePet(fetchedPet);

        console.log('## FETCHED PET: ' + serialize(fetchedPet));

        return formatResponse(200, serialize(fetchedPet));

    } catch (error) {
        console.error(`[PET-CONTROLLER][UPDATE][ERROR]`, error);
        
        return formatError(500, error);
    };
}