import { ListTablesCommand, DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { UpdateCommand,PutCommand,DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
const client = new DynamoDBClient({ region: "ap-south-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
    const command = new ScanCommand({
        TableName: "Tasks",
        ExpressionAttributeNames: { "#name": "name" },
        ProjectionExpression: "id, #name, completed",
    })

    const response = await docClient.send(command)
    return response
}

export const createTask = async ({ name, completed }) => {
    const uuid = crypto.randomUUID()
    const command = new PutCommand({
        TableName: "Tasks",
        Item: {
            id: uuid,
            name,
            completed
        }
    })
    const response = await docClient.send(command)
    return response
}
export const updateTasks = async ({ id, name, completed }) => {
    const command = new UpdateCommand({
        TableName: "Tasks",
        Key: {
            id
        },
        UpdateExpression: "set #name = :n, completed = :c",
        ExpressionAttributeNames: { "#name": "name" },
        ExpressionAttributeValues: {
            ":n": name,
            ":c": completed
        },
        ReturnValues: "ALL_NEW"
    })
    const response = await docClient.send(command)
    return response
}

export const deleteTasks = async ( id ) => {
    const command = new DeleteCommand({
        TableName: "Tasks",
        Key: {
            id: id
        }
    })
    const response = await docClient.send(command)
    return response
}