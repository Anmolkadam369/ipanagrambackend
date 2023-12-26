const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const userModel = require('../models/managerModel')
const employeeModel = require("../models/employeeModel")
const { param } = require('../route/route')

const authentication = (req, res, next) => {
    try {
        let token = req.headers['authorization']
        console.log("authjs",token, req.body)
        if (!token) {
            return res.status(400).send({ status: false, message: "Token not present" })
        }

        token = token.split(" ")

        console.log(token[1])

        jwt.verify(token[1], 'project', function (err, decoded) {
            if (err) return res.status(401).send({ status: false, message: err.message })

            else {
                req.userId = decoded.userId
                console.log("some", req.userId);
                next()
            }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const authorization = async (req, res, next) => {
    try {
        let tokenId = req.userId
        let paramUserId = req.params.userId
        console.log(paramUserId)

        if (paramUserId) {
            if (!isValidObjectId(paramUserId)) {
                return res.status(400).send({ status: false, message: "invalid user id" })
            }
            let userData = await userModel.findById(paramUserId)
            console.log(userData)
            if (!userData) {
                return res.status(404).send({ status: false, message: "No user found for this UserId" })
            }

            if (paramUserId != tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorised User Access" })
            }
        }
        console.log("final")
        req.userId = paramUserId;
        next()

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const authorizationForEmployee = async (req, res, next) => {
    try {
        let tokenId = req.userId
        let paramUserId = req.params.userId
        console.log(paramUserId)

        if (paramUserId) {
            if (!isValidObjectId(paramUserId)) {
                return res.status(400).send({ status: false, message: "invalid user id" })
            }
            let userData = await employeeModel.findById(paramUserId)
            console.log(userData)
            if (!userData) {
                return res.status(404).send({ status: false, message: "No user found for this UserId" })
            }

            if (paramUserId != tokenId) {
                return res.status(403).send({ status: false, message: "Unauthorised User Access" })
            }
        }
        console.log("final")
        req.userId = paramUserId;
        next()

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { authentication, authorization, authorizationForEmployee }