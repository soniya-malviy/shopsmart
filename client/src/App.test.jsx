import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

describe('App', () => {
    it('renders ShopSmart title', () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ status: 'ok', message: 'Test', timestamp: 'now' })
            })
        );

        render(<App />);
        expect(screen.getByText(/ShopSmart/i)).toBeInTheDocument();
    });

    it('shows loading state initially', () => {
        global.fetch = vi.fn(() => new Promise(() => {}));

        render(<App />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('displays backend status when data loads', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ status: 'ok', message: 'Test', timestamp: 'now' })
            })
        );

        render(<App />);
        await vi.waitFor(() => {
            expect(screen.getByText(/ok/i)).toBeInTheDocument();
        });
    });
});
