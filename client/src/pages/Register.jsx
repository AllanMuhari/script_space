import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await axios.post("http://localhost:3000/api/auth/register", values);
            alert("Registration successful. Please login.");
            navigate("/login");
          } catch (error) {
            console.error("Failed to register", error);
            setErrors({ submit: "Registration failed. Please try again." });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
              <Field
                name="name"
                type="text"
                className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            {errors.submit && <div className="text-red-500 mb-4">{errors.submit}</div>}
            <button
              type="submit"
              className="bg-blue-500 w-full p-3 rounded text-white font-semibold hover:bg-blue-600 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

