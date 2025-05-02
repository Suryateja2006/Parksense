// AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
// import AdminNavbar from './AdminNavbar';
import { Car } from 'lucide-react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSlots: 0,
    bookedSlots: 0,
    unauthorizedParking: 0,
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [unauthorizedParking, setUnauthorizedParking] = useState([]);
  const [activeTab, setActiveTab] = useState('Faculty');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
        const bookedSlotsRes = await axios.get('http://localhost:5000/api/admin/booked-slots');
        const unauthorizedRes = await axios.get('http://localhost:5000/api/admin/unauthorized-parking');

        setStats(statsRes.data);
        setBookedSlots(bookedSlotsRes.data);
        setUnauthorizedParking(unauthorizedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const facultySlots = bookedSlots.filter(slot => slot.userType === 'faculty');
  const studentSlots = bookedSlots.filter(slot => slot.userType === 'student');

  return (
    <div className="bg-black text-white min-h-screen p-4 pt-16">
      {/* <AdminNavbar /> */}
      <div className="pt-20 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-base sm:text-xl mb-6">Manage parking slots and monitor activity</p>

        {/* Stat Boxes */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {[{
            title: 'Total Slots',
            value: stats.totalSlots,
            description: 'Parking slots available',
            color: 'text-white'
          }, {
            title: 'Booked Slots',
            value: stats.bookedSlots,
            description: 'Currently occupied',
            color: 'text-blue-500'
          }, {
            title: 'Unauthorized Parking',
            value: stats.unauthorizedParking,
            description: 'Requires attention',
            color: 'text-red-500'
          }].map((item, idx) => (
            <div key={idx} className="bg-zinc-950 p-6 sm:p-10 rounded-lg transform transition-all hover:scale-105 border border-white/20 shadow-lg">
              <h2 className="text-xl sm:text-2xl">{item.title}</h2>
              <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-gray-400 mt-4">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 p-1">
          {['Faculty', 'Student', 'Unauthorized'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-base sm:text-lg font-semibold rounded-lg transition-transform transform hover:scale-90 ${
                activeTab === tab ? 'bg-zinc-950' : 'bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'Faculty' && (
            <div>
              <h2 className="text-xl sm:text-2xl mb-4">Faculty Parking Slots</h2>
              <div className="bg-zinc-800 p-4 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                  <thead>
                    <tr className="border-b text-sm sm:text-lg">
                      {['Slot ID', 'Name', 'Car Number', 'Phone Number', 'Actions'].map(header => (
                        <th key={header} className="px-4 py-3 text-gray-400 uppercase tracking-wide whitespace-nowrap">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {facultySlots.map(slot => (
                      <tr key={slot.slotId} className="border-b hover:bg-zinc-900">
                        <td className="px-4 py-4">{slot.slotId}</td>
                        <td className="px-4 py-4">{slot.name}</td>
                        <td className="px-4 py-4">{slot.carNumber}</td>
                        <td className="px-4 py-4">{slot.phoneNumber}</td>
                        <td className="px-4 py-4">
                          <button onClick={() => setSelectedUser(slot)} className="text-blue-400 hover:underline">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Student' && (
            <div>
              <h2 className="text-xl sm:text-2xl mb-4">Student Parking Slots</h2>
              <div className="bg-zinc-800 p-4 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                  <thead>
                    <tr className="border-b text-sm sm:text-lg">
                      {['Slot ID', 'Name', 'Car Number', 'Phone Number', 'Actions'].map(header => (
                        <th key={header} className="px-4 py-3 text-gray-400 uppercase tracking-wide whitespace-nowrap">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {studentSlots.map(slot => (
                      <tr key={slot.slotId} className="border-b hover:bg-zinc-900">
                        <td className="px-4 py-4">{slot.slotId}</td>
                        <td className="px-4 py-4">{slot.name}</td>
                        <td className="px-4 py-4">{slot.carNumber}</td>
                        <td className="px-4 py-4">{slot.phoneNumber}</td>
                        <td className="px-4 py-4">
                          <button onClick={() => setSelectedUser(slot)} className="text-blue-400 hover:underline">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Unauthorized' && (
            <div>
              <h2 className="text-xl sm:text-2xl mb-4">Unauthorized Parking</h2>
              <div className="bg-zinc-800 p-4 rounded-lg shadow-lg overflow-x-auto">
                {unauthorizedParking.length > 0 ? (
                  <table className="min-w-full table-auto text-left">
                    <thead>
                      <tr className="border-b text-sm sm:text-lg">
                        {['Slot ID', 'Car Number', 'Reported At', 'Actions'].map(header => (
                          <th key={header} className="px-4 py-3 text-gray-400 uppercase tracking-wide whitespace-nowrap">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {unauthorizedParking.map(entry => (
                        <tr key={entry.slotId} className="border-b hover:bg-zinc-900">
                          <td className="px-4 py-4">{entry.slotId}</td>
                          <td className="px-4 py-4">{entry.carNumber}</td>
                          <td className="px-4 py-4">{entry.time}</td>
                          <td className="px-4 py-4">
                            <button className="text-red-400">Report</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-400">No unauthorized parking detected</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[90%] sm:w-[80%] md:w-[50%] shadow-lg relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-4 text-red-400 hover:text-white text-5xl">
              ×
            </button>
            <Car className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl sm:text-3xl font-bold mb-4 text-blue-500">User Details</h2>
            <p className="text-xl"><strong>Name:</strong> {selectedUser.name}</p>
            <p className="text-xl"><strong>Car Number:</strong> {selectedUser.carNumber}</p>
            <p className="text-xl"><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
            <p className="text-xl"><strong>Slot ID:</strong> {selectedUser.slotId}</p>
            <p className="text-xl"><strong>User Type:</strong> {selectedUser.userType}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;