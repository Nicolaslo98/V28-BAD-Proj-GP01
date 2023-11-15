document.querySelectorAll(".history").forEach((element) => {
    element.addEventListener('click', async (e) => {
      try {
        const res = await fetch('/api/rank/room');
        const rankData = (await res.json()).rankData;
        let gameHistoryHTML = '';
        for (let i = 0; i < rankData.length; i++) {
          const username = rankData[i].username;
          const totalScore = rankData[i].user_total_score;
  
          gameHistoryHTML += `
            <div class="history noScrollBar">
              <div class="historySpace"></div>
              <div class="playerInfo">
                <p>${i + 1}</p>
                <p>${username}</p>
                <p>${totalScore}</p>
              </div>
            </div>
            <div class="info">
              <p>排名</p>
              <p>玩家</p>
              <p>分數</p>
            </div>
          `;
        }
  
        // Add gameHistoryHTML to the DOM or perform any other necessary actions
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });