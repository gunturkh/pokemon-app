import { render, screen } from '@testing-library/react';

import PokemonListPage from '@/pages/pokemon-list';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Pokemon detail page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<PokemonListPage />);

      const heading = screen.getByRole('heading', {
        name: /My Pokemon List/,
      });

      expect(heading).toBeInTheDocument();
    });

    it('should have link tag with text Pokemon List', () => {
      render(<PokemonListPage />);

      const link = screen.getByRole('link', {
        name: /Pokemon List/,
      });

      expect(link).toBeInTheDocument();
    });

  });
});
