import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'WEARGRAM | Wear Your Favorite Instagram Moments',
  description:
    'Turn creator-authorized Instagram moments, memes, Reels, and frames into premium 3D customizable streetwear merchandise. Powered by official Meta APIs.',
  openGraph: {
    title: 'WEARGRAM — Your Favorite Instagram Moments. Now You Can Wear Them.',
    description: 'Interactive 3D creator streetwear platform. Officially licensed drops directly from top creators.',
    images: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface-void text-white min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
