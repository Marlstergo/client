import React, { useEffect } from "react";
import { motion } from "framer-motion";

import UserRowHome from "./userRowhome";
import { selectEmployeesDetail } from "../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAllEmployees } from "../redux/user/user.action";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};


const Home = ({ allEmployees, getAllEmployees }) => {

  useEffect(() => {
    const getDetails = async () => {
      await getAllEmployees();
    };
    getDetails();


  }, [getAllEmployees]);
  return (
    <motion.div
      className="  pb-4 mb-4 border-b-2 border-gray-400 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-3/4 ">
        <h1 className="text-gray-600 py-6 text-4xl">List of all Users</h1>

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
            </tr>
            {allEmployees.map((employee) => (
              <UserRowHome
                name={employee.name}
                key={employee.id}
                id={employee._id}
                email={employee.email}
                phone={employee.phone}
              />
            ))}
          </thead>
        </table>
      </div>
    </motion.div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getAllEmployees: () => dispatch(getAllEmployees()),
});
const mapStateToProps = createStructuredSelector({
  allEmployees: selectEmployeesDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
