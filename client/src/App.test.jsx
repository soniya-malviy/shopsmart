import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './components/ProductList';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ProductList', () => {
    let mockFetch;

    beforeEach(() => {
        mockFetch = vi.fn();
        global.fetch = mockFetch;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows loading state', async () => {
        mockFetch.mockImplementation(() => new Promise(() => {}));

        render(<ProductList />);
        expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
    });

    it('displays products from API', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, name: 'Test Product', price: 100, category: 'Test', inStock: true }
            ])
        });

        render(<ProductList />);
        await waitFor(() => {
            expect(screen.getByText('Test Product')).toBeInTheDocument();
        });
    });

    it('shows search input', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([])
        });

        render(<ProductList />);
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
        });
    });

    it('shows stock status badges', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, name: 'In Stock Item', price: 100, category: 'Test', inStock: true },
                { id: 2, name: 'Out of Stock Item', price: 100, category: 'Test', inStock: false }
            ])
        });

        render(<ProductList />);
        await waitFor(() => {
            expect(screen.getByText('In Stock')).toBeInTheDocument();
            expect(screen.getByText('Out of Stock')).toBeInTheDocument();
        });
    });

    it('shows product price', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, name: 'Test Product', price: 12999, category: 'Electronics', inStock: true }
            ])
        });

        render(<ProductList />);
        await waitFor(() => {
            expect(screen.getByText('$12999')).toBeInTheDocument();
        });
    });
});
