import { METHOD, STATUS_CODE } from "../../../support/api/api-const";
import API from "../../../support/ApiUrls";
import * as Authorization from "../../../support/authorization";

context("Delete Module", { tags: ['modules', 'thirdPool', 'all'] }, () => {

    const SRUsername = Cypress.env('SRUser');
    const UserUsername = Cypress.env('User');
    const moduleName = Math.floor(Math.random() * 999) + "APIModule";

    let moduleId;

    before("Create module for delete", () => {
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: METHOD.POST,
                url: API.ApiServer + API.ListOfAllModules,
                headers: {
                    authorization,
                },
                body: {
                    name: moduleName,
                    description: moduleName,
                    config: {
                        blockType: "module"
                    }
                },
            }).then((response) => {
                expect(response.status).eql(STATUS_CODE.SUCCESS);
                moduleId = response.body.uuid;
            });
        })
    });

    it("Deletes the module with the provided module ID with invalid artifact id - Negative", () => {
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: METHOD.DELETE,
                url: API.ApiServer + API.ListOfAllModules + "21231231321321321",
                headers: {
                    authorization,
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).eql(STATUS_CODE.ERROR);
                expect(response.body.message).eql("Invalid module");
            })
        });
    });

    it("Deletes the module with the provided module ID without auth token - Negative", () => {
        cy.request({
            url: API.ApiServer + API.ListOfAllModules + moduleId,
            method: METHOD.DELETE,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eql(STATUS_CODE.UNAUTHORIZED);
        });
    });

    it("Deletes the module with the provided module ID with invalid auth token - Negative", () => {
        cy.request({
            url: API.ApiServer + API.ListOfAllModules + moduleId,
            method: METHOD.DELETE,
            headers: {
                authorization: "Bearer wqe",
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eql(STATUS_CODE.UNAUTHORIZED);
        });
    });

    it("Deletes the module with the provided module ID with empty auth token - Negative", () => {
        cy.request({
            url: API.ApiServer + API.ListOfAllModules + moduleId,
            method: METHOD.DELETE,
            headers: {
                authorization: "",
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eql(STATUS_CODE.UNAUTHORIZED);
        });
    });

    it("Deletes the module with the provided module ID by user", () => {
        Authorization.getAccessToken(UserUsername).then((authorization) => {
            cy.request({
                url: API.ApiServer + API.ListOfAllModules + moduleId,
                method: METHOD.DELETE,
                headers: {
                    authorization,
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).eql(STATUS_CODE.FORBIDDEN);
            });
        });
    });

    it("Deletes the module with the provided module ID", { tags: ['smoke'] }, () => {
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                url: API.ApiServer + API.ListOfAllModules + moduleId,
                method: METHOD.DELETE,
                headers: {
                    authorization,
                },
            }).then((response) => {
                expect(response.status).eql(STATUS_CODE.OK);
            });
        })
    });

    it("Verify deletion", () => {
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                method: METHOD.GET,
                url: API.ApiServer + API.ListOfAllModules,
                headers: {
                    authorization,
                },
            }).then((response) => {
                expect(response.status).eql(STATUS_CODE.OK);
                response.body.forEach(item => {
                    if (item.name === moduleName)
                        throw new Error("Deleted module exist!")
                })
            })
        });
    })

    it("Deletes already deleted module - Negative", () => {
        Authorization.getAccessToken(SRUsername).then((authorization) => {
            cy.request({
                url: API.ApiServer + API.ListOfAllModules + moduleId,
                method: METHOD.DELETE,
                headers: {
                    authorization,
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).eql(STATUS_CODE.ERROR);
                expect(response.body.message).eql("Invalid module");
            });
        })
    });
});
