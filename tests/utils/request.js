import supertest from "supertest"
import { expect } from "chai"

export async function request(method, endpoint, body, statusCode) {
    const requestExecutor = supertest('https://crudcrud.com/api/a8305fd00a2d4bd181b23c2468fd8f10')

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    //  const patchHeaders = {
    //      'Content-Type': 'application/json-patch+json',
    //      'Accept': 'application/json'
    //  }

    let response = null

    switch (method) {
        case 'GET':
            response = await requestExecutor.get(endpoint).set(headers)
            await validateStatusCode(response.statusCode, statusCode)

            break
        case 'POST':
            response = await requestExecutor.post(endpoint).send(body).set(headers)
            await validateStatusCode(response.statusCode, statusCode)

            break
        case 'PUT':
            response = await requestExecutor.put(endpoint).send(body).set(headers)
            await validateStatusCode(response.statusCode, statusCode)

            break
        case 'PATCH':
            response = await requestExecutor.patch(endpoint).send(body).set(headers)
            await validateStatusCode(response.statusCode, statusCode)

            break
        case 'DELETE':
            response = await requestExecutor.delete(endpoint).send(body).set(headers)
            await validateStatusCode(response.statusCode, statusCode)

            break
        default:
            console.log('method is not valid')
    }

    return response
}

async function validateStatusCode(actual, expected) {
    expect(actual).to.be.equal(expected)
}