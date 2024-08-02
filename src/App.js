import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [packets, setPackets] = useState([]);

    useEffect(() => {
        const fetchPackets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/packets');
                setPackets(response.data);
            } catch (error) {
                console.error("Error fetching packets", error);
            }
        };
        fetchPackets();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Network Packet Dashboard</h1>
            </header>
            <main>
                <h2>Captured Packets</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Source IP</th>
                            <th>Destination IP</th>
                            <th>Protocol</th>
                            <th>Length</th>
                            <th>Payload</th>
                            <th>Raw Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packets.map((packet, index) => (
                            <tr key={index}>
                                <td>{new Date(packet.timestamp * 1000).toLocaleString()}</td>
                                <td>{packet.src_ip}</td>
                                <td>{packet.dst_ip}</td>
                                <td>{packet.protocol}</td>
                                <td>{packet.length}</td>
                                <td>{packet.payload || 'N/A'}</td>
                                <td>{packet.raw_data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default App;
