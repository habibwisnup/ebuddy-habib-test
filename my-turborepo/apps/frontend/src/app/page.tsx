"use client"; // 👈 Tambahkan ini di baris paling atas

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect user ke halaman register saat pertama kali mengunjungi localhost:3000
    router.push('/register');
  }, [router]);

  return null; // Tidak ada UI, hanya mengarahkan ke halaman lain
}
