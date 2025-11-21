const leaderboardList = [
  {
    name: "Kianna Torff",
    points: 10,
    interviewsTaken: 69,
    avatar: "https://i.pravatar.cc/150?u=Kianna",
  },
  {
    name: "Abram Mango",
    points: 9,
    interviewsTaken: 73,
    avatar: "https://i.pravatar.cc/150?u=Abram",
  },
  {
    name: "Alfonso Lubin",
    points: 8,
    interviewsTaken: 63,
    avatar: "https://i.pravatar.cc/150?u=Alfonso",
  },
  {
    name: "Maren Gouse",
    points: 7,
    interviewsTaken: 59,
    avatar: "https://i.pravatar.cc/150?u=Maren",
  },
  {
    name: "Desirae Herwitz",
    points: 6,
    interviewsTaken: 53,
    avatar: "https://i.pravatar.cc/150?u=Desirae",
  },
  {
    name: "Talan Torff",
    points: 5,
    interviewsTaken: 50,
    avatar: "https://i.pravatar.cc/150?u=Talan",
  },
  {
    name: "Jaylan Donin",
    points: 4,
    interviewsTaken: 48,
    avatar: "https://i.pravatar.cc/150?u=Jaylan",
  },
  {
    name: "Cheyanne Aman",
    points: 3,
    interviewsTaken: 45,
    avatar: "https://i.pravatar.cc/150?u=Cheyanne",
  },
  {
    name: "Haylie Gouse",
    points: 2,
    interviewsTaken: 40,
    avatar: "https://i.pravatar.cc/150?u=Haylie",
  },
  {
    name: "Trey Botosh",
    points: 1,
    interviewsTaken: 35,
    avatar: "https://i.pravatar.cc/150?u=Trey",
  },
];

const podiumContainer = document.querySelector(".podium");
const listContainer = document.querySelector(".leaderboard-list");

leaderboardList.sort((a, b) => b.points - a.points);

function populatePodium() {
  const top3 = leaderboardList.slice(0, 3);
  const places = [2, 1, 3];

  podiumContainer.innerHTML = "";

  places.forEach((place) => {
    const player = top3[place - 1];
    if (!player) return;

    const podiumPlace = document.createElement("div");
    podiumPlace.classList.add("podium-place", `place-${place}`);

    let profileHtml = `
            <div class="podium-profile">
                ${place === 1 ? '<i class="fas fa-crown crown-icon"></i>' : ""}
                <img src="${player.avatar}" alt="${player.name}">
                <div class="name">${player.name}</div>
                <div class="points">${player.points} Points</div>
            </div>
            <div class="podium-base">${place}</div>
        `;
    podiumPlace.innerHTML = profileHtml;
    podiumContainer.appendChild(podiumPlace);
  });
}

function populateList() {
  listContainer.innerHTML = "";

  leaderboardList.forEach((player, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");
    listItem.style.animationDelay = `${index * 0.1}s`;

    let itemHtml = `
            <div class="list-rank">${index + 1}</div>
            <div class="list-profile">
                <img src="${player.avatar}" alt="${player.name}">
                <div class="name-details">
                    <div class="name">${player.name}</div>
                    <div class="interviews">
                        <i class="fas fa-arrow-up"></i> Interviews taken: ${
                          player.interviewsTaken
                        }
                    </div>
                </div>
            </div>
            <div class="list-points">
                <div class="points-label">Points:</div>
                <div class="points-value">${player.points}</div>
            </div>
        `;
    listItem.innerHTML = itemHtml;
    listContainer.appendChild(listItem);
  });
}

populatePodium();
populateList();
