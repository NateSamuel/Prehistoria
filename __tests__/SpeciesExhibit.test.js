import { fireEvent, render } from '@testing-library/react-native';
import SpeciesExhibit from '../componentsForTesting/SpeciesExhibitScreen';

test('test that the species screen can be rendered', () => {
  const { getByText, getByTestId } = render(<SpeciesExhibit />);


  expect(getByText('Species Exhibit')).toBeTruthy();

});

test('test to display the species data correctly', () => {
  const { getByText } = render(<SpeciesExhibit />);


  expect(getByText('Australopithecus Afarensis')).toBeTruthy();
  expect(getByText('Time Period: 3.7 million to 3 million years ago')).toBeTruthy();
  expect(getByText('Male: 151 cm, 42 kg, Female: 105 cm, 29kg')).toBeTruthy();
});

test('test to navigate between species', () => {
  const { getByTestId } = render(<SpeciesExhibit />);

  const leftButton = getByTestId('left-arrow-button');
  const rightButton = getByTestId('right-arrow-button');

  fireEvent.press(rightButton);

  fireEvent.press(leftButton);

});