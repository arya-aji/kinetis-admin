import React from 'react';

interface Employee {
  name: string;
  nip_bps: string;
}

const employees: Employee[] = [
  { name: "John Doe", nip_bps: "123456789" },
  { name: "Jane Smith", nip_bps: "987654321" },
];

const EmployeeCard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Pegawai</h1>
      <div className="flex flex-wrap gap-4">
        {employees.map((employee) => (
          <div key={employee.nip_bps} className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 w-64">
            <img
              src={`/images/${employee.nip_bps}.jpg`}
              alt={employee.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{employee.name}</h2>
            <p className="text-gray-600 text-center">{employee.nip_bps}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCard;

