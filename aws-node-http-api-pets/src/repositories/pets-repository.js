const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const findAll = async () => {
    const params = {
        TableName,
        FilterExpression: '#act = :activate',
        ExpressionAttributeNames: { '#act': 'activate', },
        ExpressionAttributeValues: { ':activate': true }
    };

    console.log("I arrived at the repository");

    const items = await dynamoDb.scan(params).promise();

    return items.Items ? items.Items : undefined;
};

const findById = async (id) => {
    const params = {
        TableName,
        Key: { 'id': id }
    };
    const item = await dynamoDb.get(params).promise();
    const pets = item.Item ? item.Item : undefined;
    return pets && pets.activate ? pets : undefined;
};

const saveOrUpdate = async (pet) => {
    const params = {
        TableName,
        Item: { ...pet }
    }
    return await dynamoDb.put(params).promise();
};

async function remove(id) {
    const params = {
        TableName,
        Key: { 'id': id },
        ConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id }
    };
    return await dynamoDb.delete(params).promise();
}

module.exports = {
    findAll,
    findById,
    saveOrUpdate,
    remove
};


