import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const episodeList = {
    id: 1, 
    image: null, 
    name: 'super strange', 
    season: 1, 
    number: 12, 
    summary: 'this is my summary', 
    runtime: 43
}

test("renders without error", () => { 
    render(<Episode episode= {episodeList}/>)
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode ={episodeList}/>)

    const summary= screen.queryByTestId('summaryTest')

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent('this is my summary');
})

test("renders default image when image is not defined", () => { render(<Episode episode ={episodeList}/>)
    
const imgDefault = 'https://i.ibb.co/2FsfXqM/stranger-things.png'
const img = screen.queryByRole('img')
const altText = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')


expect(img).toBeInTheDocument()
expect(img).toHaveAttribute('src', imgDefault)
expect(altText).toHaveAttribute('alt', imgDefault)

 });
