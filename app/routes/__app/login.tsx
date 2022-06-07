import LoginForm from "~/components/login-form";

export default function Index() {
  return (
    <div className="p-8 max-w-sm mx-auto">
      <main>
        <h1 className="font-bold text-gray-900 text-2xl mb-4">Login</h1>
        <LoginForm action="/login" />
      </main>
    </div>
  );
}
