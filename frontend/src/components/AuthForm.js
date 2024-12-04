import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/image5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative max-w-md mx-auto p-8 bg-white bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl animate-fadeIn">
        <Form method="post" className="space-y-6">
          <h1 className="text-3xl font-bold text-black text-center">
            {isLogin ? "Log in" : "Create a new user"}
          </h1>
          {data && data.errors && (
            <ul className="text-red-500 list-disc list-inside">
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && (
            <p className="text-yellow-500">{data.message}</p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-peach-400 bg-opacity-70 text-white focus:ring-2 focus:ring-peach-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-peach-400 bg-opacity-70 text-white focus:ring-2 focus:ring-peach-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              className="text-sm text-black hover:underline"
            >
              {isLogin ? "Create new user" : "Login"}
            </Link>
            <button
              disabled={isSubmitting}
              className={`px-6 py-2 bg-peach-500 text-white font-semibold rounded-lg focus:outline-none ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-peach-600 transform hover:scale-105 transition-transform"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;
