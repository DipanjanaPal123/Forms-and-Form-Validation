import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  showPassword: false,
  countryCode: "",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

function FormPage() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const countries = {
    India: ["Delhi", "Mumbai", "Bangalore","Kolkata"],
    USA: ["New York", "San Francisco", "Chicago","California"],
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First Name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last Name is required";
    if (!formData.username.trim()) errs.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.password || formData.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (!formData.countryCode.trim()) errs.countryCode = "Country code required";
    if (!/^\d{10}$/.test(formData.phone)) errs.phone = "Phone number must be 10 digits";
    if (!formData.country) errs.country = "Country is required";
    if (!formData.city) errs.city = "City is required";
    if (!formData.pan.trim()) errs.pan = "PAN NUMBER is required";
    if (!/^\d{12}$/.test(formData.aadhar)) errs.aadhar = "Aadhar NUMBER must be 12 digits";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Registration Form</h2>
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      {errors.firstName && <div className="error">{errors.firstName}</div>}

      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      {errors.lastName && <div className="error">{errors.lastName}</div>}

      <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      {errors.username && <div className="error">{errors.username}</div>}

      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      {errors.email && <div className="error">{errors.email}</div>}

      <input
        name="password"
        type={formData.showPassword ? "text" : "password"}
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <label>
        <input type="checkbox" name="showPassword" checked={formData.showPassword} onChange={handleChange} /> Show Password
      </label>
      {errors.password && <div className="error">{errors.password}</div>}

      <input name="countryCode" placeholder="Country Code" value={formData.countryCode} onChange={handleChange} />
      {errors.countryCode && <div className="error">{errors.countryCode}</div>}

      <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
      {errors.phone && <div className="error">{errors.phone}</div>}

      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {Object.keys(countries).map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      {errors.country && <div className="error">{errors.country}</div>}

      <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
        <option value="">Select City</option>
        {(countries[formData.country] || []).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {errors.city && <div className="error">{errors.city}</div>}

      <input name="pan" placeholder="PAN Number" value={formData.pan} onChange={handleChange} />
      {errors.pan && <div className="error">{errors.pan}</div>}

      <input name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange} />
      {errors.aadhar && <div className="error">{errors.aadhar}</div>}

      <button type="submit" disabled={Object.keys(validate()).length > 0}>Submit</button>
    </form>
  );
}

export default FormPage;
