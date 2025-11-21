import MovieCardContainer, {TEST_ID} from './MovieCardContainer';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

describe('MovieCardContainer test suite', () => {
    
    // Test for verifying the onClick callback is executed
    it('should call the onClick prop when the container is clicked', async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();

        // render the component
        render(
            <MovieCardContainer onClick={mockOnClick}>
                <div>Some test content</div>
            </MovieCardContainer>
        );

        // find the container using the reliable data-testid
        const containerElement = screen.getByTestId(TEST_ID);

        // simulate a user click on the container
        await user.click(containerElement);

        // verify the mock function was called exactly once
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});