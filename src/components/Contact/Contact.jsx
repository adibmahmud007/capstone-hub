const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have questions, feedback, or want to collaborate with us? We’d love to hear from you!
      </p>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Email</p>
          <p className="text-blue-700">support@opensapace.edu</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Phone</p>
          <p className="text-blue-700">+880-1234-567890</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Campus Address</p>
          <p className="text-gray-700">Department of CSE, Open University Campus, Dhaka, Bangladesh</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Office Hours</p>
          <p className="text-gray-700">Sunday - Thursday: 9:00 AM – 5:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
