import { render, screen } from '@testing-library/react';

import PokemonDetailPage from '@/pages/pokemon-detail';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Pokemon detail page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<PokemonDetailPage />);

      const heading = screen.getByRole('heading', {
        name: /Pokemon Detail/,
      });

      expect(heading).toBeInTheDocument();
    });

    it('should have link tag with text Pokemon List', () => {
      render(<PokemonDetailPage />);

      const link = screen.getByRole('link', {
        name: /Pokemon List/,
      });

      expect(link).toBeInTheDocument();
    });

    it('should have button tag with text Capture Pokemon', () => {
      render(<PokemonDetailPage />);

      const button = screen.getByRole('button', {
        name: /Capture Pokemon/,
      });

      expect(button).toBeInTheDocument();
    });
  });
});
