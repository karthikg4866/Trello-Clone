
// [{"_id":"5ea30d31df042c32fc9055d1","title":"Board 1","__v":0},{"_id":"5ea3d46229795412082a02da","title":"New board 1","__v":0},{"_id":"5ea3d83629795412082a02de","title":"New board","__v":0}]

describe('All APIs', function() {
  let board1;
  let column1;
  let column2;

  it('To Add new board', () => {
    cy.request({url:'http://localhost:3001/board',method:'POST',
    body:{
      title: "New board by Cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log(JSON.stringify(resp.body.data));
    });
  })

  it('To get all boards on init', () => {
    cy.request({url:'http://localhost:3001/board',method:'GET',headers:{
      'Content-Type':  'application/json',
       'Accept': 'application/json'
    }}).then((resp) => {
        expect(resp.body).to.not.be.null;
        expect(resp.body.data).to.have.length.of.at.least(1);
        resp.body.data.forEach(function (item,index) {
         if(index==0) board1 = item;
        });
    });
  })
  it('To get board details', () => {
    cy.request({url:'http://localhost:3001/board/'+board1['_id'],method:'GET'
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('all columns in ' + board1['title'] + ':' +JSON.stringify(resp.body.data));
    });
  })

  it('To get all columns in board', () => {
    cy.request({url:'http://localhost:3001/board/'+board1['_id']+'/columns',method:'GET'
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('all columns in ' + board1['title'] + ':' +JSON.stringify(resp.body.data));
    });
  })

  it('To get all cards in board', () => {
    cy.request({url:'http://localhost:3001/board/'+board1['_id']+'/cards',method:'GET'
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('all cards in ' + board1['title'] + ':' +JSON.stringify(resp.body.data));
    });
  })

  it('To Add column in board' , () => {
    cy.request({url:'http://localhost:3001/column',method:'POST',
    body:{
      boardId: board1['_id'],
      order: 1000,
      title: "Test Column by cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
        expect(resp.body).to.not.be.null;
        column1 = resp.body.data;
      cy.log('Added column in board' + board1['title'], JSON.stringify(resp.body.data));
    });
  })

  it('To Add card in board', () => {
    cy.request({url:'http://localhost:3001/card',method:'POST',
    body:{
      boardId: board1['_id'],
      columnId : column1['_id'],
      order: 1000,
      title: "Test card by cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('Added card in board' + board1['title'] + 'and in column '+column1['title'], JSON.stringify(resp.body.data));
    });
  })

  it('To Added one more column in board', () => {
    cy.request({url:'http://localhost:3001/column',method:'POST',
    body:{
      boardId: board1['_id'],
      order: 3000,
      title: "Test Column 2 by cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      expect(resp.body).to.not.be.null;
      column2 = resp.body.data;
      cy.log('Added column 2 in board' + board1['title'], JSON.stringify(resp.body.data));
    });
  })

  it('To Add one more card in board', () => {
    cy.request({url:'http://localhost:3001/card',method:'POST',
    body:{
      boardId: board1['_id'],
      columnId : column2['_id'],
      order: 3000,
      title: "Test card 2  by cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('Added card 2 in board' + board1['title'] + 'and in column '+column2['title'], JSON.stringify(resp.body.data));
    });
  })

  it('To update column in board' , () => {
    cy.request({url:'http://localhost:3001/column/'+column1['_id'],method:'PUT',
    body:{
      boardId: board1['_id'],
      order: 3000,
      title: "Updated Test Column 2 by cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('Updated column 2 in board' + board1['title']+ 'and in column '+column1['title'], JSON.stringify(resp.body.data));
    });
  })

  it('To update card in board', () => {
    cy.request({url:'http://localhost:3001/card/'+column1['_id'],method:'PUT',
    body:{
      boardId: board1['_id'],
      order: 3000,
      title: "Updated Test card 2 by cypress"
    }
    ,headers:{
      'Content-Type':  'application/json',
    'Accept': 'application/json'
    }}).then((resp) => {
      cy.log('Updated card 2 in board' + board1['title']+ 'and in column '+column1['title'], JSON.stringify(resp.body.data));
    });
  })

})
