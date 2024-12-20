import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
import API from "../../../support/ApiUrls";
import * as Authorization from "../../../support/authorization";


context("Tags", { tags: ['tags', 'thirdPool'] }, () => {
    const tagName = "moduleTagAPI" + Math.floor(Math.random() * 999999);
    const moduleName = "moduleNameAPI" + Math.floor(Math.random() * 999999);
    const SRUsername = Cypress.env('SRUser');
    let tagId;
    let moduleId;

    before(() => {
        //create module and tag for tag deletion
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: METHOD.POST,
                url: API.ApiServer + API.ListOfAllModules,
                headers: {
                    authorization,
                },
                body: {
                    "name": moduleName,
                    "description": moduleName,
                    "menu": "show",
                    "config": {
                        "blockType": "module"
                    }
                },
            }).then((response) => {
                moduleId = response.body.id;
                cy.request({
                    method: METHOD.POST,
                    url: API.ApiServer + API.Tags,
                    body: {
                        name: tagName,
                        description: tagName,
                        entity: "Module",
                        target: moduleId,
                    },
                    headers: {
                        authorization,
                    }
                }).then((response) => {
                    tagId = response.body.uuid;
                })
            });
        })
    });


    it("Delete tag(module)", () => {
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: 'DELETE',
                url: API.ApiServer + API.Tags + tagId,
                headers: {
                    authorization,
                }
            }).then((response) => {
                expect(response.status).to.eq(STATUS_CODE.OK)
            })
        })
    })
})
