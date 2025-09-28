 import React, { useState } from "react";
import video from '../../assets/152740-803732906.mp4'
import { useNavigate } from 'react-router-dom'
import './farmerlog.css'

export default function FarmerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    farmSize: "",
    crops: [],
    organic: "",
    smartphone: "",
    internet: "",
    sellTo: [],
    problems: [],
    wants: [],
    learning: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value);
        return { ...prev, [name]: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.farmSize ||
      !formData.smartphone ||
      formData.crops.length === 0 ||
      formData.sellTo.length === 0 ||
      formData.wants.length === 0
    ) {
      alert("⚠️ Please fill all required fields and selections.");
      return;
    }

    setSubmitted(true);
    console.log("Form Submitted:", formData);
  };

  if (submitted) {
    return (
      <div className="container">
        <div className="background-video">
          <video className="Nav_background_vedio" loop autoPlay muted playsInline>
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <div className="success-message">
          ✅ Thank you! Your registration has been submitted successfully. <span onClick={() => navigation("/")} style={{ color: "red", cursor: "pointer" }}>click me</span> to go home page.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="background-video">
        <video className="Nav_background_vedio" loop autoPlay muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className="header">
        <h1>🌾 Farmer Registration</h1>
        <p>Join Blockchain Supply Chain</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="section">
          <h3>👤 Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">
              Village/Address <span className="required">*</span>
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Farm Details */}
        <div className="section">
          <h3>🚜 Farm Details</h3>
          <div className="form-group">
            <label htmlFor="farmSize">
              Farm Size <span className="required">*</span>
            </label>
            <select
              id="farmSize"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              required
            >
              <option value="">Select Size</option>
              <option value="small">Small (&lt; 2 acres)</option>
              <option value="medium">Medium (2-10 acres)</option>
              <option value="large">Large (&gt; 10 acres)</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              What do you grow? <span className="required">*</span>
            </label>
            <div className="checkbox-group">
              {["rice", "wheat", "vegetables", "fruits", "pulses", "other"].map(
                (crop) => (
                  <div className="checkbox-item" key={crop}>
                    <input
                      type="checkbox"
                      id={`crops-${crop}`}
                      name="crops"
                      value={crop}
                      checked={formData.crops.includes(crop)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`crops-${crop}`}>{crop}</label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Organic Farming?</label>
            <div className="radio-group">
              {["yes", "no", "partial"].map((option) => (
                <div className="radio-item" key={option}>
                  <input
                    type="radio"
                    id={`organic-${option}`}
                    name="organic"
                    value={option}
                    checked={formData.organic === option}
                    onChange={handleChange}
                  />
                  <label htmlFor={`organic-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="section">
          <h3>📱 Technology</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="smartphone">
                Have Smartphone? <span className="required">*</span>
              </label>
              <select
                id="smartphone"
                name="smartphone"
                value={formData.smartphone}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="internet">Internet Access?</label>
              <select
                id="internet"
                name="internet"
                value={formData.internet}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="good">Good</option>
                <option value="poor">Poor</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selling & Problems */}
        <div className="section">
          <h3>💰 Selling & Problems</h3>
          <div className="form-group">
            <label>
              Where do you sell? <span className="required">*</span>
            </label>
            <div className="checkbox-group">
              {["market", "middleman", "cooperative", "direct"].map((sell) => (
                <div className="checkbox-item" key={sell}>
                  <input
                    type="checkbox"
                    id={`sellTo-${sell}`}
                    name="sellTo"
                    value={sell}
                    checked={formData.sellTo.includes(sell)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`sellTo-${sell}`}>{sell}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Main Problems?</label>
            <div className="checkbox-group">
              {[
                { value: "low_price", label: "Low Prices" },
                { value: "delayed_payment", label: "Late Payments" },
                { value: "no_buyers", label: "No Direct Buyers" },
                { value: "quality_issues", label: "Quality Disputes" },
              ].map((problem) => (
                <div className="checkbox-item" key={problem.value}>
                  <input
                    type="checkbox"
                    id={`problems-${problem.value}`}
                    name="problems"
                    value={problem.value}
                    checked={formData.problems.includes(problem.value)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`problems-${problem.value}`}>{problem.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wants */}
        <div className="section">
          <h3>🎯 What You Want</h3>
          <div className="form-group">
            <label>
              What would help you most? <span className="required">*</span>
            </label>
            <div className="checkbox-group">
              {[
                { value: "better_price", label: "Better Prices" },
                { value: "direct_buyers", label: "Direct Buyers" },
                { value: "fast_payment", label: "Quick Payments" },
                { value: "quality_proof", label: "Prove Quality" },
              ].map((want) => (
                <div className="checkbox-item" key={want.value}>
                  <input
                    type="checkbox"
                    id={`wants-${want.value}`}
                    name="wants"
                    value={want.value}
                    checked={formData.wants.includes(want.value)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`wants-${want.value}`}>{want.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Interested in learning new technology?</label>
            <div className="radio-group">
              {[
                { value: "yes", label: "Yes, very much" },
                { value: "maybe", label: "Maybe, with help" },
                { value: "no", label: "Not interested" },
              ].map((learn) => (
                <div className="radio-item" key={learn.value}>
                  <input
                    type="radio"
                    id={`learning-${learn.value}`}
                    name="learning"
                    value={learn.value}
                    checked={formData.learning === learn.value}
                    onChange={handleChange}
                  />
                  <label htmlFor={`learning-${learn.value}`}>{learn.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Registration
        </button>
      </form>
    </div>
  );
}
