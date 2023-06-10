import { expect } from "chai"
import { request } from "../utils/request.js"
import getNestedValue from "get-nested-value"

export async function createCar() {
    it('Create car', async function () {
        const body = {
            "brand": "BMW",
            "color": "Black",
            "fuel": "Diesel",
            "gearbox": "Manual"
        }

        const response = await request('POST', '/car', body, 201)

        expect(getNestedValue('brand', response.body), 'Checking brand is BMW').to.be.equal('BMW')
        expect(getNestedValue('color', response.body), 'Checking brand is BMW').to.be.equal('Black')
        expect(getNestedValue('fuel', response.body), 'Checking brand is BMW').to.be.equal('Diesel')
        expect(getNestedValue('gearbox', response.body), 'Checking brand is BMW').to.be.equal('Manual')

        global.executionVariables = {}
        global.executionVariables['carId'] = getNestedValue('_id', response.body)
    })
}
export async function deleteCar() {
    it('Delete car', async function () {
        const carId = global.executionVariables['carId']
        const response = await request('DELETE', `/car/${carId}`, undefined, 200)
    })
}
export async function deleteDeletedCar() {
    it('Delete car', async function () {
        const carId = global.executionVariables['carId']
        const response = await request('DELETE', `/car/${carId}`, undefined, 404)
    })
}
//export async function updateCar() {
//it('Update car', async function () {
//    const body = [
// { "op": "replace", "path": "brand", "value": "Mercedes" }
// { op: "add", path: "color", value: "Yellow" },
// { op: "remove", path: "color", value: "Black" }
//  ]
//  const carId = global.executionVariables['carId']

// const response = await request('PATCH', `/car/${carId}`, body, 200)
//  })
//}
export async function updateCar() {
    it('Update car', async function () {
        const body = {
            "brand": "Mercedes",
            "color": "White",
            "fuel": "Hybrid",
            "gearbox": "Automatic"
        }
        const carId = global.executionVariables['carId']

        const response = await request('PUT', `/car/${carId}`, body, 200)

        expect(getNestedValue('brand', response.body), 'Checking brand is updated').not.to.be.equal('BMW')
        expect(getNestedValue('color', response.body), 'Checking color is updated').not.to.be.equal('Black')
        expect(getNestedValue('fuel', response.body), 'Checking fuel is updated').not.to.be.equal('Diesel')
        expect(getNestedValue('gearbox', response.body), 'Checking gearbox is updated').not.to.be.equal('Manual')

    })
}

export async function getNonExistingCar() {
    it('Get car non existing car')
    const response = await request('GET', '/car/flyingcar', undefined, 404)
}
