import FolderTree from '../../src/components/FolderTree.vue'

describe('FolderTree.vue', () => {
  const folders = [{ id: 1, name: 'L1' }, { id: 2, name: 'L2' }]

  it('renders folder names', () => {
    cy.mount(FolderTree, {
      props: {
        folders,
        selectedId: null,
        onSelect: () => {},
        fetchFolders: async () => [],
      },
    })

    cy.contains('L1').should('exist')
    cy.contains('L2').should('exist')
  })

  it('toggles folder on double click', () => {
    let fetched = false
    cy.mount(FolderTree, {
      props: {
        folders,
        selectedId: null,
        onSelect: () => {},
        fetchFolders: async () => { fetched = true; return [] },
      },
    })

    cy.contains('L1').dblclick().then(() => {
      expect(fetched).to.be.true
    })
  })
})
