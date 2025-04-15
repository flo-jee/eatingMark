function toRad(value) {
  return (value * Math.PI) / 180;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

// 🔥 가까운 순으로 정렬!
export function sortPlacesByDistance(places, lat, lon) {
  if (!Array.isArray(places)) {
    console.warn("❗️정렬할 place 리스트가 배열이 아닙니다:", places);
    return []; // 배열이 아니면 빈 배열 반환
  }
  const sorted = [...places];
  sorted.sort((a, b) => {
    const distA = calculateDistance(lat, lon, a.lat, a.lon);
    const distB = calculateDistance(lat, lon, b.lat, b.lon);
    return distA - distB;
  });
  return sorted;
}
