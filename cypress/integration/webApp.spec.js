
describe('Web Test Scenarios', function() {
  let board1;
  let rootURL = 'http://localhost:3001';
  let webURL = 'http://localhost:4200';
  it('Navigate To url', () => {
    cy.visit(webURL);
  })
  it('Add new board click', () => {
    cy.get('.add-board').click();
    cy.request({url:rootURL+'/board',method:'GET',headers:{
      'Content-Type':  'application/json',
       'Accept': 'application/json'
    }}).then((resp) => {
        expect(resp.body).to.not.be.null;
        expect(resp.body.data).to.have.length.of.at.least(1);
        resp.body.data.forEach(function (item,index) {
         if(index==0) board1 = item;
        });
        cy.visit(webURL+'/b/'+ board1['_id']);
    });
  })
  it('Trello button click back to dashboard screen', () => {
      cy.get('.dashboardBtn').click();
    })
    it('Add Column in board',() => {
      cy.visit(webURL+'/b/'+ board1['_id']);
      cy.get('.edit-column-hr').click().then(()=>{
        cy.get('.edit-column').type('New Column WebApp cypress').blur();
      })
    })
    it('Add card in board',() => {
       cy.get('.add-card-div').click().then(()=>{
         cy.get('.add-card-input').type('New card WebApp cypress').blur();
       })
     })

    it('Edit card in board',() => {
      cy.get('.edit-card-li').click().then(()=>{
        cy.get('.edit-card-ta').type('Edit card WebApp cypress').blur();
      })
    })
});
