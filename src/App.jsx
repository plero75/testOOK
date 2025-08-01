import { useEffect, useState } from 'react'
import { fetchNextDepartures } from './api/prim'

// Composant principal du dashboard
export default function App() {
  const [departures, setDepartures] = useState([]);

  // Chargement initial des données de transport
  useEffect(() => {
    async function load() {
      const data = await fetchNextDepartures('STIF:StopArea:SP:43135:');
      setDepartures(data?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit || []);
    }

    load(); // premier chargement
    const interval = setInterval(load, 60000); // rechargement toutes les minutes

    return () => clearInterval(interval); // nettoyage
  }, []);

  return (
    <div className="p-4 space-y-6 max-w-screen-lg mx-auto">
      <header className="text-center text-white bg-blue-800 py-4 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold">Dashboard Vincennes</h1>
        <p className="text-sm">{new Date().toLocaleString('fr-FR')}</p>
      </header>

      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold text-blue-800 mb-2">🚆 RER A – Prochains départs</h2>
        <ul className="space-y-1">
          {departures.map((item, idx) => (
            <li key={idx}>
              ➡️ {item.MonitoredVehicleJourney?.DirectionName} : {item.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}