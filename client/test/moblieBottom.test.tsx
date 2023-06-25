
const mockPageContext = {
     user: {
       _id: '62f886f66d3e42bd697be79c',
       userName: 'testuser',
       profilePicture: 'profile.jpg',
     },
   };
   
import { PageContext } from '../pages/context/AuthContext';
import MobileBottomNav from '../pages/components/MobileBottomNav';

// Wrap the component with a test provider
<PageContext.Provider value={mockPageContext}>
  <MobileBottomNav />
</PageContext.Provider>

import { render } from '@testing-library/react';

test('renders MobileBottomNav component', () => {
  const { getByText } = render(
    <PageContext.Provider value={mockPageContext}>
      <MobileBottomNav />
    </PageContext.Provider>
  );

  // Perform assertions on the rendered component
  // For example:
 // expect(getByText('Home')).toBeInTheDocument();
});