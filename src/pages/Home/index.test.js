// import { sum } from "./"

// test('Ma fonction sum', () => {
//     const result = sum(3,7)
//     expect(result).toBe(10)
// })

import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Home from './'
import { ThemeProvider } from '../../utils/context'

describe('The Home component', () => {
    it('should render title', () => {
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Home/>
                </ThemeProvider>
            </MemoryRouter>
        )
        expect(screen.getByText( 'heading', { 
            level: 2,
            text: 
                "Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents",
            })
        ).toBeTruthy()
        // screen.debug()
    })
})