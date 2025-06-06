import { STATUS_CODE, METHOD } from "../../../support/api/api-const";
import API from "../../../support/ApiUrls";
import * as Authorization from "../../../support/authorization";


context("Tags", { tags: ['tags', 'thirdPool', 'all'] }, () => {
    const SRUsername = Cypress.env('SRUser');
    const tagName = "tagSchemaAPI";
    const tagId = "d0e99e70-3511-486668e-bf6f-10041e9a0cb7" + Math.floor(Math.random() * 999999);
    let schemaId, schemaCreator, schemaUuid;

    before(() => {
        //create tag schema for edit
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: METHOD.POST,
                url: API.ApiServer + API.Tags + "schemas",
                headers: {
                    authorization,
                },
                body: {
                    "userDID": null,
                    "uuid": tagId,
                    "hash": "",
                    "name": tagName,
                    "description": tagName,
                    "status": "DRAFT",
                    "readonly": false,
                    "system": false,
                    "active": false,
                    "document": {
                        "$id": "#" + tagId,
                        "$comment": "{ \"@id\": \"#\"" + tagId + ", \"term\": " + tagId + " }",
                        "title": tagName,
                        "description": tagName,
                        "type": "object",
                        "properties": {
                            "@context": {
                                "oneOf": [
                                    {
                                        "type": "string"
                                    },
                                    {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                ],
                                "readOnly": true
                            },
                            "type": {
                                "oneOf": [
                                    {
                                        "type": "string"
                                    },
                                    {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                ],
                                "readOnly": true
                            },
                            "id": {
                                "type": "string",
                                "readOnly": true
                            }
                        },
                        "required": [
                            "@context",
                            "type"
                        ],
                        "additionalProperties": false,
                        "$defs": {}
                    },
                    "context": null,
                    "version": "",
                    "creator": "",
                    "owner": "",
                    "messageId": "",
                    "documentURL": "",
                    "contextURL": "",
                    "iri": "",
                    "fields": [],
                    "category": "TAG"
                },
                timeout: 200000
            }).then((response) => {
                schemaId = response.body.id;
                schemaCreator = response.body.owner;
                schemaUuid = response.body.uuid;
            });
        })
    })

    it("Update the schema with the provided schema ID", () => {
        //edit tag schema
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: METHOD.PUT,
                url: API.ApiServer + API.Tags + "schemas/" + schemaId,
                body: {
                    "userDID": null,
                    "_id": schemaId,
                    "id": schemaId,
                    "uuid": schemaUuid,
                    "hash": "",
                    "name": tagName + "1",
                    "description": tagName + "1",
                    "status": "DRAFT",
                    "readonly": false,
                    "system": false,
                    "active": false,
                    "version": "",
                    "creator": schemaCreator,
                    "owner": schemaCreator,
                    "messageId": "",
                    "documentURL": "",
                    "contextURL": "",
                    "iri": "#" + schemaUuid,
                    "category": "TAG",
                    "document": {
                        "$id": "#" + schemaUuid,
                        "$comment": "{ \"@id\": \"#\"" + schemaUuid + ", \"term\":" + schemaUuid + " }",
                        "title": tagName + "1",
                        "description": tagName + "1",
                        "type": "object",
                        "properties": {
                            "@context": {
                                "oneOf": [
                                    {
                                        "type": "string"
                                    },
                                    {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                ],
                                "readOnly": true
                            },
                            "type": {
                                "oneOf": [
                                    {
                                        "type": "string"
                                    },
                                    {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        }
                                    }
                                ],
                                "readOnly": true
                            },
                            "id": {
                                "type": "string",
                                "readOnly": true
                            }
                        },
                        "required": [
                            "@context",
                            "type"
                        ],
                        "additionalProperties": false,
                        "$defs": {}
                    },
                    "context": null,
                    "type": schemaUuid,
                    "fields": [],
                    "conditions": []
                },
                headers: {
                    authorization,
                },
                timeout: 200000
            }).then((response) => {
                expect(response.status).to.eq(STATUS_CODE.OK);
            });
        })
    })

    it("Update the schema with the provided schema ID without auth token - Negative", () => {
        cy.request({
            method: METHOD.PUT,
            url: API.ApiServer + API.Tags + "schemas/" + schemaId,
            body: {
                "userDID": null,
                "_id": schemaId,
                "id": schemaId,
                "uuid": schemaUuid,
                "hash": "",
                "name": tagName + "1",
                "description": tagName + "1",
                "status": "DRAFT",
                "readonly": false,
                "system": false,
                "active": false,
                "version": "",
                "creator": schemaCreator,
                "owner": schemaCreator,
                "messageId": "",
                "documentURL": "",
                "contextURL": "",
                "iri": "#" + schemaUuid,
                "category": "TAG",
                "document": {
                    "$id": "#" + schemaUuid,
                    "$comment": "{ \"@id\": \"#\"" + schemaUuid + ", \"term\":" + schemaUuid + " }",
                    "title": tagName + "1",
                    "description": tagName + "1",
                    "type": "object",
                    "properties": {
                        "@context": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ],
                            "readOnly": true
                        },
                        "type": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ],
                            "readOnly": true
                        },
                        "id": {
                            "type": "string",
                            "readOnly": true
                        }
                    },
                    "required": [
                        "@context",
                        "type"
                    ],
                    "additionalProperties": false,
                    "$defs": {}
                },
                "context": null,
                "type": schemaUuid,
                "fields": [],
                "conditions": []
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eql(STATUS_CODE.UNAUTHORIZED);
        });
    });

    it("Update the schema with the provided schema ID with invalid auth token - Negative", () => {
        cy.request({
            method: METHOD.PUT,
            url: API.ApiServer + API.Tags + "schemas/" + schemaId,
            body: {
                "userDID": null,
                "_id": schemaId,
                "id": schemaId,
                "uuid": schemaUuid,
                "hash": "",
                "name": tagName + "1",
                "description": tagName + "1",
                "status": "DRAFT",
                "readonly": false,
                "system": false,
                "active": false,
                "version": "",
                "creator": schemaCreator,
                "owner": schemaCreator,
                "messageId": "",
                "documentURL": "",
                "contextURL": "",
                "iri": "#" + schemaUuid,
                "category": "TAG",
                "document": {
                    "$id": "#" + schemaUuid,
                    "$comment": "{ \"@id\": \"#\"" + schemaUuid + ", \"term\":" + schemaUuid + " }",
                    "title": tagName + "1",
                    "description": tagName + "1",
                    "type": "object",
                    "properties": {
                        "@context": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ],
                            "readOnly": true
                        },
                        "type": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ],
                            "readOnly": true
                        },
                        "id": {
                            "type": "string",
                            "readOnly": true
                        }
                    },
                    "required": [
                        "@context",
                        "type"
                    ],
                    "additionalProperties": false,
                    "$defs": {}
                },
                "context": null,
                "type": schemaUuid,
                "fields": [],
                "conditions": []
            },
            headers: {
                authorization: "Bearer wqe",
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eql(STATUS_CODE.UNAUTHORIZED);
        });
    });

    it("Update the schema with the provided schema ID with empty auth token - Negative", () => {
        cy.request({
            method: METHOD.PUT,
            url: API.ApiServer + API.Tags + "schemas/" + schemaId,
            body: {
                "userDID": null,
                "_id": schemaId,
                "id": schemaId,
                "uuid": schemaUuid,
                "hash": "",
                "name": tagName + "1",
                "description": tagName + "1",
                "status": "DRAFT",
                "readonly": false,
                "system": false,
                "active": false,
                "version": "",
                "creator": schemaCreator,
                "owner": schemaCreator,
                "messageId": "",
                "documentURL": "",
                "contextURL": "",
                "iri": "#" + schemaUuid,
                "category": "TAG",
                "document": {
                    "$id": "#" + schemaUuid,
                    "$comment": "{ \"@id\": \"#\"" + schemaUuid + ", \"term\":" + schemaUuid + " }",
                    "title": tagName + "1",
                    "description": tagName + "1",
                    "type": "object",
                    "properties": {
                        "@context": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ],
                            "readOnly": true
                        },
                        "type": {
                            "oneOf": [
                                {
                                    "type": "string"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ],
                            "readOnly": true
                        },
                        "id": {
                            "type": "string",
                            "readOnly": true
                        }
                    },
                    "required": [
                        "@context",
                        "type"
                    ],
                    "additionalProperties": false,
                    "$defs": {}
                },
                "context": null,
                "type": schemaUuid,
                "fields": [],
                "conditions": []
            },
            headers: {
                authorization: "",
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eql(STATUS_CODE.UNAUTHORIZED);
        });
    });
})
