import logo from "../assets/logo.svg";
import specular from "../assets/specular.svg";
const Topbar = () => {
  return (
    <div className="w-full bg-custom-light-blue h-fit custom-light-blue">
      <div className="w-full flex justify-center ">
        <div className="w-full max-w-6xl flex items-center justify-around px-6 py-3">
          <div className="flex items-center space-x-2">
            <select className="p-1 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mr-32">
              <option>English</option>
              <option>عربي</option>
            </select>
          </div>
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <img
          src={specular}
          alt="Specular Logo"
          className="h-32"
        />
      </div>
      <div className="text-center mt-6">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Track Your Order
        </h1>
      </div>
    </div>
  );
};

export default Topbar;
