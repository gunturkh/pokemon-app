import { render, screen } from '@testing-library/react';

import Index from '@/pages/index';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Index page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<Index />);

      const heading = screen.getByRole('heading', {
        name: /Pokemon App/,
      });

      expect(heading).toBeInTheDocument();
    });

    it('should have button tag with text capture pokemon', () => {
      render(<Index />);

      const button = screen.getByRole('button', {
        name: /capture pokemon/,
      });

      expect(button).toBeInTheDocument();
    });

    it('should have button tag with text release pokemon', () => {
      render(<Index />);

      const button = screen.getByRole('button', {
        name: /release pokemon/,
      });

      expect(button).toBeInTheDocument();
    });
  });
});
