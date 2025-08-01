// Fichier de service pour interroger l’API PRIM (via proxy)

const proxyBase = "https://ratp-proxy.hippodrome-proxy42.workers.dev?url=";

// Récupération des prochains passages à un arrêt donné (via StopMonitoring)
export async function fetchNextDepartures(stopId) {
  try {
    const res = await fetch(proxyBase + encodeURIComponent(
      `https://prim.iledefrance-mobilites.fr/marketplace/v2/stop-monitoring?MonitoringRef=${stopId}`
    ));
    return await res.json();
  } catch (err) {
    console.error("Erreur API StopMonitoring", err);
    return null;
  }
}