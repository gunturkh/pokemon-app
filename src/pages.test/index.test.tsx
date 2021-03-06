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

    it('should have link tag with text My Pokemon List', () => {
      render(<Index />);

      const link = screen.getByRole('link', {
        name: /My Pokemon List/,
      });

      expect(link).toBeInTheDocument();
    });

    it('should have button tag with text << Previous', () => {
      render(<Index />);

      const button = screen.getByRole('button', {
        name: /<< Previous/,
      });

      expect(button).toBeInTheDocument();
    });

    it('should have button tag with text Next >>', () => {
      render(<Index />);

      const button = screen.getByRole('button', {
        name: /Next >>/,
      });

      expect(button).toBeInTheDocument();
    });
  });
});
