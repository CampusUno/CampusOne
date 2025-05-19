import { useState } from "react";
import Logo from "../../components/common/Logo";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted successfully");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto flex w-screen flex-col-reverse md:h-screen md:flex-row">
      <div className="bg-linear-to-br from-secondary to-primary flex-2 relative m-4 flex flex-col items-center justify-center gap-2 rounded-xl py-16 md:py-0">
        <h1 className="text-accent mb-4 w-2/3 text-center text-xl font-bold leading-9 md:w-3/5 md:text-2xl">
          Galgotias Student Platform - live your best college life
        </h1>
        <p className="mb-8 max-w-xs text-center text-xs text-gray-300">
          Explore and engage with students of the college and spark interesting
          conversations, follow club updates and find exciting opportunities.
        </p>
        <img
          src="/signup.png"
          alt="Profile page of CampusOne"
          className="w-xs sm:w-md m-0 sm:max-w-sm"
        />
      </div>
      <div className="flex-3 flex items-center justify-center p-16 md:p-0">
        {/* This form is of size xs  */}
        <form
          className="mx-auto flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-4 flex max-w-max gap-1.5 text-2xl font-medium">
            Join <Logo />
          </h1>
          {/* <p className="mb-8 max-w-xs text-xs">
            Find all the updates from the GCET clubs, the professors and the
            college under one roof and never miss out on exciting opportunities
            and possibilities.
          </p> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleInputChange}
            value={formData.email}
            required
          />
          {/* <div className="validator-hint">Enter valid email address</div> */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            onChange={handleInputChange}
            value={formData.username}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={handleInputChange}
            value={formData.fullName}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleInputChange}
            value={formData.password}
            required
          />
          <p className="my-2.5 block max-w-xs text-center text-xs text-gray-400">
            By signing up you confirm that you agree to our{" "}
            <a href="" className="font-semibold underline">
              Terms of Service
            </a>{" "}
            and our{" "}
            <a href="" className="font-semibold underline">
              Privacy Policy
            </a>
          </p>
          <button className="btn btn-primary w-xs">Create account</button>
          <p className="max-w-xs pt-4 text-center text-gray-600">
            Already a member?{" "}
            <a href="" className="text-info font-semibold">
              Sign in
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
