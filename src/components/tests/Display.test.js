import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow'

jest.mock('../../api/fetchShow')

const show = {
    name: 'stranger things' ,
    summary: 'this is my summary',
    seasons: [
        {id:0, name: "lovely", episodes: [1, 2, 3]},
        {id:1, name: "never change", episodes: [1, 2, 3]},
        {id:2, name: "breathless charm", episodes: [1, 2, 3]},
    ]
}

test('renders without errors with no props', async () => {
    render(<Display />)
 });

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(show)
    const {rerender} = render(<Display />)
    let showContainer = screen.queryByTestId('show-container')
    const showData = screen.queryByText(/get show data/i)
    expect(showContainer).toBeNull()
    expect(showData).toBeVisible()
    userEvent.click(showData)
    // rerender(<Display show = {show} />)
    showContainer= await screen.findByTestId('show-container');
    expect(showContainer).toBeVisible()
 });

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(show);
    render(<Display />)
    let showContainer = screen.queryByTestId('show-container')
    const showData = screen.queryByText(/get show data/i)
    expect(showContainer).toBeNull()
    expect(showData).toBeVisible()
    userEvent.click(showData)

    await waitFor(() => {
        const showList = screen.queryAllByTestId('season-option')
        // console.log(showList)
        expect(showList).toHaveLength(3)
    })
});
