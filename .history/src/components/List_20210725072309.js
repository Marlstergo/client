import React from "react";
import { motion } from "framer-motion";
import UserRow from "./UserRow";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectEmployeesDetail } from "../redux/user/user.selector";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
    transition: {
      staggerChildren: 0.5,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      staggerChildren: 0.4,
      when: "beforeChildren",
    },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
// const containerVariants = {
//   hidden: {
//     opacity: 0,
//     x: "100vw",
//     transition: {
//       staggerChildren: 0.5,
//     },
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       type: "spring",
//       mass: 0.4,
//       damping: 8,
//       staggerChildren: 0.4,
//       when: "beforeChildren",
//     },
//   },
// };


const List = ({ allEmployees }) => {
  console.log(allEmployees.length);
  return (
    <motion.div
      className="  pb-4 mb-4 border-b-2 border-gray-400 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-10/12 ">
        <h1 className="text-gray-600 py-6 text-4xl">List of all Users</h1>

        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead>
            <tr>
              <th className="px-6 py-3 w-1/12 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className=" px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            </tr>
            {allEmployees.map((user, idx) => (
              <UserRow
                key={idx}
                name={user.name}
                id={user._id}
                email={user.email}
                phone={user.phone}
              />
            ))}
          </thead>
        </table>
      </div>
    </motion.div>
  );
};

const mapStateToProps = createStructuredSelector({
  allEmployees: selectEmployeesDetail,
});

export default connect(mapStateToProps)(List);
