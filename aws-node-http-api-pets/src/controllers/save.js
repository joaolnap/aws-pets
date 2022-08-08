const { create } = require('../services/pets-service');
const { formatError, formatResponse, serialize } = require('../helpers/format-utils');
const { bodyValidator } = require('../helpers/body-validator');

module.exports.handler = async (event, context) => {
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

        await create(canonical);
        
        return formatResponse(201, serialize(canonical));

    } catch (error) {
        console.error(`[PET-CONTROLLER][FIND-BY-ID][ERROR]`, error);

        return formatError(500, error);
    }
}