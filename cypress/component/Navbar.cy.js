import Navbar from '@/components/Navbar.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock stores
import { useSidebarStore } from '@/stores/sidebar.stores'
import { useFolderStore } from '@/stores/folder.stores'

describe('Navbar Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    // Mock sidebar store
    const sidebar_store = useSidebarStore()
    sidebar_store.is_mobile_expanded = false

    // Mock folder store
    const folder_store = useFolderStore()
    folder_store.path = [
      { id: 1, name: 'Folder 1' },
      { id: 2, name: 'Folder 2' },
    ]
    folder_store.goHome = cy.stub().as('goHome')
    folder_store.goToFolder = cy.stub().as('goToFolder')
  })

  it('renders without crashing', () => {
    cy.mount(Navbar)
    cy.contains('Home').should('exist')
    cy.get('input[placeholder="Search..."]').should('exist')
  })

  it('clicking Home triggers goHome', () => {
    cy.mount(Navbar)
    cy.contains('Home').click()
    cy.get('@goHome').should('have.been.called')
  })

  it('renders breadcrumb path', () => {
    cy.mount(Navbar)
    cy.contains('Folder 1').should('exist')
    cy.contains('Folder 2').should('exist')
  })

  it('clicking breadcrumb triggers goToFolder', () => {
    cy.mount(Navbar)
    cy.contains('Folder 1').click()
    cy.get('@goToFolder').should('have.been.calledWith', 0)
    cy.contains('Folder 2').click()
    cy.get('@goToFolder').should('have.been.calledWith', 1)
  })

  it('updates search value', () => {
    cy.mount(Navbar)
    cy.get('input[placeholder="Search..."]').type('test')
    cy.get('input').should('have.value', 'test')
  })
})
