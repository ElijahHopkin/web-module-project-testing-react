import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const show = {
    name: 'stranger things' ,
    summary: 'this is my summary',
    seasons: [
        {id:0, name: "lovely", episodes: [1, 2, 3]},
        {id:1, name: "never change", episodes: [1, 2, 3]},
        {id:2, name: "breathless charm", episodes: [1, 2, 3]},
    ]
}

test('renders without errors', () => { 
    render(<Show />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show = {null} selectedSeason= {'none'}/>)
    const loading = screen.queryByTestId('loading-container')
    expect(loading).toBeInTheDocument()
 });

test('renders same number of options seasons are passed in', () => {
    render(<Show show = {show} selectedSeason= {'none'} />)
    const showList = screen.queryAllByTestId('season-option')
    expect(showList).toHaveLength(3);
 });

test('handleSelect is called when an season is selected', async () => {
    render(<Show show = {show} selectedSeason= {'none'} />)
    const selectedSeason = screen.queryAllByTestId('season-option');
    userEvent.click(selectedSeason[1])
    const seasonName = screen.queryByText('never change');
    expect(seasonName).toBeVisible()

 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} =render(<Show show = {show} selectedSeason= {'none'} />);
    let episodesContainer = screen.queryByTestId('episodes-container')
    expect(episodesContainer).toBeNull()

    rerender(<Show show = {show} selectedSeason= {0} />)
    episodesContainer= screen.queryByTestId('episodes-container');
    expect(episodesContainer).toBeInTheDocument();
 });
