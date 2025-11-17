// src/app/signin/page.tsx
import dynamic from 'next/dynamic';
const AuthForm = dynamic(() => import('../../components/AuthForm'), { ssr: false });

export default function SignInPage() {
  return (
    <section className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold">Sign in</h2>
      <div className="mt-6">
        <AuthForm />
      </div>
    </section>
  );
}
