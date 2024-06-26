export class SmartTable {

    //add table
    addInputsToTable(name, lastName){
            cy.get('thead .nb-plus').click()
            cy.get('thead').find('tr').eq(2).then(items => {
                cy.wrap(items).find('[placeholder="First Name"]').type(name)
                cy.wrap(items).find('[placeholder="Last Name"]').type(lastName)
                cy.wrap(items).find('[class="nb-checkmark"]').click()
    
            })
            cy.get('tbody tr').first().find('td').then(items => {
                cy.wrap(items).eq(2).should('contain', name)
                cy.wrap(items).eq(3).should('contain', lastName)
            })
    }
    
    //delete
    deleteInputsToTable(index){
            const stub = cy.stub()
            cy.on('window:confirm', stub)
            cy.get('tbody tr').eq(index).find('.nb-trash').click().then(()=>{
                expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
            }) 
    }
    //modify age
    modifyAgeInputInTable(name, day){
            cy.get('tbody').contains('tr', name).then(items =>{
                cy.wrap(items).find('[class="nb-edit"]').click()
                cy.wrap(items).find('[placeholder="Age"]').click().clear().type(day)
                cy.wrap(items).find('[class="nb-checkmark"]').click()
                cy.wrap(items).find('td').eq('6').should('contain', day)
            })
    }
    
}

export const onSmartTable = new SmartTable();