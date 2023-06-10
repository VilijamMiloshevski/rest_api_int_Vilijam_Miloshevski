import { createCar, deleteCar, deleteDeletedCar, getNonExistingCar, updateCar } from "../steps/car.js"

it('Scenarios', () => {
    describe('Create car', () => {
        createCar()
    })
    describe("Update car", () => {
        createCar()
        updateCar()
    })
    describe('Delete car', () => {
        createCar()
        deleteCar()
    })
    describe('Remove already removed car', () => {
        createCar()
        deleteCar()
        deleteDeletedCar()
    })
    describe('Get non existing car', () => {
        getNonExistingCar()
    })
})